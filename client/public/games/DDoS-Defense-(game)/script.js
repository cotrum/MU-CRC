// Global variables for testing
const SEED = new URLSearchParams(window.location.search).get('seed');
// const SEED = 'random_seed';
const LEVEL = 1;
let CUMULATIVE_TIME = 0;

// Global variables for balance
const BASE_NUM_WINS = 10;
const NUM_WINS_INCREMENT = 5;
const MAX_TIME_LIMIT = 120000; // 120 seconds
const MAX_HEALTH = 100;
const BASE_SPAWN_INTERVAL = 13;
const SPAWN_INTERVAL_DECREMENT = 2;
const BASE_MOLE_LIFETIME = 25;
const MOLE_LIFETIME_DECREMENT = 1;
const BASE_GOOD_MOLE_SPAWN_RATE = 0.5;
const GOOD_MOLE_SPAWN_RATE_DECREMENT = 0.0;
const NETWORK_HEALTH = 100;
const BASE_NETWORK_HEALTH_PENALTY = 0;
const NETWORK_HEALTH_PENALTY_INCREMENT = 25;

// Global variables for game
let started = false;
let timeout = false;
let currentHealth = 100;
let spawnRates = [];
let timeOffset = [0, 0, 0, 0, 0, 0, 0, 0, 0];
let waitTimeRemaining = [-1, -1, -1, -1, -1, -1, -1, -1, -1];
let numWins = 0;
let totalWins = BASE_NUM_WINS + (LEVEL * NUM_WINS_INCREMENT);
let randomVariance = 0;
let startTime = 0;
let startTimeOffset = 0;
let randomSpawn = 0;

Math.seedrandom(SEED);

// Function to create image sprites
function createSprite() {
   // Create the rotating sprite container
   const container = document.createElement('div');
   container.id = 'sprite-container';
   // Create the grid
   for (let i = 0; i < 9; i++) {
      const grid = document.createElement('div');
      grid.className = 'grid-cell';
      grid.onclick = () => checkCell(grid);
      container.appendChild(grid);
      randomVariance = Math.random() * (1.4 - 0.5) + 0.5;
      spawnRates.push((randomVariance * (BASE_SPAWN_INTERVAL - (LEVEL * SPAWN_INTERVAL_DECREMENT))));
   }
   startTimeOffset = Math.min(...spawnRates);
   // Append the sprites to the container
   return container;
}

// Function to add sprites to the game frame
function addSpritesToGameFrame() {
   const gameFrame = document.getElementById('gameFrame');
   if (gameFrame) {
      // Create the win count display
      const remainingWins = document.createElement('div');
      remainingWins.className = 'remaining-wins';
      remainingWins.innerHTML = 'Success count: ' + numWins + '/' + totalWins;
      // Create health bar
      const healthBar = document.createElement('div');
      healthBar.id = 'health-bar';
      healthBar.innerHTML = 'Network Health';
      // Create the rotating sprite container
      const spriteContainer = createSprite();
      // Append the sprites to the container
      gameFrame.appendChild(remainingWins);
      gameFrame.appendChild(healthBar);
      gameFrame.appendChild(spriteContainer);
   }
}

// Function to spawn moles at random tiles
function spawnMoles(time) {
   for (let i = 0; i < 9; i++) {
      let spawnCell = document.getElementById('sprite-container').children[i];
      if (waitTimeRemaining[i] < 0.1 && waitTimeRemaining[i] > -0.1) {
         spawnCell.innerHTML = '';
         void spawnCell.offsetWidth;
         spawnCell.classList.remove('goodMole');
         spawnCell.classList.remove('badMole');

         waitTimeRemaining[i] = -1;
         timeOffset[i] = time;
      } else if ((time - timeOffset[i] + 0.1) % spawnRates[i] < 0.1) {
         //ADD MOLE
         randomSpawn = Math.random();
         if (randomSpawn <= (BASE_GOOD_MOLE_SPAWN_RATE - (LEVEL * GOOD_MOLE_SPAWN_RATE_DECREMENT)) && !spawnCell.classList.contains('badMole')) {
            spawnCell.classList.add('goodMole');
            spawnCell.innerHTML = `<img src="Resources/GreenData.png" alt="Good Mole">`;
         } else if (!spawnCell.classList.contains('goodMole')) {
            spawnCell.classList.add('badMole');
            spawnCell.innerHTML = `<img src="Resources/RedData.png" alt="Bad Mole">`;
         }
         randomVariance = Math.random() * (1.2 - 0.8) + 0.8;
         waitTimeRemaining[i] = (BASE_MOLE_LIFETIME - (LEVEL * MOLE_LIFETIME_DECREMENT)) * randomVariance;
      } else {
         if (waitTimeRemaining[i] != -1){
            waitTimeRemaining[i] -= 0.1;
         }
      }
   }
}

