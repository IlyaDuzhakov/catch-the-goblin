import "./style.css";

import { Board } from "./board.js";
import { Goblin } from "./goblin.js";

let timerId  // если мы создали переменную и не присвоили ей значение, то по умолчанию она будет underfined

const board = new Board(".container");
const goblin = new Goblin(board.clearBlocks, board.blocksList, () => {
  clearInterval(timerId)
   checkRecord();
})

board.renderBlocks();

goblin.startGame();
goblin.clickOnBlocks();
timerId = setInterval(() => {
   goblin.startGame();
 }, 1000);

function restartGame() {
  goblin.success = 0;
  goblin.errors = 0;
  goblin.picturesCount = 0;
  clearInterval(timerId);
  document.querySelector(".success").textContent = "0";
  document.querySelector(".errors").textContent = "5";
  document.querySelector(".message").textContent = "";

  const restartBtn = document.querySelector(".restart-btn");

  if (restartBtn) {
    restartBtn.style.display = "none";
  }

  goblin.startGame();

  timerId = setInterval(() => {
    goblin.startGame();
  }, 1000);
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


