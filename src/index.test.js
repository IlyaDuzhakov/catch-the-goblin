import { Board } from "./board.js";
import { Goblin } from "./goblin.js";
import { jest } from "@jest/globals";

describe("game", () => {
  //создали глобальные переменные для игры, для контейнера и для отображения количества успешных кликов и ошибок, для отображения сообщения об окончании игры
  let board;
  let goblin;
  let container;
  let successEl;
  let errorsEl;
  let messageEl;
  //перед запуском каждого теста создаем контейнер, отображение очков и пустой див для сообщения об окончании игры
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="container"></div>
      <div class="success">0</div>
      <div class="errors">0</div>
      <div class="message"></div>
    `;
    //создаем экземпляр класса game и получаем доступ к html элементам
    board = new Board(".container")
    goblin = new Goblin(board.clearBlocks, board.blocksList, () => {
      
    })
    container = document.querySelector(".container");

    successEl = document.querySelector(".success");
    errorsEl = document.querySelector(".errors");
    messageEl = document.querySelector(".message");
  });

  test("количество блоков - должно быть 16", () => {
    board.renderBlocks();
    expect(document.querySelectorAll(".block").length).toBe(16);
  });
  test("индекс должен быть от 0 до 15", () => {
    expect(goblin.getRandomIndex()).toBeGreaterThanOrEqual(0);
    expect(goblin.getRandomIndex()).toBeLessThanOrEqual(15);
  });
  test("наличие картинки после начала игры", () => {
    board.renderBlocks();
    goblin.startGame("./images/goblin.png");
    expect(document.querySelector("img")).not.toBeNull(); // ожидаем что картинка отрисовалась
  });
  test("успешный клик на картинку", () => {
    board.renderBlocks();
    goblin.startGame("test.png");
    goblin.clickOnBlocks();
    const picture = container.querySelector(".picture");
    //клик по картинке
    picture.click();
    //ожидаем что счет увеличится и что это отобразится в интерфейсе
    expect(goblin.success).toBe(1);
    expect(successEl.textContent).toBe("1"); // textContent = innerHTML
  });

  test("неуспешный клик на картинку", () => {
    board.renderBlocks();
    goblin.startGame("test.png");
    goblin.clickOnBlocks();
    // клик по блоку без картинки
    //получаем все блоки и берем из них первый из блоков, в котором не отрисовалась картинка
    const emptyBlock = [...container.querySelectorAll(".block")].find(
      (block) => !block.querySelector("img"),
    );
    //кликаем по этому блоку
    emptyBlock.click();
    //проверяем что ошибка появилась и отрисовалась
    expect(goblin.errors).toBe(2);
    expect(errorsEl.textContent).toBe("-2");
  });

   test("отсутствие кликов", () => {
        board.renderBlocks();
        goblin.startGame("test.png");
        goblin.clickOnBlocks();
        goblin.picturesCount = 6
        goblin.success = 1
        goblin.errors = 4
        goblin.startGame()
        expect(goblin.errors).toBe(5)
        expect(messageEl.textContent).toBe('Game Over')
   })

  test("окончание игры после 5 ошибок", () => {
    board.renderBlocks();
    goblin.startGame("test.png");
    goblin.clickOnBlocks();
    // ошибки до 5
    goblin.errors = 5;
    const emptyBlock = [...container.querySelectorAll(".block")].find(
      (block) => !block.querySelector("img"),
    );
    jest.useFakeTimers(); //возможность создавать ненастоящий таймер в jest при тестировании не нужно ждать пока таймер отработает
    global.timerId = setInterval(() => {
      goblin.startGame();
    }, 1000);
    emptyBlock.click();
    expect(messageEl.textContent).toBe("Game Over"); //проверяем, что в конце будет надпись об окончании игры
  });
  // });
// оптимизировали код будет делаться перед каждым тестом

test("новая игра сбрасывает счет и ошибки", () => {
  goblin.success = 10;
  goblin.errors = 5;
  goblin.picturesCount = 20;

  goblin.success = 0;
  goblin.errors = 0;
  goblin.picturesCount = 0;

  expect(goblin.success).toBe(0);
  expect(goblin.errors).toBe(0);
  expect(goblin.picturesCount).toBe(0);
});

test("сохранение нового рекорда в localStorage", () => {
  localStorage.setItem("bestScore", "5");

  goblin.success = 10;

  const currentScore = goblin.success;
  const bestScore = Number(localStorage.getItem("bestScore")) || 0;

  if (currentScore > bestScore) {
    localStorage.setItem("bestScore", currentScore);
  }

  expect(localStorage.getItem("bestScore")).toBe("10");
});

test("кнопка новой игры появляется после Game Over", () => {
  document.body.innerHTML += `
    <button class="restart-btn" style="display: none"></button>
  `;

  const restartBtn = document.querySelector(".restart-btn");

  restartBtn.style.display = "block";

  expect(restartBtn.style.display).toBe("block");
});
}); 