// Add click listeners for behavior
function checkCell(cell) {
   if (cell.classList.contains('goodMole')) {
      numWins++;
      remainingWins = document.querySelector('.remaining-wins');
      remainingWins.innerHTML = 'Success count: ' + numWins + '/' + totalWins;
      waitTimeRemaining[Array.from(cell.parentNode.children).indexOf(cell)] = 0;
      if (numWins >= totalWins) {
         stopAndCheckSprite(false);
      }
   } else if (cell.classList.contains('badMole')) {
      let element = document.getElementById('health-bar');
      let background = window.getComputedStyle(element).background;
      let match = background.match(/(\d+)%/); 
      let percentage = match ? parseInt(match[1]) : null;
      let damage = (BASE_NETWORK_HEALTH_PENALTY + (LEVEL * NETWORK_HEALTH_PENALTY_INCREMENT));
      element.style.background = `linear-gradient(to right, rgb(255, 137, 137) ${Math.max(percentage-damage, 0)}%, rgb(255, 255, 255) 0%)`;
      currentHealth -= damage;
      waitTimeRemaining[Array.from(cell.parentNode.children).indexOf(cell)] = 0;
      if (currentHealth <= 0) {
         stopAndCheckSprite(false);
      }
   }
};

// Function to animate the sprite
function animateSprite() {
   // Start the sprite animation if not already started
   if (!started) {
      started = true;
      // Start the timer
      startTime = Date.now();
      timerInterval = setInterval(updateTimer, 10);
      timeout = setTimeout(() => {
         stopAndCheckSprite(true);
      }, MAX_TIME_LIMIT);
   }
}


// Function to update the timer display
function updateTimer() {
   const currentTime = Date.now();
   const elapsedTime = (currentTime - startTime) / 1000;
   document.getElementById('timer').innerText = `Time: ${elapsedTime.toFixed(3)}s`;
   // Spawn Moles
   spawnMoles(elapsedTime + startTimeOffset);
}

// Function to stop the sprite and check the rotation angle
function stopAndCheckSprite(timeout) {
   // Stop the sprite animation if started
   if (started){
      // Check if the rotation angle is within the win area
      if (!timeout) {
         // Stop the spin animation and timer
         clearInterval(timerInterval);
         for (let i = 0; i < 9; i++) {
            let spawnCell = document.getElementById('sprite-container').children[i];
            spawnCell.innerHTML = '';
            void spawnCell.offsetWidth;
            spawnCell.classList.remove('goodMole');
            spawnCell.classList.remove('badMole');
         }      
         // Get the elapsed time
         const timerText = document.getElementById('timer').textContent;
         const timeMatch = timerText.match(/Time: (\d+\.\d+)s/);
         if (timeMatch) {
            const elapsedTime = parseFloat(timeMatch[1]);
            CUMULATIVE_TIME += elapsedTime;
            timerInterval = null;
         }
         // Update the win count display
         remainingWins = document.querySelector('.remaining-wins');
         remainingWins.innerHTML = 'Success count: ' + numWins + '/' + totalWins;

         if (numWins >= BASE_NUM_WINS + (LEVEL * NUM_WINS_INCREMENT)) {
            console.log('You win! Keep going!');
         } else {
            console.log('You lose! You managed to get ' + numWins + ' out of ' + totalWins + ' wins.');
         }
      } else {
         clearInterval(timerInterval);
         document.getElementById('timer').innerText = `Time: ` + MAX_TIME_LIMIT/1000.0 + `s`;
         CUMULATIVE_TIME += MAX_TIME_LIMIT;
         console.log('You lose! You managed to get ' + numWins + ' out of ' + totalWins + ' wins.');
      }
      console.log('Cumulative time: ' + CUMULATIVE_TIME);
   }
}

// Event listener for the DOM content loaded
document.addEventListener('DOMContentLoaded', () => {
   // Add the sprites to the game frame
   addSpritesToGameFrame();
   // Event listener for the start and stop buttons
   document.getElementById('startButton').addEventListener('click', animateSprite);
});