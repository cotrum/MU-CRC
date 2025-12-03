// Global variables for testing
const SEED = new URLSearchParams(window.location.search).get('seed');
// const SEED = 'random_seed';
const LEVEL = 1;
let CUMULATIVE_TIME = 0;

// Global variables for balance
const MEMORIZATION_TIME = 5000; // 5 seconds
const BASE_NUM_COLS = 4;
const BASE_NUM_ROWS = 2;
const NUM_ROWS_INCREMENT = 1;
const NUM_WINS_INCREMENT = 1;
const MAX_TIME_LIMIT = 120000; // 120 seconds
const ANIMATION_DURATION = 1000; // 1 second

// Global variables for game
let gridIcons = [
   '\u{1F4BB}', // 💻 Laptop
   '\u{1F512}', // 🔒 Lock
   '\u{1F511}', // 🔑 Key
   '\u{1F4E1}', // 📡 Satellite Antenna
   '\u{1F4F6}', // 📶 Antenna Bars
   '\u{1F50E}', // 🔎 Right-Pointing Magnifying Glass
   '\u{1F4A1}', // 💡 Light Bulb
   '\u{1F4C8}', // 📈 Chart with Upwards Trend
   '\u{1F4DA}', // 📚 Books
   '\u{1F4EB}'  // 📫 Mailbox with Raised Flag
];
let count = [];
let found = [];
let delay = false;
let started = false;
let timeout = false;

// Global variables for level scaling
Math.seedrandom(SEED);
let numTiles = BASE_NUM_COLS * (BASE_NUM_ROWS + (LEVEL * NUM_ROWS_INCREMENT))

// Function to set the CSS variable for animation duration
function setAnimationDuration(duration) {
   document.documentElement.style.setProperty('--animation-duration', `${duration}ms`);
}

// Function to get random icons
function getRandomIcons(icons, count) {
   let shuffled = icons.sort(() => 0.5 - Math.random());
   let iconsToDisperse = [...shuffled.slice(0, count), ...shuffled.slice(0, count)];
   iconsToDisperse.sort(() => 0.5 - Math.random());
   return iconsToDisperse;
}

// Function to create grid and tiles
function createGrid() {
   // Create the grid container
   const container = document.createElement('div');
   container.className = 'sprite-container';
   // Create tiles and tile text
   const randomIcons = getRandomIcons(gridIcons, numTiles / 2);
   for (let i = 0; i < numTiles; i++) {
      const tile = document.createElement('div');
      tile.className = 'grid-item';
      const gridText = document.createElement('h1');
      gridText.className = 'grid-item-text';
      gridText.textContent = randomIcons[i];
      tile.appendChild(gridText);
      container.appendChild(tile);
   }
   return container;
}

// Function to add grid to the game frame
function addGridToGameFrame() {
   const gameFrame = document.getElementById('gameFrame');
   if (gameFrame) {
      // Create the grid container
      const gridContainer = createGrid();
      gameFrame.appendChild(gridContainer);
   }
}

// Function to check if same tile is clicked twice
function verifyTile(index){
   if (count.length === 0 || count[0] != index){
      return true;
   }
   return false;
}

// Function to start game
function startGame() {
   // Start the game if not already started
   if (!started) {
      started = true;
      const gridItems = document.querySelectorAll('.grid-item');
      const gridItemTexts = document.querySelectorAll('.grid-item-text');
      // Start countdown
      startTime = Date.now();
      gridItems.forEach((item, index) => {
         item.classList.add('revealAnimationClass');
         gridItemTexts[index].classList.add('showTextAnimationClass');
      });
      timerInterval = setInterval(countdown, 10);
      // Start the beginning countdown
      countdownTime = setTimeout(() => {
         // Reveal all tiles for the duration of the countdown
         gridItems.forEach((item, index) => {
            item.classList.remove('revealAnimationClass');
            gridItemTexts[index].classList.remove('hideTextAnimationClass');
            gridItemTexts[index].classList.remove('showTextAnimationClass');
            void item.offsetWidth;
            void item.offsetWidth;
            item.classList.add('revealAnimationClass');
            gridItemTexts[index].classList.add('hideAndRotateTextAnimationClass');
         });

         // Stop the countdown
         clearInterval(timerInterval);
         // Start the timer (count up)
         startTime = Date.now();
         timerInterval = setInterval(updateTimer, 10);
         timeout = setTimeout(() => {
            // If time runs out, check if board is cleared
            checkWin(true);
         }, MAX_TIME_LIMIT);

         // Loop through each tile and add a click event listener
         gridItems.forEach((item, index) => {      
            // Add flip animation to each tile
            item.addEventListener('click', () => {
               if (verifyTile(index) && !delay){
                  item.classList.remove('revealAnimationClass');
                  gridItemTexts[index].classList.remove('showTextAnimationClass');
                  void item.offsetWidth;
                  void gridItemTexts[index].offsetWidth;
                  item.classList.add('revealAnimationClass');
                  gridItemTexts[index].classList.add('showTextAnimationClass');
                  count.push(index);
               }
            });
         });
         //
         monitorCount();
      }, MEMORIZATION_TIME);
   }
}

