const cards = document.querySelectorAll('.card');
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;
let count = 0;

function flipCard() {
  if(lockBoard) return;
  if(this === firstCard) return;
  this.classList.add('flip');
  
  if(!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  hasFlippedCard = false;
  checkFormMatch();
}

function checkFormMatch() {
  if(firstCard.dataset.card === secondCard.dataset.card) {
    disableCards();
    reset();
    return;
  }

  return unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach((card) => {
    let randomPosition = Math.floor(Math.random() * 12);
    card.style.order = randomPosition;
  })
})();

function shuffle() {
  cards.forEach((card) => {
    let randomPosition = Math.floor(Math.random() * 12);
    card.style.order = randomPosition;
  })
}

cards.forEach((card) => {
  card.addEventListener('click', flipCard);
})

function reset() {
  count++;
  
  if(count === 6) {
    setTimeout(() => {
      cards.forEach((card) => {
        card.classList.remove('flip');
        card.addEventListener('click', flipCard);
      })
      count = 0;
      shuffle();
      resetBoard();
    }, 1500);
  }
}

