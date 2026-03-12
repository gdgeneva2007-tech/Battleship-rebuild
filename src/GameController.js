import { Gameboard } from './Gameboard';
import { Player } from './Player';
import {
  getHumanShipInfo,
  placeShipGrid,
  updateHoles,
  GameOverDOM,
  gameOnDOM,
} from './DOMController';
//to add GameOverDOM in dom controller
export function GameController() {
  let humanPlayer = Player('humanPlayer', Gameboard());
  let computerPlayer = Player('computerPlayer', Gameboard());
  let isHumanTurn = true;

  function placeComputerShip() {
    let curIndex = 0;
    let attempts = 0;
    while (curIndex <= 4) {
      if (attempts > 2000) {
        return;
      }
      let predirection = Math.random() > 0.5 ? 'x' : 'y';
      let x = Math.floor(Math.random() * 10);
      let y = Math.floor(Math.random() * 10);
      let prehead = [x, y];
      attempts++;
      if (computerPlayer.tryToPlaceShip(prehead, predirection, curIndex)) {
        curIndex++;
      }
    }
  }
  function checkWinner() {
    if (!computerPlayer.allMyShipsSunk() && !humanPlayer.allMyShipsSunk()) {
      return false;
    } else if (!computerPlayer.allMyShipsSunk()) {
      return 'computer';
    } else if (!humanPlayer.allMyShipsSunk()) {
      return 'human';
    }
  }
  function toggleTurn() {
    isHumanTurn = !isHumanTurn;
  }
  function humanTurn(position) {
    if (!isHumanTurn) {
      alert('It is not your turn!');
      return;
    }
    if (!computerPlayer.ifAttackMeValid(position)) {
      alert('Invalid position!');
      return;
    } else {
      let ifHit = computerPlayer.hitMyShip(position);
      updateHoles(ifHit, position, 'computerPlayer');
      //to add updateHoles function in DOM Controller
      toggleTurn();
      let winner = checkWinner();
      if (!winner) {
        setTimeout(computerTurn, 1000);
      } else {
        GameOverDOM(winner, gameReset);
        //to add GameOverDOM in dom controller
      }
    }
  }
  function computerTurn() {
    let randomMove = computerPlayer.makeRandomMove(humanPlayer);
    let position = randomMove.position;
    let ifHit = randomMove.ifHit;
    updateHoles(ifHit, position, 'humanPlayer');
    toggleTurn();
    let winner = checkWinner();
    if (winner) {
      GameOverDOM(winner, gameReset);
    }
  }
  function gameOn() {
    gameOnDOM(humanTurn, humanPlayer.getMyVisitedSet());
  }
  placeComputerShip();
  placeShipGrid();
  getHumanShipInfo(
    humanPlayer.getNameArr(),
    humanPlayer.getLengthArr(),
    humanPlayer.tryToPlaceShip,
    gameOn,
  );
  function gameReset() {
    GameController();
  }
}
