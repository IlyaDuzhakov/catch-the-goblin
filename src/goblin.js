import picture from "./images/goblin.png";

class Goblin {
  constructor(clear, blocks, stopGame, restartTimer) {
    //this.timerId = timerId // для доступа за пределами функции constructor
    this.stopGame = stopGame;
    this.clear = clear;
    this.blocks = blocks;
    this.maxErrors = 5;
    this.success = 0;
    this.errors = 0;
    this.lastIndex = -1;
    this.picturesCount = 0;
    this.restartTimer = restartTimer;
  }
  getRandomIndex() {
    let number;
    do {
      number = Math.floor(Math.random() * 16); //floor - округляем до меньшего ceil - до большего
    } while (number === this.lastIndex);
    {
      this.lastIndex = number;
      return number;
    }
  }
  getSpeed() {
  if (this.success >= 50) {
    return 500;
  }

  if (this.success >= 40) {
    return 600;
  }

  if (this.success >= 30) {
    return 700;
  }

  if (this.success >= 20) {
    return 800;
  }

  if (this.success >= 10) {
    return 900;
  }

  return 1000;
}
  startGame(pic = picture) {
    const textErrors = document.querySelector(".errors");
    const message = document.querySelector(".message");
    this.picturesCount = this.picturesCount + 1;
    if (this.picturesCount > this.success + this.errors) {
      if (this.errors < this.maxErrors) {
        this.errors = this.errors + 1;
        if (this.errors === 5) {
          message.innerHTML = "Game Over"; // тесты выявили ошибку в логике в случае отсутствия 5 клика не отображалась надпись "Game Over"
          const restartBtn = document.querySelector(".restart-btn");

          if (restartBtn) {
            restartBtn.style.display = "block";
          }
          this.stopGame();
        }
        textErrors.innerHTML = textErrors.innerHTML - 1;
      } else {
        message.innerHTML = "Game Over";
        const restartBtn = document.querySelector(".restart-btn");

        if (restartBtn) {
          restartBtn.style.display = "block";
        }
        this.stopGame();
      }
    }
    const randomIndex = this.getRandomIndex();
    const html = document.createElement("img");
    html.setAttribute("src", `${pic}`);
    html.setAttribute("class", `picture`);
    html.setAttribute("alt", `picture`);
    this.clear();
    this.blocks[randomIndex].insertAdjacentElement("afterbegin", html);
  }

  clickOnBlocks() {
    const textSuccess = document.querySelector(".success");
    const textErrors = document.querySelector(".errors");
    const message = document.querySelector(".message");
    for (let i = 0; i < this.blocks.length; i = i + 1) {
      this.blocks[i].addEventListener("click", (event) => {
        if (event.target.classList.contains("picture")) {
          // contains проверяет наличие класса и возвращает boolean
          if (this.errors < 5) {
            this.success = this.success + 1;
            textSuccess.innerHTML = this.success;
            event.target.remove(); // удаляем картинку
            if (this.restartTimer) {
  this.restartTimer();
}
          }
        } else {
          if (this.errors < this.maxErrors) {
            this.errors = this.errors + 1;
            textErrors.innerHTML = textErrors.innerHTML - 1;
          } else {
            message.innerHTML = "Game Over";
            this.stopGame();
          }
        }
      });
    }
  }
}

export { Goblin };
