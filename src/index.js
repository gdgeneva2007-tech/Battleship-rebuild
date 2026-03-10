// 1. IMPORT CSS (CRITICAL step: this loads Tailwind)
import './style.css';
import myLogo from './images/logo.png'; //Import the image variable

const img = document.createElement('img');
img.src = myLogo; //Assign the imported path
img.className = 'w-20 h-20 rounded-full border-2 border-white';
document.body.appendChild(img);
// 2. Select the container we made in HTML
const appContainer = document.getElementById('js-app-container');

// 3. Create a new element using JavaScript
const button = document.createElement('button');

// 4. Add text to the button
button.innerText = 'I was made with JS!';

// 5. ADD TAILWIND CLASSES
// You simply pass the class string to className
button.className =
  'mt-6 px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg shadow-lg transition duration-300 transform hover:scale-105';

// 6. Append the element to the DOM
appContainer.appendChild(button);

// --- Another Example: Using classList ---
const card = document.createElement('div');
card.innerText = 'Dynamic Card Element';

// You can add classes one by one or as a spread
card.classList.add(
  'bg-gray-800',
  'p-6',
  'rounded-xl',
  'mt-4',
  'border',
  'border-gray-700',
);

appContainer.appendChild(card);
