// Global variables for testing
const SEED = new URLSearchParams(window.location.search).get('seed');
// const SEED = 'random_seed';
const LEVEL = 1;
let CUMULATIVE_TIME = 0;

// Global variables for game
const BASE_NUM_WINS = 2;
const NUM_WINS_INCREMENT = 1;
let currWinCount = 0;
let started = false;
let startTime = 0;
let timerInterval = null;

// Global variables for level scaling and random positioning
Math.seedrandom(SEED);
let level1Phrases = ['HELLO', 'WORLD', 'CODE', 'HACK', 'KEY', 'USER', 'DATA', 'LOCK', 'VIRUS', 'BAND'];
let level2Phrases = ['SECRET CODE', 'SAFE KEY', 'GOOD HACK', 'FIRM WALL', 'LOCK DOWN', 'BACK DOOR', 'BRUTE FORCE', 'TRUE SAFE', 'ENCRYPT NOW', 'CLEAN DATA'];
let level3Phrases = ['USE STRONG CODE', 'HIDE YOUR KEY', 'CHECK FOR HACKS', 'BLOCK ALL LINKS', 'TRUST YOUR FIRE', 'PREVENT THE ATTACK', 'DEFEND YOUR DATA', 'CHECK THE FIREWALL', 'SECURE YOUR SYSTEM', 'BLOCK ALL PHISH'];

let phrase;
let encryptedMessageText;
let decryptedMessageText;

// Function to generate phrases
function generatePhrases() {
   phrase = "";
   if (LEVEL === 1) {
      let randomIndex = Math.floor(Math.random() * level1Phrases.length);
      phrase = level1Phrases[randomIndex];
      level1Phrases.splice(randomIndex, 1);
   } else if (LEVEL === 2) {
      let randomIndex = Math.floor(Math.random() * level2Phrases.length);
      phrase = level2Phrases[randomIndex];
      level2Phrases.splice(randomIndex, 1);
   } else {
      let randomIndex = Math.floor(Math.random() * level3Phrases.length);
      phrase = level3Phrases[randomIndex];
      level3Phrases.splice(randomIndex, 1);
   }
   encryptedMessageText = encryptMessage(phrase);
   decryptedMessageText = encryptedMessageText;
   document.getElementById('encryptedMessage').innerHTML = 'Encrypted Message ' + (currWinCount + 1) + ' of ' + (BASE_NUM_WINS + LEVEL * NUM_WINS_INCREMENT) + ': ' + encryptedMessageText;
   document.getElementById('decryptedMessage').innerHTML = 'Decrypted Message ' + (currWinCount + 1) + ' of ' + (BASE_NUM_WINS + LEVEL * NUM_WINS_INCREMENT) + ': ' + encryptedMessageText;
}

// Function to encrypt the message
function encryptMessage(message) {
   const indexOffset = Math.floor(Math.random() * 25) + 1;
   const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
   const decryptedMessage = message.split('');
   const encryptedMessage = [];
   for (let i = 0; i < decryptedMessage.length; i++) {
      const letter = decryptedMessage[i];
      const index = letters.indexOf(letter);
      if (index === -1) {
         encryptedMessage.push(letter);
         continue;
      }
      let newIndex = index - indexOffset;
      if (newIndex < 0) {
         newIndex += letters.length;
      }
      encryptedMessage.push(letters[newIndex]);
   }
   return encryptedMessage.join('');
}

// Function to decrypt the message
function decryptMessage() {
   const style = window.getComputedStyle(innerWheel);
   const matrix = new WebKitCSSMatrix(style.transform);
   let angle = Math.round(Math.atan2(matrix.m21, matrix.m11) * (180 / Math.PI));
   if (angle < 0) {
      angle *= -1;
   } else {
      angle = 360 - angle;
   }
   const indexOffset = Math.round(angle / 13.846);
   const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
   const encryptedMessage = encryptedMessageText.split('');
   const decryptedMessage = [];
   for (let i = 0; i < encryptedMessage.length; i++) {
      const letter = encryptedMessage[i];
      const index = letters.indexOf(letter);
      if (index === -1) {
         decryptedMessage.push(letter);
         continue;
      }
      let newIndex = index - indexOffset;
      if (newIndex < 0) {
         newIndex += letters.length;
      }
      decryptedMessage.push(letters[newIndex]);
   }
   decryptedMessageText = decryptedMessage.join('');
   document.getElementById('decryptedMessage').innerHTML = 'Decrypted Message ' + (currWinCount + 1) + ' of ' + (BASE_NUM_WINS + LEVEL * NUM_WINS_INCREMENT) + ': ' + decryptedMessageText;
}

