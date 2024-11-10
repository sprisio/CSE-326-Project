const holes = document.querySelectorAll('.hole');
const moles = document.querySelectorAll('.mole');
const scoreElement = document.getElementById('score');
const timeElement = document.getElementById('time');
const startBtn = document.getElementById('startBtn');

let lastHole;
let timeUp = false;
let score = 0;
let gameTime = 30;  // 30 seconds timer
let gameTimer;

function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
    const index = Math.floor(Math.random() * holes.length);
    const hole = holes[index];
    if (hole === lastHole) {
        return randomHole(holes);
    }
    lastHole = hole;
    return hole;
}

function popUpMole() {
    const time = randomTime(200, 1000);  // Mole appears for a random time between 200ms and 1000ms
    const hole = randomHole(holes);
    const mole = hole.querySelector('.mole');
    mole.classList.add('up');  // Make the mole pop up
    setTimeout(() => {
        mole.classList.remove('up');  // Mole goes back down
        if (!timeUp) popUpMole();  // Continue popping up moles until time is up
    }, time);
}

function startGame() {
    score = 0;
    scoreElement.textContent = score;
    timeUp = false;
    gameTime = 30;
    timeElement.textContent = gameTime;
    
    startBtn.disabled = true;  // Disable start button while the game is running

    popUpMole();  // Start popping up moles
    
    gameTimer = setInterval(() => {
        gameTime--;
        timeElement.textContent = gameTime;
        if (gameTime <= 0) {
            clearInterval(gameTimer);
            timeUp = true;
            alert('Game Over! Your final score is ' + score);
            startBtn.disabled = false;  // Re-enable the start button
        }
    }, 1000);
}

moles.forEach(mole => {
    mole.addEventListener('click', function() {
        if (!mole.classList.contains('up')) return;  // Only count if mole is up
        score++;
        mole.classList.remove('up');
        scoreElement.textContent = score;
    });
});

startBtn.addEventListener('click', startGame);
function redirectToPage() {
    var selectElement = document.getElementById("pageSelect");
    var selectedValue = selectElement.value;
    if (selectedValue) {
        window.location.href = selectedValue;
    }
}

