let bucket = document.getElementById('bucket');
let gameArea = document.getElementById('gameArea');
let scoreBoard = document.getElementById('scoreBoard');
let resetButton = document.getElementById('resetButton');
let score = 0;
let gameWidth = gameArea.offsetWidth;
let gameHeight = gameArea.offsetHeight;
let bottomThreshold = gameHeight * 0.75; // Define bottom 25% area
let ballIntervals = [];

// Move the bucket only when the mouse is in the bottom 25% of the game area
document.addEventListener('mousemove', (e) => {
    if (e.clientY >= bottomThreshold) { // Check if the mouse is in the bottom 25%
        let bucketX = e.clientX - bucket.offsetWidth / 2;
        if (bucketX >= 0 && bucketX <= gameWidth - bucket.offsetWidth) {
            bucket.style.left = `${bucketX}px`;
        }
    }
});

// Function to drop balls
function dropBall() {
    let ball = document.createElement('div');
    ball.classList.add('ball');
    ball.style.left = Math.random() * (gameWidth - 30) + 'px'; // Random horizontal position
    gameArea.appendChild(ball);

    let fallSpeed = Math.random() * 3 + 2;  // Random speed for each ball

    // Ball falling animation
    let fallInterval = setInterval(() => {
        let ballTop = ball.offsetTop;
        let ballLeft = ball.offsetLeft;
        let ballBottom = ballTop + ball.offsetHeight;
        let bucketLeft = bucket.offsetLeft;
        let bucketRight = bucketLeft + bucket.offsetWidth;
        let bucketTop = bucket.offsetTop;

        // Check if the ball reaches the bucket
        if (ballBottom >= bucketTop && ballLeft + ball.offsetWidth / 2 > bucketLeft && ballLeft + ball.offsetWidth / 2 < bucketRight) {
            score++;
            scoreBoard.innerText = `Score: ${score}`;
            gameArea.removeChild(ball);
            clearInterval(fallInterval);
        } else if (ballTop > gameHeight) {
            gameArea.removeChild(ball);
            clearInterval(fallInterval);
        } else {
            ball.style.top = `${ballTop + fallSpeed}px`;
        }
    }, 20);

    ballIntervals.push(fallInterval);
}

// Generate a new ball every 1.2 seconds
let gameInterval = setInterval(dropBall, 1600);

// Reset the game
resetButton.addEventListener('click', resetGame);

function resetGame() {
    // Reset the score
    score = 0;
    scoreBoard.innerText = `Score: ${score}`;
    
    // Clear all existing balls
    let balls = document.querySelectorAll('.ball');
    balls.forEach(ball => {
        gameArea.removeChild(ball);
    });

    // Clear all ball intervals
    ballIntervals.forEach(interval => clearInterval(interval));
    ballIntervals = [];

    // Reset the ball generation interval
    clearInterval(gameInterval);
    gameInterval = setInterval(dropBall, 1200);
}
function redirectToPage() {
    var selectElement = document.getElementById("pageSelect");
    var selectedValue = selectElement.value;
    if (selectedValue) {
        window.location.href = selectedValue;
    }
}