// Function to constantly check if two tiles are selected
function monitorCount() {
   setInterval(() => {
      if (delay){
         return;
      }
      if (count.length === 2) {
         checkTiles();
      }
   }, 100); // Check every 100 milliseconds
}

// Function to add delay to wait for the end of animations
function sleep(ms) {
   return new Promise(resolve => setTimeout(resolve, ms));
}

// See if tiles match
async function checkTiles() {
   delay = true;
   await sleep(ANIMATION_DURATION);
   delay = false;
   const gridItems = document.querySelectorAll('.grid-item');
   const gridItemTexts = document.querySelectorAll('.grid-item-text');
   // If they are a match, keep them flipped
   if (gridItemTexts[count[0]].textContent === gridItemTexts[count[1]].textContent) {
      found.push(count[0]);
      found.push(count[1]);
      gridItems[count[0]].style.border = '2px solid green';
      gridItems[count[1]].style.border = '2px solid green';
      checkWin(false);
   // Otherwise, flip them back over
   } else {
      gridItems[count[0]].classList.remove('revealAnimationClass');
      gridItemTexts[count[0]].classList.remove('hideTextAnimationClass');
      gridItemTexts[count[0]].classList.remove('showTextAnimationClass');
      gridItemTexts[count[0]].classList.remove('hideAndRotateTextAnimationClass');
      gridItems[count[1]].classList.remove('revealAnimationClass');
      gridItemTexts[count[1]].classList.remove('hideTextAnimationClass');
      gridItemTexts[count[1]].classList.remove('showTextAnimationClass');
      gridItemTexts[count[1]].classList.remove('hideAndRotateTextAnimationClass');
      
      void gridItems[count[0]].offsetWidth;
      void gridItemTexts[count[0]].offsetWidth;
      void gridItems[count[1]].offsetWidth;
      void gridItemTexts[count[1]].offsetWidth;

      gridItems[count[0]].classList.add('revealAnimationClass');
      gridItemTexts[count[0]].classList.add('hideTextAnimationClass');
      gridItemTexts[count[0]].classList.add('hideAndRotateTextAnimationClass');
      gridItems[count[1]].classList.add('revealAnimationClass');
      gridItemTexts[count[1]].classList.add('hideTextAnimationClass');
      gridItemTexts[count[1]].classList.add('hideAndRotateTextAnimationClass');
   }
   // Clear the count array and reset selected tiles
   count = [];
}

// Function to update the timer display for count up
function updateTimer() {
   const currentTime = Date.now();
   const elapsedTime = (currentTime - startTime) / 1000;
   document.getElementById('timer').innerText = `Time: ${elapsedTime.toFixed(3)}s`;
}

// Function to update the timer display for count down
function countdown() {
   const currentTime = Date.now();
   const elapsedTime = currentTime - startTime;
   const countdownTime = ((MEMORIZATION_TIME - elapsedTime) / 1000).toFixed(3);
   document.getElementById('timer').innerText = `Time: ${countdownTime}s`;
}

// Function to check if the board is done
function checkWin(timeout) {
   // Check if the rotation angle is within the win area
   if (!timeout) {
      if (found.length === numTiles) {
         // Stop the spin animation and timer
         clearInterval(timerInterval);
         // Get the elapsed time
         const timerText = document.getElementById('timer').textContent;
         const timeMatch = timerText.match(/Time: (\d+\.\d+)s/);
         if (timeMatch) {
            const elapsedTime = parseFloat(timeMatch[1]);
            CUMULATIVE_TIME += elapsedTime;
            timerInterval = null;
         }
      }
   } else {
      if (timerInterval != null){
         // Disable clicking
         delay = true;
         // Stop the timer
         clearInterval(timerInterval);
         timerInterval = null;
         // Get the elapsed time and update the cumulative time
         document.getElementById('timer').innerText = `Time: ` + MAX_TIME_LIMIT/1000.0 + `s`;
         CUMULATIVE_TIME += MAX_TIME_LIMIT;
         console.log('You lose! You managed to get ' + found.length/2 + ' out of ' + numTiles/2 + ' matches.');
      }
   }
}

// Event listener for the DOM content loaded
document.addEventListener('DOMContentLoaded', () => {
   // Add the grid and tiles to the game frame
   addGridToGameFrame();
   setAnimationDuration(ANIMATION_DURATION);
   // Event listener for the start and stop buttons
   document.getElementById('startButton').addEventListener('click', startGame);
});