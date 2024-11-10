const cardValues = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'];
let cardArray = [];
let cardFlipped = [];
let matchedCards = 0;

const gameBoard = document.getElementById('game-board');
const scoreDisplay = document.getElementById('score');
const resetButton = document.getElementById('reset');

// Shuffle cards
function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

// Create card elements
function createCards() {
    cardArray = shuffle(cardValues);
    gameBoard.innerHTML = '';

    cardArray.forEach((value, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('data-value', value);
        card.setAttribute('data-index', index);
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });
}

// Flip card
function flipCard() {
    if (cardFlipped.length < 2 && !this.classList.contains('flipped')) {
        this.classList.add('flipped');
        this.innerText = this.getAttribute('data-value');
        cardFlipped.push(this);

        if (cardFlipped.length === 2) {
            checkMatch();
        }
    }
}

// Check for match
function checkMatch() {
    const [firstCard, secondCard] = cardFlipped;

    if (firstCard.getAttribute('data-value') === secondCard.getAttribute('data-value')) {
        matchedCards += 2;
        scoreDisplay.innerText = `Matched Cards: ${matchedCards}`;
        cardFlipped = [];
        if (matchedCards === cardArray.length) {
            alert('You won! Resetting the game.');
            resetGame();
        }
    } else {
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            firstCard.innerText = '';
            secondCard.innerText = '';
            cardFlipped = [];
        }, 1000);
    }
}

// Reset game
function resetGame() {
    matchedCards = 0;
    scoreDisplay.innerText = '';
    createCards();
}

// Initialize game
resetButton.addEventListener('click', resetGame);
createCards();
