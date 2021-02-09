var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
// ball
var x = canvas.width / 2;
var y = canvas.height - 30;
var dx = 2;
var dy = -2;
var ballRadius = 10;
// paleta
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2;
// usuario
var rightPressed = false;
var leftPressed = false;
// ladrillos
var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

var bricks = [];
for(c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(r=0; r<brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0 };
    }
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}
function keyDownHandler(e) {
    if(e.keyCode == 39) {
        // derecha
        rightPressed = true;
    }
    else if(e.keyCode == 37) {
        // izquierda
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = false;
    }
    else if(e.keyCode == 37) {
        leftPressed = false;
    }
}
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPaddle();
    drawBall();
    if (x + dx > canvas.width - ballRadius  || x + dx < ballRadius ) {
        dx = -dx;
    }
    if ( y + dy < ballRadius) {
        dy = -dy;
    }else if(y + dy > canvas.height - ballRadius){
        if(x>paddleX && x<paddleX +paddleWidth){
            dy=-dy;
        }else{
            alert('GAME OVER');
            clearInterval(id);
            document.location.reload();
        }
    }
    x += dx;
    y += dy;
    if(rightPressed && paddleX < canvas.width-paddleWidth) {
        paddleX += 7;
    }
    else if(leftPressed && paddleX > 0) {
        paddleX -= 7;
    }
}
document.getElementById('empezar').addEventListener('click',()=>{
    id=setInterval(draw, 7);
});

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
