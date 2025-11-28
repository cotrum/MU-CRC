// Global variables for testing
const SEED = 'my_seed';
const LEVEL = 1;
let CUMULATIVE_TIME = 0;

// Global variables for balance
const BASE_SPEED = 0.75;
const SPEED_INCREMENT = 0.15;
const BASE_AREA = 25;
const AREA_INCREMENT = 5;
const BASE_NUM_WINS = 2;
const NUM_WINS_INCREMENT = 1;
const MAX_TIME_LIMIT = 20000; // 20 seconds

// Global variables for game
let interval = 0;
let currWinCount = 0;
let rotationDirection = 1;
let rotation = 0;
let started = false;
let timeout = false;
let startTime = 0;
let timerInterval = 0;

// Global variables for level scaling and random positioning
Math.seedrandom(SEED);
let winArea = BASE_AREA - (LEVEL * AREA_INCREMENT);
let winAreaPosition = Math.floor(Math.random() * (100 - winArea));
let winStart = (360 - (360 * ((winAreaPosition + winArea) / 100.0)));
let winEnd = (360 - (360 * (winAreaPosition / 100.0)));
let numWins = BASE_NUM_WINS + (LEVEL * NUM_WINS_INCREMENT);

// Function to create image sprites
function createSprite() {
    // Create the rotating sprite container
    const container = React.createElement('div', { className: 'sprite-container' },
        // Create the dial sprite
        React.createElement('img', { src: 'Resources/dial.png', className: 'sprite' }),
        // Create the colored segments overlay
        React.createElement('div', {
            id: 'overlay',
            style: {
                background: `conic-gradient(red 0% ${winAreaPosition}%, green ${winAreaPosition}% ${winAreaPosition + winArea}%, red ${winAreaPosition + winArea}% 100%)`
            }
        })
    );
    return container;
}

// Function to add sprites to the game frame
function addSpritesToGameFrame() {
    const gameFrame = document.getElementById('gameFrame');
    if (gameFrame) {
        // Create the win count display
        const remainingWins = React.createElement('div', { className: 'remaining-wins' }, `Success count: ${currWinCount}/${numWins}`);
        // Create the rotating sprite container
        const spriteContainer = createSprite();
        // Create the indicator triangle sprite
        const triangle = React.createElement('div', { className: 'triangle' });
        // Create the transparent stop button overlay
        const stopButton = React.createElement('button', { id: 'stopButton' });

        // Append the sprites to the container
        ReactDOM.render(
            React.createElement(React.Fragment, null, remainingWins, spriteContainer, triangle, stopButton),
            gameFrame
        );
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
        timeout = setTimeout(() => {
            stopAndCheckSprite(true);
        }, MAX_TIME_LIMIT);
        // Set the rotation interval
        const spriteContainer = document.querySelector('.sprite-container');
        interval = setInterval(() => {
            rotation += (BASE_SPEED + (LEVEL * SPEED_INCREMENT)) * rotationDirection;
            spriteContainer.style.transform = `rotate(${rotation}deg)`;
            // Reset rotation to avoid overflow
            if (rotation > 360) {
                rotation = 0;
            } else if (rotation < 0) {
                rotation = 360;
            }
        });
    }
}

// Function to update the timer display
function updateTimer() {
    const currentTime = Date.now();
    const elapsedTime = (currentTime - startTime) / 1000;
    document.getElementById('timer').innerText = `Time: ${elapsedTime.toFixed(3)}s`;
}

// Function to stop the sprite and check the rotation angle
function stopAndCheckSprite(timeout) {
    // Stop the sprite animation if started
    if (started) {
        // Check if the rotation angle is within the win area
        if (!timeout && rotation >= winStart && rotation <= winEnd) {
            currWinCount++;
            // Check if the win count is less than the required number of wins
            if (currWinCount < numWins) {
                // Reverse the rotation direction
                rotationDirection *= -1;
            } else {
                // Stop the spin animation and timer
                clearInterval(interval);
                clearInterval(timerInterval);
                // Get the elapsed time
                const timerText = document.getElementById('timer').textContent;
                const timeMatch = timerText.match(/Time: (\d+\.\d+)s/);
                if (timeMatch) {
                    const elapsedTime = parseFloat(timeMatch[1]);
                    CUMULATIVE_TIME += elapsedTime;
                    timerInterval = null;
                }
                console.log('You win! Keep going!');
            }
            // Update the win count display
            const remainingWins = document.querySelector('.remaining-wins');
            remainingWins.innerHTML = `Success count: ${currWinCount}/${numWins}`;
        } else {
            // If user has just ended
            if (CUMULATIVE_TIME === 0) {
                // Stop the spin animation and timer
                clearInterval(interval);
                clearInterval(timerInterval);
                if (!timeout) {
                    // Get the elapsed time and update the cumulative time
                    const timerText = document.getElementById('timer').textContent;
                    const timeMatch = timerText.match(/Time: (\d+\.\d+)s/);
                    if (timeMatch) {
                        const elapsedTime = parseFloat(timeMatch[1]);
                        CUMULATIVE_TIME += elapsedTime;
                        timerInterval = null;
                    }
                } else {
                    if (timerInterval === null) {
                        document.getElementById('timer').innerText = `Time: ${MAX_TIME_LIMIT / 1000.0}s`;
                        CUMULATIVE_TIME += MAX_TIME_LIMIT;
                    }
                }
                console.log(`You lose! You managed to get ${currWinCount} out of ${numWins} wins.`);
            }
        }
        console.log(`Cumulative time: ${CUMULATIVE_TIME}`);
    }
}

// Event listener for the DOM content loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add the sprites to the game frame
    addSpritesToGameFrame();
    // Event listener for the start and stop buttons
    document.getElementById('startButton').addEventListener('click', animateSprite);
    document.getElementById('stopButton').addEventListener('click', () => stopAndCheckSprite(false));
});