let prevSubmitListener = null;
export function placeShipGrid() {
  const container = document.querySelector('.container');
  container.replaceChildren();
  const gridDiv = document.createElement('div');
  gridDiv.className =
    'grid grid-cols-10 grid-rows-10 gap-0.5 *:w-8 *:h-8 *:border-white *:border-2';

  for (let i = 0; i <= 9; i++) {
    for (let j = 0; j <= 9; j++) {
      const gridCell = document.createElement('button');
      gridCell.dataset.x = j;
      gridCell.dataset.y = i;
      gridDiv.appendChild(gridCell);
    }
  }
  container.appendChild(gridDiv);
}
function regenerateForm(curIndex, nameArr) {
  const headLabelX = document.querySelector('.headLabel-x');
  const headLabelY = document.querySelector('.headLabel-y');
  const headInputX = document.querySelector('.headInput-x');
  const headInputY = document.querySelector('.headInput-y');
  headLabelX.htmlFor = `${nameArr[curIndex]}-head-x`;
  headLabelY.htmlFor = `${nameArr[curIndex]}-head-y`;
  headLabelX.textContent = `${nameArr[curIndex]}-head-x`;
  headLabelY.textContent = `${nameArr[curIndex]}-head-y`;
  headInputX.id = `${nameArr[curIndex]}-head-x`;
  headInputY.id = `${nameArr[curIndex]}-head-y`;
  headInputX.name = `${nameArr[curIndex]}-head-x`;
  headInputY.name = `${nameArr[curIndex]}-head-y`;
}
export function getHumanShipInfo(nameArr, lengthArr, tryToPlaceShip, gameOn) {
  let curIndex = 0;
  const dialog = document.querySelector('dialog');
  const form = document.querySelector('form');
  const toggleDirection = document.querySelector('.toggle-direction');
  const headLabelX = document.querySelector('.headLabel-x');
  const headLabelY = document.querySelector('.headLabel-y');
  const headInputX = document.querySelector('.headInput-x');
  const headInputY = document.querySelector('.headInput-y');
  let predirection, prehead;
  toggleDirection.textContent = 'x';
  headLabelX.htmlFor = `${nameArr[curIndex]}-head-x`;
  headLabelY.htmlFor = `${nameArr[curIndex]}-head-y`;
  headLabelX.textContent = `${nameArr[curIndex]}-head-x`;
  headLabelY.textContent = `${nameArr[curIndex]}-head-y`;
  headInputX.id = `${nameArr[curIndex]}-head-x`;
  headInputY.id = `${nameArr[curIndex]}-head-y`;
  headInputX.name = `${nameArr[curIndex]}-head-x`;
  headInputY.name = `${nameArr[curIndex]}-head-y`;
  dialog.showModal();
  if (prevSubmitListener) {
    form.removeEventListener('submit', prevSubmitListener);
  }
  prevSubmitListener = (e) => {
    e.preventDefault();
    predirection = toggleDirection.textContent;
    prehead = [Number(headInputX.value), Number(headInputY.value)];
    if (tryToPlaceShip(prehead, predirection, curIndex)) {
      form.reset();
      let length = lengthArr[curIndex];
      updatePlaceHumanShip(prehead, predirection, length);
      curIndex++;
      if (curIndex >= 5) {
        dialog.close();
        gameOn();
      } else {
        form.reset();
        regenerateForm(curIndex, nameArr);
      }
    } else {
      alert('Invalid!');
    }
  };
  form.addEventListener('submit', prevSubmitListener);
}
export function updatePlaceHumanShip(prehead, predirection, length) {
  if (predirection === 'x') {
    for (let i = 0; i < length; i++) {
      document
        .querySelector(`[data-x="${prehead[0] + i}"][data-y="${prehead[1]}"]`)
        .classList.add('bg-red-500');
    }
  } else if (predirection === 'y') {
    for (let i = 0; i < length; i++) {
      document
        .querySelector(`[data-x="${prehead[0]}"][data-y="${prehead[1] + i}"]`)
        .classList.add('bg-red-500');
    }
  }
}
export function gameOnDOM(humanTurn, humanVisited) {
  const container = document.querySelector('.container');
  container.replaceChildren();
  const humanDiv = document.createElement('div');
  const computerDiv = document.createElement('div');
  humanDiv.className = 'humanDiv w-1/2 h-full flex justify-center items-center';
  computerDiv.className =
    'computerDiv w-1/2 h-full flex justify-center items-center';
  container.appendChild(humanDiv);
  container.appendChild(computerDiv);
  const humanGrid = document.createElement('div');
  humanGrid.className =
    'grid grid-cols-10 grid-rows-10 gap-0.5 border-white border-2 *:w-8 *:h-8 *:border-white *:border-2';
  humanDiv.appendChild(humanGrid);
  for (let i = 0; i <= 9; i++) {
    for (let j = 0; j <= 9; j++) {
      const gridCell = document.createElement('button');
      gridCell.classList.add('gridCell');
      gridCell.dataset.x = j;
      gridCell.dataset.y = i;
      if (humanVisited.has([j, i].toString())) {
        gridCell.classList.add('bg-gray-300');
      }
      humanGrid.appendChild(gridCell);
    }
  }
  const computerGrid = document.createElement('div');
  computerGrid.className =
    'grid grid-cols-10 grid-rows-10 gap-0.5 border-white border-2 *:w-8 *:h-8 *:border-white *:border-2';
  computerDiv.appendChild(computerGrid);
  for (let i = 0; i <= 9; i++) {
    for (let j = 0; j <= 9; j++) {
      const gridCell = document.createElement('button');
      gridCell.classList.add('gridCell');
      gridCell.dataset.x = j;
      gridCell.dataset.y = i;
      computerGrid.appendChild(gridCell);
      //to add event listener to these cells
      gridCell.addEventListener('click', () => {
        humanTurn([j, i]);
      });
    }
  }
}
export function updateHoles(ifHit, position, playerName) {
  let targetCell;
  if (playerName === 'computerPlayer') {
    const computerDiv = document.querySelector('.computerDiv');
    targetCell = computerDiv.querySelector(
      `[data-x="${position[0]}"][data-y="${position[1]}"]`,
    );
  } else if (playerName === 'humanPlayer') {
    const humanDiv = document.querySelector('.humanDiv');
    targetCell = humanDiv.querySelector(
      `[data-x="${position[0]}"][data-y="${position[1]}"]`,
    );
  }
  targetCell.classList.add('relative');
  const dot = document.createElement('div');
  dot.className =
    'w-3 h-3 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2';
  if (ifHit === true) {
    dot.classList.add('bg-red-500');
  } else if (ifHit === false) {
    dot.classList.add('bg-white');
  }
  targetCell.appendChild(dot);
}
export function GameOverDOM(winner, gameReset) {
  const container = document.querySelector('.container');
  container.replaceChildren();
  const banner = document.createElement('p');
  banner.className = 'p-6 bg-red-600 m-auto text-[50px] font-bold text-white';
  if (winner === 'computer') {
    banner.textContent = 'YOU LOSE!';
  } else if (winner === 'human') {
    banner.textContent = 'YOU WIN!';
  }
  container.appendChild(banner);
  const restartBtn = document.createElement('button');
  restartBtn.className =
    'restartBtn absolute top-2 right-2 p-4 text-4xl text-white font-bold bg-red-600 border-4 border-amber-900';
  restartBtn.textContent = 'RESTART!';
  restartBtn.addEventListener('click', gameReset);
  container.appendChild(restartBtn);
}
