// Game constants & variables.
let SnakeVelocity = {x: 0, y: 0};
const foodSound = new Audio('food.mp3');
const gameOverSound = new Audio('gameover.mp3');
const moveSound = new Audio('move.mp3');
const musicSound = new Audio('music.mp3');
let speed = 20;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [
    {x: 10, y: 12}
]
food = {x: 4, y: 13};

// game Functions
function main(ctime){
    window.requestAnimationFrame(main);
    // console.log(ctime);
    
    if(score > 2){
        speed = 20 + (2*score);             //<------   //gradually increasing the speed of the game.
    }

    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snakeArr){
    // if you bump into yourself
    for (let i = 1; i < snakeArr.length; i++) {
        if(snakeArr[i].x === snakeArr[0].x && snakeArr[i].y === snakeArr[0].y){
            return true;
        }
    }
    // if you collide into the wall.
    if(snakeArr[0].x >= 18 || snakeArr[0].x <= 0 || snakeArr[0].y >= 18 || snakeArr[0].y <= 0){
        return true;
    }
    return false;
}


function gameEngine(){
    // Part 1: Updating the snake and food.
    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        SnakeVelocity = {x: 0, y: 0};
        alert("Game Over. Press OK to restart!");
        snakeArr = [{x: 13, y: 15}];
        musicSound.play();
        score = 0;
        scoreBox.innerHTML = "Score: " + score;
        speed = 20;
    }
    // if you have eaten the food, increment the score and regenerate the food.
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){                  //snakeArr[0] is the head of the snake.
        foodSound.play();
        score += 1;

        if(score > hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "High Score: " + hiscoreval;
        }
        scoreBox.innerHTML = "Score: " + score;

        snakeArr.push({x: snakeArr[snakeArr.length - 1].x + SnakeVelocity.x, y: snakeArr[snakeArr.length - 1].y + SnakeVelocity.y});
        let a = 1;                                                                                     //increasing the length of the snake
        let b = 17;                                                                                    //and generating new food.
        food = {x: Math.round(a + (b-a)*Math.random()), y: Math.round(a + (b-a)*Math.random())};
    }

    // moving the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i+1] = {...snakeArr[i]};
    }

    snakeArr[0].x += SnakeVelocity.x;
    snakeArr[0].y += SnakeVelocity.y;

    // Part 2: display the snake and food.
    board.innerHTML = "";
    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    // display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}

//Main logic starts here
musicSound.play();

let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "High Score: " + hiscore;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown', e =>{
    SnakeVelocity = {x: 0, y: 1}    // starting the game
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            SnakeVelocity.x = 0;
            SnakeVelocity.y = -1;
            break;
        
        case "ArrowDown":
            console.log("ArrowDown");
            SnakeVelocity.x = 0;
            SnakeVelocity.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            SnakeVelocity.x = -1;
            SnakeVelocity.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            SnakeVelocity.x = 1;
            SnakeVelocity.y = 0;
            break;
    
        default:
            break;
    }
});