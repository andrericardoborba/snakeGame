let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let game = null;
let box = 32;
let snake = [];
snake[0] = {
  x: 8 * box,
  y: 8 * box,
};
let levelUp = 1;
let scoreUp = 1;

let direction = "right";
let food = {
  x: Math.floor(Math.random() * 15 + 1) * box,
  y: Math.floor(Math.random() * 15 + 1) * box,
};

function scoreFood() {
  function addLevel() {
    let level = (document.querySelector("#level").innerHTML = levelUp++);
  }
  let score = (document.querySelector("#score").innerHTML = scoreUp++);
  if (scoreUp % 5 == 0) {
    addLevel();
  }
}

function makeBG() {
  context.fillStyle = "#737a7a";
  context.fillRect(0, 0, 16 * box, 16 * box);
}

function makeSnake() {
  for (let i = 0; i < snake.length; i++) {
    context.fillStyle = "black";
    context.strokeStyle = "#ffffff";
    context.lineWidth = 2;
    context.fillRect(snake[i].x, snake[i].y, box, box);
    context.strokeRect(snake[i].x, snake[i].y, box, box);
  }
}

function drawFood() {
  context.fillStyle = "#800800";
  context.strokeStyle = "#ffffff";
  context.lineWidth = 2;
  context.fillRect(food.x, food.y, box, box);
  context.strokeRect(food.x, food.y, box, box);
}

document.addEventListener("keydown", update);

function update(event) {
  if (event.keyCode == 37 && direction != "right") direction = "left";
  if (event.keyCode == 38 && direction != "down") direction = "up";
  if (event.keyCode == 39 && direction != "left") direction = "right";
  if (event.keyCode == 40 && direction != "up") direction = "down";
}

function playGame() {
  if (snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
  if (snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
  if (snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
  if (snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;

  for (let i = 1; i < snake.length; i++) {
    if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
      clearInterval(game);
      let gameOver = document.querySelector(".gameOver");
      gameOver.style.display = "flex";
    }
  }

  makeBG();
  makeSnake();
  drawFood();

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (direction == "right") snakeX += box;
  if (direction == "left") snakeX -= box;
  if (direction == "up") snakeY -= box;
  if (direction == "down") snakeY += box;

  if (snakeX != food.x || snakeY != food.y) {
    snake.pop();
  } else {
    food.x = Math.floor(Math.random() * 15 + 1) * box;
    food.y = Math.floor(Math.random() * 15 + 1) * box;
    scoreFood();
  }

  let newHead = {
    x: snakeX,
    y: snakeY,
  };
  snake.unshift(newHead);
}

function restart() {
  let gameOver = document.querySelector(".gameOver");
  gameOver.style.display = "none";
  snake = [];
  snake[0] = {
    x: 8 * box,
    y: 8 * box,
  };
  document.querySelector("#level").innerHTML = 1;
  document.querySelector("#score").innerHTML = 0;
  levelUp = 1;
  scoreUp = 1;
  direction = "right";
  food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box,
  };
  game = setInterval(playGame, 150);
}
function start() {
  let startGame = document.querySelector(".startGame");
  startGame.style.display = "none";
  game = setInterval(playGame, 150);
}