// Function to handle the rotation of the inner wheel
function handleInnerWheelRotation() {
   const innerWheel = document.getElementById('innerWheel');
   let isDragging = false;
   let startWheelAngle = 0;
   let startCursorAngle = 0;

   innerWheel.addEventListener('mousedown', (e) => {
      e.preventDefault();
      isDragging = true;
      const style = window.getComputedStyle(innerWheel);
      const matrix = new WebKitCSSMatrix(style.transform);
      startWheelAngle = Math.round(Math.atan2(matrix.m21, matrix.m11) * (180 / Math.PI));
      if (startWheelAngle < 0) {
         startWheelAngle *= -1;
      } else {
         startWheelAngle = 360 - startWheelAngle;
      }
      startCursorAngle = getMouseAngle(e);
   });

   document.addEventListener('mousemove', (e) => {
      if (isDragging) {
         const currentAngle = getMouseAngle(e);
         const angleDiff = currentAngle - startCursorAngle;
         let snappedAngle = Math.round(angleDiff / 13.846) * 13.846;
         innerWheel.style.transform = `rotate(${startWheelAngle - snappedAngle}deg)`;
         decryptMessage();
      }
   });

   document.addEventListener('mouseup', (e) => {
      isDragging = false;
   });

   function getMouseAngle(e) {
      const rect = innerWheel.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      let angle = Math.atan2(mouseY - centerY, mouseX - centerX) * (180 / Math.PI);
      if (angle < 0) {
         angle *= -1;
      } else {
         angle = 360 - angle;
      }
      return angle;
   }
}

// Function to create image sprites
function createSprite() {
   // Create the sprite container
   const container = document.createElement('div');
   container.className = 'sprite-container';
   // Create the outer dial sprite
   const outerWheel = document.createElement('img');
   outerWheel.src = 'Resources/BlueWheel.png'; 
   outerWheel.id = 'outerWheel';
   // Create the inner dial sprite
   const innerWheel = document.createElement('img');
   innerWheel.src = 'Resources/GreenWheel.png'; 
   innerWheel.id = 'innerWheel';
   innerWheel.style.transform = 'rotate(0deg)';
   // Append the sprites to the container
   container.appendChild(outerWheel);
   container.appendChild(innerWheel);
   return container;
}

// Function to add sprites to the game frame
function addSpritesToGameFrame() {
   const gameFrame = document.getElementById('gameFrame');
   if (gameFrame) {
      // Create the encrypted message display
      const encryptedMessage = document.createElement('div');
      encryptedMessage.className = 'message';
      encryptedMessage.id = 'encryptedMessage';
      encryptedMessage.innerHTML = 'Encrypted Message ' + (currWinCount + 1) + ' of ' + (BASE_NUM_WINS + LEVEL * NUM_WINS_INCREMENT) + ': ' + encryptedMessageText;
      // Create the sprite container
      const spriteContainer = createSprite();
      // Create the decrypted message display
      const decryptedMessage = document.createElement('div');
      decryptedMessage.className = 'message';
      decryptedMessage.id = 'decryptedMessage';
      decryptedMessage.innerHTML = 'Decrypted Message ' + (currWinCount + 1) + ' of ' + (BASE_NUM_WINS + LEVEL * NUM_WINS_INCREMENT) + ': ' + decryptedMessageText;
   
      // Create the submit button
      const submitButton = document.createElement('button');
      submitButton.id = 'submitButton';
      submitButton.innerHTML = 'Submit';
      // Append the sprites to the container
      gameFrame.appendChild(encryptedMessage);
      gameFrame.appendChild(spriteContainer);
      gameFrame.appendChild(decryptedMessage);
      gameFrame.appendChild(submitButton);
   }
}

// Function to animate the sprite
function animateSprite() {
   // Start the sprite animation if not already started
   if (!started) {
      started = true;
      // Start the timer
      startTime = Date.now();
      timerInterval = setInterval(updateTimer, 10);
   }
}

// Function to update the timer display
function updateTimer() {
   const currentTime = Date.now();
   const elapsedTime = (currentTime - startTime) / 1000;
   document.getElementById('timer').innerText = `Time: ${elapsedTime.toFixed(3)}s`;
}

// Function to stop the rotation and check the decrypted message
function stopAndCheckSprite() {
   // If the sprite has not started, return
   if (started){
      const submitButton = document.getElementById('submitButton');
      // Check if the rotation decryption is correct
      if (decryptedMessageText === phrase) {
         currWinCount++;
         // Check if the player has reached the required number of wins
         if (currWinCount < BASE_NUM_WINS + LEVEL * NUM_WINS_INCREMENT) {
            generatePhrases();
            return;
         } else {
            submitButton.style.borderColor = 'green';
         }
      } else {
         submitButton.style.borderColor = 'red';
      }
      // Stop the timer and calculate the cumulative time
      const timerText = document.getElementById('timer').textContent;
      const timeMatch = timerText.match(/Time: (\d+\.\d+)s/);
      const elapsedTime = parseFloat(timeMatch[1]);
      CUMULATIVE_TIME += elapsedTime;
      clearInterval(timerInterval);
      timerInterval = null;
      console.log('Cumulative time: ' + CUMULATIVE_TIME);
   }
}

// Event listener for the DOM content loaded
document.addEventListener('DOMContentLoaded', () => {
   // Add the sprites to the game frame
   addSpritesToGameFrame();
   generatePhrases();
   // Event listener for the start and stop buttons
   document.getElementById('startButton').addEventListener('click', animateSprite);
   document.getElementById('startButton').addEventListener('click', handleInnerWheelRotation);
   document.getElementById('submitButton').addEventListener('click', stopAndCheckSprite);
});