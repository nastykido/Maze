let currentLevel = 1;
let totalLevels = 3; // You can set this to however many levels you want
let coins = 0;
let username = "";

// Function to start the game
function startGame() {
    username = document.getElementById('username').value;
    document.getElementById('signup').classList.add('hidden');
    document.getElementById('game-area').classList.remove('hidden');
    document.getElementById('level-display').innerText = `Level: ${currentLevel}`;
    document.getElementById('username-display').innerText = `Welcome, ${username}!`;

    // Initialize the maze based on currentLevel
    generateMaze(currentLevel);
}

// Function to generate maze (simple example, replace with actual maze logic)
function generateMaze(level) {
    // Example maze generation logic
    const maze = document.getElementById('maze');
    maze.innerHTML = ""; // Clear previous maze
    let complexity = level * 10; // Increase complexity based on level
    for (let i = 0; i < complexity; i++) {
        const wall = document.createElement('div');
        wall.style.width = Math.random() * 100 + 'px';
        wall.style.height = Math.random() * 100 + 'px';
        wall.style.position = 'absolute';
        wall.style.top = Math.random() * 80 + '%';
        wall.style.left = Math.random() * 100 + '%';
        wall.style.backgroundColor = 'black';
        maze.appendChild(wall);
    }
}

// Function to finish the level
function finishLevel() {
    coins += 10 * currentLevel; // Example: earn 10 coins per level
    document.getElementById('coin-display').innerText = `Coins: ${coins}`;

    if (currentLevel < totalLevels) {
        currentLevel++;
        document.getElementById('level-display').innerText = `Level: ${currentLevel}`;
        generateMaze(currentLevel);
    } else {
        document.getElementById('end-message').innerText = `Congratulations, ${username}, you completed all levels!`;
    }
}

// Event listeners for controls
document.getElementById('up').onclick = () => movePlayer(0, -1);
document.getElementById('down').onclick = () => movePlayer(0, 1);
document.getElementById('left').onclick = () => movePlayer(-1, 0);
document.getElementById('right').onclick = () => movePlayer(1, 0);

// Placeholder function to move player (you'll need to implement this based on your maze logic)
function movePlayer(x, y) {
    console.log(`Moving player by (${x}, ${y})`);
}
