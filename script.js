const canvas = document.getElementById('maze');
const ctx = canvas.getContext('2d');
const pointsDisplay = document.getElementById('points');
const coinsDisplay = document.getElementById('coins');
const timerDisplay = document.getElementById('timer');
const endMessage = document.getElementById('end-message');
const userNameDisplay = document.getElementById('user-name-display');
const signupDiv = document.getElementById('signup');
const gameDiv = document.getElementById('game');
const startGameButton = document.getElementById('start-game');
const usernameInput = document.getElementById('username');
const dobInput = document.getElementById('dob');
let player = { x: 50, y: 50, points: 0, coins: 0 };
let timer;
let timeLeft = 60;
let isGameRunning = false;
let jumpBoots = false;
let jetpack = false;

// Maze walls (for demonstration, create a simple maze layout)
const mazeWalls = [
    { x: 0, y: 0, width: 800, height: 20 }, // Top wall
    { x: 0, y: 580, width: 800, height: 20 }, // Bottom wall
    { x: 100, y: 100, width: 20, height: 400 }, // Vertical wall
    { x: 300, y: 200, width: 20, height: 400 }, // Vertical wall
    { x: 200, y: 300, width: 200, height: 20 }, // Horizontal wall
    { x: 600, y: 100, width: 20, height: 200 }, // Vertical wall
    { x: 400, y: 400, width: 200, height: 20 } // Horizontal wall
];

// Collectable coins
const collectables = [
    { x: 150, y: 150, type: 'coin' },
    { x: 250, y: 350, type: 'coin' },
    { x: 450, y: 150, type: 'coin' },
];

// Draw maze function
const drawMaze = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'green';
    for (let wall of mazeWalls) {
        ctx.fillRect(wall.x, wall.y, wall.width, wall.height);
    }

    // Draw collectables
    for (let item of collectables) {
        ctx.fillStyle = 'gold';
        ctx.beginPath();
        ctx.arc(item.x, item.y, 10, 0, Math.PI * 2);
        ctx.fill();
    }

    // Draw player
    ctx.fillStyle = 'blue';
    ctx.fillRect(player.x, player.y, 20, 20);
};

const startTimer = () => {
    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timer);
            alert('Time is up! Game Over!');
            resetGame();
        }
    }, 1000);
};

const resetGame = () => {
    player.x = 50;
    player.y = 50;
    player.points = 0;
    player.coins = 0;
    timeLeft = 60;
    pointsDisplay.textContent = player.points;
    coinsDisplay.textContent = player.coins;
    timerDisplay.textContent = timeLeft;
    drawMaze();
};

const collectItem = (item) => {
    if (item.type === 'coin') {
        player.coins += 1;
        pointsDisplay.textContent = player.points;
        coinsDisplay.textContent = player.coins;
        collectables.splice(collectables.indexOf(item), 1); // Remove collected item
    }
};

const updatePlayerPosition = () => {
    // Check for collisions, boundaries, and item collections
    for (let item of collectables) {
        if (player.x < item.x + 10 && player.x + 20 > item.x && player.y < item.y + 10 && player.y + 20 > item.y) {
            collectItem(item);
        }
    }
    drawMaze();
};

document.addEventListener('keydown', (event) => {
    if (!isGameRunning) return;

    switch (event.key) {
        case 'ArrowUp':
            player.y -= 5;
            break;
        case 'ArrowDown':
            player.y += 5;
            break;
        case 'ArrowLeft':
            player.x -= 5;
            break;
        case 'ArrowRight':
            player.x += 5;
            break;
    }

    updatePlayerPosition();
});

// Event listener for start game
startGameButton.addEventListener('click', () => {
    if (usernameInput.value && dobInput.value) {
        player.username = usernameInput.value;
        userNameDisplay.textContent = player.username;
        signupDiv.classList.add('hidden');
        gameDiv.classList.remove('hidden');
        isGameRunning = true;
        startTimer();
        drawMaze();
    } else {
        alert('Please fill in all fields.');
    }
});

// Toggle controls function
const toggleButtonControls = () => {
    const buttons = document.querySelectorAll('#controls button');
    buttons.forEach(button => {
        button.classList.toggle('hidden');
    });
};

// Add event listener for toggle control button
document.getElementById('toggle-controls').addEventListener('click', toggleButtonControls);

// Handling shop purchases
document.getElementById('buy-jump-boots').addEventListener('click', () => {
    if (player.coins >= 15) {
        player.coins -= 15;
        jumpBoots = true;
        coinsDisplay.textContent = player.coins;
        alert('Jump Boots purchased!');
    } else {
        alert('Not enough coins!');
    }
});

document.getElement
