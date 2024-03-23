//board
let blocksize = 25;
let rows = 20;
let cols = 20;
let board;
let context;

//snake head
let snakeX = blocksize * 5;
let snakeY = blocksize * 5;

//food
let foodX;
let foodY;

//velocity
let vX = 0,
  vY = 0;

let snakeBody = [];
let gameOver = false;

window.onload = function () {
  board = document.getElementById("board");

  board.height = rows * blocksize;
  board.width = cols * blocksize;
  context = board.getContext("2d"); //use for drwaing on board

  placeFood();
  document.addEventListener("keyup", changeDirection);
  // update();
  setInterval(update, 100); //100ms
};

function update() {
  if (gameOver) {
    return;
  }
  context.fillStyle = "black"; //bg
  context.fillRect(0, 0, board.width, board.height);

  if (snakeX === foodX && snakeY === foodY) {
    snakeBody.push([foodX, foodY]);
    placeFood();
  }

  context.fillStyle = "red"; //food
  context.fillRect(foodX, foodY, blocksize, blocksize);

  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }
  if (snakeBody.length) {
    snakeBody[0] = [snakeX, snakeY];
  }

  context.fillStyle = "lime"; //snakehead
  snakeX += vX * blocksize;
  snakeY += vY * blocksize;
  context.fillRect(snakeX, snakeY, blocksize, blocksize);
  for (let i = 0; i < snakeBody.length; i++) {
    context.fillRect(snakeBody[i][0], snakeBody[i][1], blocksize, blocksize);
  }

  //gameover condition
  if (
    snakeX < 0 ||
    snakeX > cols * blocksize ||
    snakeY < 0 ||
    snakeY > rows * blocksize
  ) {
    gameOver = true;
    alert("Game Over");
  }

  for (let i = 0; i < snakeBody.length; i++) {
    if (snakeX === snakeBody[i][0] && snakeY === snakeBody[i][1]) {
      gameOver = true;
      alert("Game Over");
    }
  }
}

function placeFood() {
  foodX = Math.floor(Math.random() * cols) * blocksize;
  foodY = Math.floor(Math.random() * cols) * blocksize;
}

function changeDirection(e) {
  if (e.code === "ArrowUp" && vY !== 1) {
    vX = 0;
    vY = -1;
  }
  if (e.code === "ArrowDown" && vY !== -1) {
    vX = 0;
    vY = 1;
  }
  if (e.code === "ArrowLeft" && vX !== 1) {
    vX = -1;
    vY = 0;
  }
  if (e.code === "ArrowRight" && vX !== -1) {
    vX = 1;
    vY = 0;
  }
}
