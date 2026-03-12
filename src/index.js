// 1. IMPORT CSS (CRITICAL step: this loads Tailwind)
import './style.css';
import { GameController } from './GameController';
const toggleDirection = document.querySelector('.toggle-direction');
GameController();
toggleDirection.addEventListener('click', () => {
  if (toggleDirection.textContent === 'x') {
    toggleDirection.textContent = 'y';
  } else {
    toggleDirection.textContent = 'x';
  }
});
