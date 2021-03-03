let canvas = document.getElementById('snake');
let context = canvas.getContext('2d');
let box = 32;
let snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box
}
let levelUp = 1;
let scoreUp = 1;

let direction = "right";
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}
// console.log(food.x, food.y);
function addLevel(){   
    let level = document.querySelector("#level").innerHTML = levelUp++;      
}
function scoreFood(){
    let score = document.querySelector("#score");
    score.innerHTML = scoreUp++;
    console.log(scoreUp);
    if(scoreUp % 3 == 0){
        addLevel()
    }
}

function makeBG(){
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 16 * box, 16 * box);
}

function makeSnake(){
    for(let i= 0; i< snake.length; i++){
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function drawFood(){
    context.fillStyle ='red';
    context.fillRect(food.x, food.y, box, box);
}

document.addEventListener('keydown', update);

function update(event){
    if(event.keyCode == 37 && direction != "right") direction = "left";
    if(event.keyCode == 38 && direction != "down") direction = "up";
    if(event.keyCode == 39 && direction != "left") direction = "right";
    if(event.keyCode == 40 && direction != "up") direction = "down";
}

function playGame(){
    if(snake[0].x > 15 * box && direction == "right" ) snake[0].x = 0;
    if(snake[0].x < 0 && direction == "left" ) snake[0].x = 16 * box;
    if(snake[0].y > 15 * box && direction == "down" ) snake[0].y = 0;
    if(snake[0].y < 0 && direction == "up" ) snake[0].y = 16 * box;

    for(let i = 1; i< snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(game);
            alert('Game Over :(')
        }
    }

    makeBG();
    makeSnake();
    drawFood();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;

    if(snakeX != food.x || snakeY != food.y){
        snake.pop();
    }else{
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
        scoreFood();
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }
    snake.unshift(newHead);
}

let game = setInterval(playGame, 150);





