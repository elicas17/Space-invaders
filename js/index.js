$(() => {
    var canvas = document.getElementById("myCanvas");
    // var canvas =$("#myCanvas");
    var ctx = canvas.getContext("2d");
    // ball
    var x = canvas.width / 2;
    var y = canvas.height - 30;
    var dx = -3;
    var dy = -3;
    var ballRadius = 10;
    // paleta
    var paddleHeight = 10;
    var paddleWidth = 75;
    var paddleX = (canvas.width - paddleWidth) / 2;
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

    var img1 = new Image();
    img1.src = "img/barnizar_una_pared_de_ladrillo.jpg";
    var img2 = new Image();
    img2.src = "img/barnizar_una_pared_de_ladrillo_roto.jpg";

    // contador
    var score = 0;
    // vidas
    var lives = 3;

    

    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);
    document.addEventListener("mousemove", mouseMoveHandler, false);
    function mouseMoveHandler(e) {
        var relativeX = e.clientX - canvas.offsetLeft;
        if (relativeX > 0 && relativeX < canvas.width) {
            paddleX = relativeX - paddleWidth / 2;
        }
    }

    var bricks = [];
    for (c = 0; c < brickColumnCount; c++) {
        bricks[c] = [];
        for (r = 0; r < brickRowCount; r++) {
            bricks[c][r] = { x: 0, y: 0, status: 2, disabled: false };
        }
    }
    function drawBricks() {
        for (c = 0; c < brickColumnCount; c++) {
            for (r = 0; r < brickRowCount; r++) {
                if (bricks[c][r].status == 2 ) {
                    // if(bricks[1][3]){

                    // }else{

                    // }
                    var brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
                    var brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
                    bricks[c][r].x = brickX;
                    bricks[c][r].y = brickY;
                    ctx.beginPath();
                    // ctx.rect(brickX, brickY, brickWidth, brickHeight);
                    ctx.drawImage(img1, brickX, brickY, brickWidth, brickHeight);
                    ctx.fillStyle = "#0095DD";
                    ctx.fill();
                    ctx.closePath();
                }
                if (bricks[c][r].status == 1) {
                    var brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
                    var brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
                    bricks[c][r].x = brickX;
                    bricks[c][r].y = brickY;
                    ctx.beginPath();
                    // ctx.rect(brickX, brickY, brickWidth, brickHeight);
                    ctx.drawImage(img2, brickX, brickY, brickWidth, brickHeight);
                    ctx.fillStyle = "#0095DD";
                    ctx.fill();
                    ctx.closePath();
                }

            }
        }
    }
    function drawBall() {
        ctx.beginPath();
        ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
        ctx.fillStyle = "#ffff";
        ctx.fill();
        ctx.closePath();
    }
    function drawPaddle() {
        ctx.beginPath();
        ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }
    function keyDownHandler(e) {
        if (e.keyCode == 39) {
            // derecha
            rightPressed = true;
        }
        else if (e.keyCode == 37) {
            // izquierda
            leftPressed = true;
        }
    }

    function keyUpHandler(e) {
        if (e.keyCode == 39) {
            rightPressed = false;
        }
        else if (e.keyCode == 37) {
            leftPressed = false;
        }
    }
    function collisionDetection() {
        for (c = 0; c < brickColumnCount; c++) {
            for (r = 0; r < brickRowCount; r++) {
                var b = bricks[c][r];
                if (b.status >= 1) {
                    if (x > b.x && b.disabled == false && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                        dy = -dy;
                        b.status--;
                        score = score + 0.5;
                    }
                }
            }
        }
    }
    function drawScore() {
        ctx.font = "16px Arial";
        ctx.fillStyle = "#0095DD";
        ctx.fillText("Score: " + score, 8, 20);
    }
    function drawLives() {
        ctx.font = "16px Arial";
        ctx.fillStyle = "#0095DD";
        ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
    }
    function drawVictory() {
        ctx.font = "16px Arial";
        ctx.fillStyle = "#0095DD";
        ctx.fillText("YOU WIN. CONGRATULATIONS! Score: " + score, canvas.width / 2, canvas.height);
    }
    function drawLose() {
        ctx.font = "16px Arial";
        ctx.fillStyle = "#0095DD";
        ctx.fillText("YOU WIN. CONGRATULATIONS! Score: " + score, canvas.width / 2, canvas.height);
    }
    function drawWelcome() {
        ctx.font = "30px Arial";
        ctx.fillStyle = "#ffff";
        ctx.fillText("WELCOME!", canvas.width / 2 - 70, canvas.height / 2);
    }
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        drawPaddle();
        drawScore();
        drawBricks();
        drawBall();
        drawLives()

        collisionDetection()
        if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
            dx = -dx;
        }
        if (y + dy < ballRadius) {
            dy = -dy;
        } else if (y + dy > canvas.height - ballRadius) {
            if (x > paddleX && x < paddleX + paddleWidth) {
                dy = -dy;
            } else {
                lives--;
                if (!lives) {
                    alert("GAME OVER");
                    document.location.reload();
                }
                else {
                    x = canvas.width / 2;
                    y = canvas.height - 30;
                    dx = 2;
                    dy = -2;
                    paddleX = (canvas.width - paddleWidth) / 2;
                }
            }

        }
        if (rightPressed && paddleX < canvas.width - paddleWidth) {
            paddleX += 7;
        }
        else if (leftPressed && paddleX > 0) {
            paddleX -= 7;
        }
        x += dx;
        y += dy;

        elId = requestAnimationFrame(draw);

    }
    drawWelcome();
    $('#empezar').click(()=>{
        document.getElementById('empezar').disabled = true;
        document.getElementById('finalizar').disabled = false;
        document.getElementById('pausa').disabled = false;
        draw();
    })
    $('#finalizar').click(()=>{
        document.location.reload();
    });
    $('#pausa').click(()=>{
        document.getElementById('empezar').disabled = false;
        document.getElementById('finalizar').disabled = false;
        document.getElementById('pausa').disabled = false;
        window.cancelAnimationFrame(elId);
    });

    $('#borrar').click(()=>{
        $('#txt1').hide();
    });
    $('#mostrar').click(()=>{
        $('#txt1').attr("hidden",false);
    });
})


