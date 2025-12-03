// Global variables for testing
const SEED = new URLSearchParams(window.location.search).get('seed');
// const SEED = 'random_seed';
const LEVEL = 1;
let CUMULATIVE_TIME = 0;

// Global variables for balance

const BASE_LEVEL_COUNT = 4;
const LEVEL_COUNT_INCREMENT = 1;
const ANIMATION_DURATION = 500; // 0.5 second
const COLOR_RED = 'rgb(255, 0, 0)';
const COLOR_GREEN = 'rgb(0, 150, 0)';
const COLOR_BLUE = 'rgb(0, 0, 255)';
const MAX_TIME_LIMIT = 120000; // 120 seconds

// Global variables for game
let started = false;
let timeout = false;
let flashing = true;
let buttonPressed = -1;
let sequenceIndex = 0;
let currentLevel = 1;
// Global variables for level scaling and random positioning
Math.seedrandom(SEED);
let randomNumber = Math.random();
let randomNumberSequence = []; 
let totalLevels = BASE_LEVEL_COUNT + (LEVEL * LEVEL_COUNT_INCREMENT);

// Function to add delay to wait for the end of animations
function sleep(ms) {
   return new Promise(resolve => setTimeout(resolve, ms));
}

// Function to set the flash color
function setFlashColor(color) {
   document.documentElement.style.setProperty('--color', `${color}`);
}

// Function to wait for button press input
async function awaitInput() {
   return new Promise(resolve => {
      const checkInput = setInterval(async () => {
         if (buttonPressed != -1) {
            clearInterval(checkInput);
            await sleep(ANIMATION_DURATION);
            resolve(true);
         }
      }, 100); // Check every 100 milliseconds
   });
}

// Function to check the button press and flash the appropriate color
async function checkButtonPress(item) {
   if (!flashing && buttonPressed === -1) {
      buttonPressed = parseInt(item.textContent);
      // If the button pressed is correct
      if (randomNumberSequence[sequenceIndex] === buttonPressed) {
         setFlashColor(COLOR_GREEN);
         item.classList.remove('flashAnimationClass');
         void item.offsetWidth;
         item.classList.add('flashAnimationClass');
      } else {
         // Flash red if the button pressed is incorrect
         setFlashColor(COLOR_RED);
         item.classList.remove('flashAnimationClass');
         void item.offsetWidth;
         item.classList.add('flashAnimationClass');  
         // Keep the correct button lit up blue and the incorrect button lit up red
         await sleep(ANIMATION_DURATION);
         item.classList.remove('flashAnimationClass');
         void item.offsetWidth;
         item.classList.add('stayLitUpRed');   
         const gridItems = document.querySelectorAll('.grid-item');
         gridItems[(randomNumberSequence[sequenceIndex] - 1 < 0) ? 9 : randomNumberSequence[sequenceIndex] - 1].classList.remove('flashAnimationClass');
         void gridItems[(randomNumberSequence[sequenceIndex] - 1 < 0) ? 9 : randomNumberSequence[sequenceIndex] - 1].offsetWidth;
         gridItems[(randomNumberSequence[sequenceIndex] - 1 < 0) ? 9 : randomNumberSequence[sequenceIndex] - 1].classList.add('stayLitUpBlue'); 
      }
   }
}

// Function to flash the number blue
async function flashNumber(item) {
   item.classList.remove('flashAnimationClass');
   void item.offsetWidth;
   item.classList.add('flashAnimationClass');
   await sleep(ANIMATION_DURATION);
   return;
}

// Function to create the keypad
function createKeypad() {
   // Create the keypad container
   const container = document.createElement('div');
   container.className = 'keypad-container';
   // Create the numberPad elements
   for (let i = 0; i < 10; i++) {
      const numperPadItem = document.createElement('div');
      numperPadItem.className = 'grid-item';
      numperPadItem.textContent = (i + 1) % 10;
      numperPadItem.addEventListener('click', () => checkButtonPress(numperPadItem));
      container.appendChild(numperPadItem);
   }
   return container;
}

