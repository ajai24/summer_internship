// Select DOM elements
const score1El = document.getElementById('score-1');
const score2El = document.getElementById('score-2');
const current1El = document.getElementById('current-1');
const current2El = document.getElementById('current-2');
const diceEl = document.querySelector('.dice');

const btnNew = document.querySelector('.new-game');
const btnRoll = document.querySelector('.roll');
const btnHold = document.querySelector('.hold');

let scores, currentScore, activePlayer, playing;

function init() {
  scores = [0, 0];         
  currentScore = 0;       
  activePlayer = 0;        
  playing = true;          

  score1El.textContent = '0';
  score2El.textContent = '0';
  current1El.textContent = '0';
  current2El.textContent = '0';

  diceEl.style.display = 'none';

  document.querySelector('.player-1').style.backgroundColor = 'rgba(255,255,255,0.2)';
  document.querySelector('.player-2').style.backgroundColor = 'rgba(255,255,255,0.1)';
}

function switchPlayer() {
  document.getElementById(`current-${activePlayer + 1}`).textContent = '0';
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;

  document.querySelector('.player-1').style.backgroundColor =
    activePlayer === 0 ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.1)';
  document.querySelector('.player-2').style.backgroundColor =
    activePlayer === 1 ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.1)';
}

btnRoll.addEventListener('click', function () {
  if (playing) {
    const dice = Math.floor(Math.random() * 6) + 1;

    diceEl.style.display = 'block';
    diceEl.src = `src/img${dice}.jpg`;

    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current-${activePlayer + 1}`).textContent = currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score-${activePlayer + 1}`).textContent = scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.style.display = 'none';
      alert(`🎉 Player ${activePlayer + 1} Wins!`);
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);

init();
