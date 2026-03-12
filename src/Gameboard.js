export function Gameboard() {
  let visited = new Set(); //a set of strings
  let visitedCoordinates = []; //position+shipname
  let missedStr = new Set(); // a set of strings
  let holes = new Set(); //a set of strings
  function checkIfValid(ship, prehead, predirection) {
    if (predirection === 'x') {
      if (
        prehead[0] + ship.length - 1 > 9 ||
        prehead[1] < 0 ||
        prehead[1] > 9 ||
        prehead[0] < 0
      ) {
        return false;
      }
      for (let i = 0; i <= ship.length - 1; i++) {
        if (visited.has([prehead[0] + i, prehead[1]].toString())) {
          return false;
        }
      }
      return true;
    }
    if (predirection === 'y') {
      if (
        prehead[1] + ship.length - 1 > 9 ||
        prehead[0] < 0 ||
        prehead[0] > 9 ||
        prehead[1] < 0
      ) {
        return false;
      }
      for (let i = 0; i <= ship.length - 1; i++) {
        if (visited.has([prehead[0], prehead[1] + i].toString())) {
          return false;
        }
      }
      return true;
    }
  }
  function placeShip(ship) {
    if (ship.direction === 'x') {
      for (let i = 0; i <= ship.length - 1; i++) {
        visited.add([ship.head[0] + i, ship.head[1]].toString());
        let position = [ship.head[0] + i, ship.head[1]];
        visitedCoordinates.push(visitedCoordinatesFactory(position, ship.name));
      }
    } else if (ship.direction === 'y') {
      for (let i = 0; i <= ship.length - 1; i++) {
        visited.add([ship.head[0], ship.head[1] + i].toString());
        let position = [ship.head[0], ship.head[1] + i];
        visitedCoordinates.push(visitedCoordinatesFactory(position, ship.name));
      }
    }
  }
  function receiveAttack(position) {
    //position:[x,y]
    if (holes.has(position.toString())) {
      return undefined;
    }
    if (visited.has(position.toString())) {
      //hit. send the 'hit' function
      let i = 0;
      while (
        i < visitedCoordinates.length &&
        visitedCoordinates[i].position.toString() !== position.toString()
      ) {
        i++;
      }
      holes.add(position.toString());
      let shipName = visitedCoordinates[i].name;
      return shipName;
    } else {
      //record the coordinates of the missed shot
      missedStr.add(position.toString());
      holes.add(position.toString());
      return false;
    }
  }
  function allSunk(shipsArr) {
    //report whether or not all of their ships have been sunk
    for (let i = 0; i <= shipsArr.length - 1; i++) {
      if (!shipsArr[i].isSunk()) {
        return false;
      }
    }
    return true;
  }
  function getHoles() {
    return holes;
  }
  function getVisited() {
    return visited;
  }
  function visitedCoordinatesFactory(position, name) {
    return { position, name };
  }
  return {
    checkIfValid,
    placeShip,
    receiveAttack,
    allSunk,
    getHoles,
    getVisited,
  };
}