// Function to add the keypad to the game frame
function addKeypadToGameFrame() {
   const gameFrame = document.getElementById('gameFrame');
   if (gameFrame) {
      // Create the win count display
      const levelCount = document.createElement('div');
      levelCount.className = 'level-count';
      levelCount.innerHTML = 'Level count: ' + currentLevel + '/' + totalLevels;
      // Create the keypad container
      const keypadContainer = createKeypad();
      // Append the level count and number buttons to the container
      gameFrame.appendChild(levelCount);
      gameFrame.appendChild(keypadContainer);
   }
}

// Function to animate the keypad and run game loop
async function animateKeypad() {
   // Set animation duration
   document.documentElement.style.setProperty('--animation-duration', `${ANIMATION_DURATION}ms`);
   // Set the random number sequence
   for (let i = 1; i <= totalLevels; i++) {
      randomNumberSequence.push(Math.floor((randomNumber * Math.pow(10, i)) % 10));
   }
   // Start the keypad animation if not already started
   if (!started) {
      started = true;
      // Start the timer
      startTime = Date.now();
      timerInterval = setInterval(updateTimer, 10);
      timeout = setTimeout(() => {
         checkWin(true);
      }, MAX_TIME_LIMIT);
      // Start the game loop
      const gridItems = document.querySelectorAll('.grid-item');
      // For each level
      for (let i = 0; i < totalLevels; i++) {
         flashing = true;
         setFlashColor(COLOR_BLUE);
         // For each number in the sequence up to current level
         for (let j = 0; j <= i; j++) {
            index = (randomNumberSequence[j] - 1 < 0) ? 9 : randomNumberSequence[j] - 1;
            // Flash the next number in the sequence
            await flashNumber(gridItems[index]);
         }
         flashing = false;
         // For each number in the sequence up to current level
         for (let j = 0; j <= i; j++) {
            sequenceIndex = j;
            // Wait for the user to press a button
            await awaitInput();
            // Check if the button pressed is correct
            if (randomNumberSequence[j] === buttonPressed){
               // If the user has reached the last level
               if (j === totalLevels - 1) {
                  checkWin(false);
                  break;
               }
               buttonPressed = -1;
               continue;
            } else {
               checkWin(false);
               break;
            }
         }
         // Check if the timer game is over
         if (timerInterval === null) {
            break;
         }
         // Update the level count display
         currentLevel++;
         levelCount = document.querySelector('.level-count');
         levelCount.innerHTML = 'Level count: ' + currentLevel + '/' + totalLevels;
      }
   }
}

// Function to update the timer display
function updateTimer() {
   const currentTime = Date.now();
   const elapsedTime = (currentTime - startTime) / 1000;
   document.getElementById('timer').innerText = `Time: ${elapsedTime.toFixed(3)}s`;
}

// Function to check if the user has won the game
function checkWin(timeout) {
   // If the user has not timed out
   if (!timeout) {
      clearInterval(timerInterval);
      // Get the elapsed time an add it to the cumulative time
      const timerText = document.getElementById('timer').textContent;
      const timeMatch = timerText.match(/Time: (\d+\.\d+)s/);
      if (timeMatch) {
         const elapsedTime = parseFloat(timeMatch[1]);
         CUMULATIVE_TIME += elapsedTime;
         timerInterval = null;
      }
      // If the user has reached the last level
      if (currentLevel === totalLevels) {
         console.log('You win! Keep going!');
      } else {
         console.log('You lose! You managed to get ' + currentLevel + ' out of ' + totalLevels + ' successes.');
      }
   } else {
      // If user has just ended
      if (CUMULATIVE_TIME === 0) {
         // Stop the game loop and add the maximum time limit to the cumulative time
         buttonPressed = -2;
         clearInterval(timerInterval);
         timerInterval = null;
         document.getElementById('timer').innerText = `Time: ` + MAX_TIME_LIMIT/1000.0 + `s`;
         CUMULATIVE_TIME += MAX_TIME_LIMIT;
         console.log('You lose! You managed to get ' + currentLevel + ' out of ' + totalLevels + ' successes.');
      }
   }
   console.log('Cumulative time: ' + CUMULATIVE_TIME);
}

// Event listener for the DOM content loaded
document.addEventListener('DOMContentLoaded', () => {
   // Add the keypad and numbers to the game frame
   addKeypadToGameFrame();
   // Event listener for the start button
   document.getElementById('startButton').addEventListener('click', animateKeypad);
});