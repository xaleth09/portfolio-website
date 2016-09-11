/**
 * Created by xaleth on 6/11/2016.
 */

const BASE_POINT = 25;
const PADDLE_WIDTH = 75;
const PADDLE_HEIGHT = 10;

var BB_canvas;
var BB_ctx;

var gameBalls = [];
var paddle = null;
var quadTree = null;
var board = null;
var frameID = null;

var BrickBreak_play = false;
var level = 1;
var score = 0;

var rightPressed = false;
var leftPressed = false;
var downPressed = false;
var upPressed = false;

    //Sets up initial variables and draws game for start view
    function setUp(){

        BB_canvas = document.getElementById("myCanvas");
        BB_ctx = BB_canvas.getContext("2d");

        BB_ctx.clearRect(0, 0, BB_canvas.width, BB_canvas.height);

        quadTree = new QuadTree(0, {x:0, y:0, width:BB_canvas.width, height:BB_canvas.height});

        gameBalls[0] = new Ball();

        for(let ball of gameBalls) ball.draw();

        paddle = new Brick({width: PADDLE_WIDTH, height: PADDLE_HEIGHT,
            x:(BB_canvas.width-PADDLE_WIDTH)/2, y:BB_canvas.height-PADDLE_HEIGHT,
            name:"paddle", numHits: -1});
        paddle.draw();

        level = 1;
        board = new Board();
        board.levelUp(level);
        board.draw();

        document.getElementById("score").innerHTML = "Score: "+score;

        //Adds all objects (ball(s), paddle(s), and bricks in board) to quad tree,
        //which is used to help efficiently check for collisions
        updateQuad();
    }

    //Play/Pause Game
    function playNpause(){
        BrickBreak_play = !BrickBreak_play;
        draw();
    }

    function lose() {
      playNpause();
      alert("Game Over");
      setUp();
    }

   function win(){
        BrickBreak_play = false;
        board.levelUp(++level);
        paddle.reset();
        BrickBreak_play = true;
        draw();
        BrickBreak_play = false;
        BB_ctx.font = "30px Comic Sans MS";
        BB_ctx.fillStyle = "#00ff00";
        BB_ctx.textAlign = "center";
        BB_ctx.fillText("LvL: "+level, BB_canvas.width/2, BB_canvas.height/2);
    }



    //Reconfigures QuadTree at each interval (called in draw())
    //clears and re-adds all objects within the game
    function updateQuad(){
        quadTree.clear();
        quadTree.insert(paddle);

        for(let b of gameBalls){
            quadTree.insert(b);
        }
        for(let brick of board.bricks){
            quadTree.insert(brick);
        }
    }

    function physics(){
        //Ball Physics: collision detection between walls, bricks, paddle(s)
        for(let ball of gameBalls) ball.physics();

        //Paddle movement
        if(rightPressed && paddle.x < BB_canvas.width-paddle.width) {
            paddle.x += 7;
        }else if(leftPressed && paddle.x > 0) {
            paddle.x -= 7;
        }else if(upPressed){
            //for later
        }else if(downPressed){
            //for later
        }
    }

    //updates quadtree, moves objects based on physics calculations
    //and draws all objects in game (paddle(s), ball(s), bricks
    function draw(){
        if(!BrickBreak_play){
            cancelAnimationFrame(frameID);
        }else{
            BB_ctx.clearRect(0, 0, BB_canvas.width, BB_canvas.height);

            updateQuad();

            physics();

            for(let ball of gameBalls)
                ball.draw();

            paddle.draw();
            board.draw();

            document.getElementById("score").innerHTML = "Score: "+score;

            frameID = requestAnimationFrame(draw);
        }
    }

    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);

    function keyDownHandler(e) {
        if(e.keyCode == 39) { //right arrow key
            rightPressed = true;
        }else if(e.keyCode == 37) { //left arrow key
            leftPressed = true;
        }else if(e.keyCode == 32 && e.target == document.body){ //spacebar
            e.preventDefault();
        }else if(e.keyCode == 38){ //up arrow key
            //win();
            upPressed = true;
        }else if(e.keyCode == 40){ //down arrow key
            downPressed = true;
        }
    }

    function keyUpHandler(e) {
        if(e.keyCode == 39) { //right arrow key
            rightPressed = false;
        }else if(e.keyCode == 37) { //left arrow key
            leftPressed = false;
        }else if(e.keyCode == 32){ //spacebar
            e.preventDefault();
            playNpause();
        }else if(e.keyCode == 38){ //up arrow key
            upPressed = false;
        }else if(e.keyCode == 40){ //down arrow key
            downPressed = false;
        }
    }











