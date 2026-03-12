import { Ship } from './Ship';
export function Player(playerType, gameBoard) {
  let shipsArr = [];
  //Ship(length, head, direction, name)
  shipsArr.push(Ship(5, null, true, 'Carrier'));
  shipsArr.push(Ship(4, null, true, 'Battleship'));
  shipsArr.push(Ship(3, null, true, 'Destroyer'));
  shipsArr.push(Ship(3, null, true, 'Submarine'));
  shipsArr.push(Ship(2, null, true, 'Patro'));
  let bag = []; //belong to computer
  let queue = []; //belong to computer
  for (let i = 0; i <= 9; i++) {
    for (let j = 0; j <= 9; j++) {
      if ((i + j) % 2 === 0) {
        bag.push([i, j]);
      }
    }
  }
  function updateShipHeadAndDirection(head, direction, index) {
    shipsArr[index].head = head;
    shipsArr[index].direction = direction;
  }
  function findShip(name) {
    let index = 0;
    while (shipsArr[index].name !== name) {
      index++;
    }
    return index;
  }
  function tryToPlaceShip(prehead, predirection, index) {
    if (!gameBoard.checkIfValid(shipsArr[index], prehead, predirection)) {
      return false;
    }
    shipsArr[index].head = prehead;
    shipsArr[index].direction = predirection;
    gameBoard.placeShip(shipsArr[index]);
    return true;
  }
  function getShipsArr() {
    return shipsArr;
  }
  function getNameArr() {
    return shipsArr.map((ship) => {
      return ship.name;
    });
  }
  function getLengthArr() {
    return shipsArr.map((ship) => {
      return ship.length;
    });
  }
  function hitMyShip(position) {
    let name = gameBoard.receiveAttack(position);
    if (name === undefined) {
      return undefined;
    }
    if (name === false) {
      return false;
    }
    let shipIndex = findShip(name);
    shipsArr[shipIndex].hit();
    if (shipsArr[shipIndex].isSunk()) {
      alert(`${playerType}'s ${shipsArr[shipIndex].name} is sunk!`);
    }
    return true;
  }
  function ifAttackMeValid(position) {
    if (
      position[0] < 0 ||
      position[0] > 9 ||
      position[1] < 0 ||
      position[1] > 9 ||
      gameBoard.getHoles().has(position.toString())
    ) {
      return false;
    }
    return true;
  }
  function allMyShipsSunk() {
    for (let i = 0; i <= 4; i++) {
      if (!shipsArr[i].isSunk()) {
        return false;
      }
    }
    return true;
  }
  function getMyVisitedSet() {
    return gameBoard.getVisited();
  }
  function makeRandomMove(humanPlayer) {
    //belong to computer
    if (queue.length > 0) {
      while (queue.length > 0 && !humanPlayer.ifAttackMeValid(queue[0])) {
        queue.shift();
      }
      if (queue.length > 0) {
        //find it, try it
        let position = queue[0];
        let ifHit = humanPlayer.hitMyShip(queue[0]);
        if (ifHit === true) {
          //it hits!
          let x = queue[0][0],
            y = queue[0][1];
          queue = [
            [x - 1, y],
            [x + 1, y],
            [x, y + 1],
            [x, y - 1],
          ];
        } else {
          //it miss!
          queue.shift();
        }
        return { position: position, ifHit: ifHit };
      }
    }
    let positionIndex = Math.floor(Math.random() * bag.length);
    let position = bag[positionIndex];
    bag.splice(positionIndex, 1);
    while (!humanPlayer.ifAttackMeValid(position) && bag.length > 0) {
      positionIndex = Math.floor(Math.random() * bag.length);
      position = bag[positionIndex];
      bag.splice(positionIndex, 1);
    }
    let ifHit = humanPlayer.hitMyShip(position);
    if (ifHit === true) {
      let x = position[0],
        y = position[1];
      queue = [
        [x - 1, y],
        [x + 1, y],
        [x, y + 1],
        [x, y - 1],
      ];
    }
    return { position: position, ifHit: ifHit };
  }
  return {
    findShip,
    tryToPlaceShip,
    getShipsArr,
    hitMyShip,
    ifAttackMeValid,
    allMyShipsSunk,
    getMyVisitedSet,
    makeRandomMove,
    updateShipHeadAndDirection,
    getNameArr,
    getLengthArr,
  };
}
