import "./style.css";

import { Board } from "./board.js";
import { Goblin } from "./goblin.js";
import gameMusic from "./audio/game-music.mp3";

let timerId  // если мы создали переменную и не присвоили ей значение, то по умолчанию она будет underfined

const board = new Board(".container");
const goblin = new Goblin(board.clearBlocks, board.blocksList, () => {
  clearInterval(timerId)
   checkRecord();
}, startTimer)

board.renderBlocks();

goblin.startGame();
goblin.clickOnBlocks();
timerId = setInterval(() => {
   goblin.startGame();
 }, 1000);


 function startTimer() {
  clearInterval(timerId);

  timerId = setInterval(() => {
    goblin.startGame();
  }, goblin.getSpeed());
}

function restartGame() {
  goblin.success = 0;
  goblin.errors = 0;
  goblin.picturesCount = 0;
  clearInterval(timerId);
  document.querySelector(".success").textContent = "0";
  document.querySelector(".lives").textContent = "❤️❤️❤️❤️❤️❤️❤️";
  document.querySelector(".message").textContent = "";

  const restartBtn = document.querySelector(".restart-btn");

  if (restartBtn) {
    restartBtn.style.display = "none";
  }

  goblin.startGame();
  startTimer();
}

const restartBtn = document.querySelector(".restart-btn");

restartBtn.addEventListener("click", () => {
  restartGame();
 
});

const popupBtn = document.querySelector(".record-popup__btn");

popupBtn.addEventListener("click", () => {
  const popup = document.querySelector(".record-popup");
  popup.classList.add("hidden");
});

const music = document.querySelector(".game-music");
const musicBtn = document.querySelector(".music-btn");

music.src = gameMusic;
music.volume = 0.3;

function showRecordPopup(score) {
  const popup = document.querySelector(".record-popup");
  const recordScore = document.querySelector(".record-score");

  recordScore.textContent = score;
  popup.classList.remove("hidden");
}

function checkRecord() {
  const currentScore = goblin.success;
  const bestScore = Number(localStorage.getItem("bestScore")) || 10;

  if (currentScore > 0 && currentScore > bestScore) {
    localStorage.setItem("bestScore", currentScore);

    setTimeout(() => {
      showRecordPopup(currentScore);
    }, 1500);
  }
}

musicBtn.addEventListener("click", () => {
  if (music.paused) {
    music.play();
    musicBtn.textContent = "🔇 Выключить";
  } else {
    music.pause();
    musicBtn.textContent = "🎵 Музыка";
  }
});
