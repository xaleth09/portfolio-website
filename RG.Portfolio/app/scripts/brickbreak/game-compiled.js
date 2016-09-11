"use strict";

/**
 * Created by xaleth on 6/11/2016.
 */

var BASE_POINT = 25;
var PADDLE_WIDTH = 75;
var PADDLE_HEIGHT = 10;

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
function setUp() {

    BB_canvas = document.getElementById("myCanvas");
    BB_ctx = BB_canvas.getContext("2d");

    BB_ctx.clearRect(0, 0, BB_canvas.width, BB_canvas.height);

    quadTree = new QuadTree(0, { x: 0, y: 0, width: BB_canvas.width, height: BB_canvas.height });

    gameBalls[0] = new Ball();

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = gameBalls[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var ball = _step.value;
            ball.draw();
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    paddle = new Brick({ width: PADDLE_WIDTH, height: PADDLE_HEIGHT,
        x: (BB_canvas.width - PADDLE_WIDTH) / 2, y: BB_canvas.height - PADDLE_HEIGHT,
        name: "paddle", numHits: -1 });
    paddle.draw();

    level = 1;
    board = new Board();
    board.levelUp(level);
    board.draw();

    document.getElementById("score").innerHTML = "Score: " + score;

    //Adds all objects (ball(s), paddle(s), and bricks in board) to quad tree,
    //which is used to help efficiently check for collisions
    updateQuad();
}

//Play/Pause Game
function playNpause() {
    BrickBreak_play = !BrickBreak_play;
    draw();
}

function lose() {
    playNpause();
    alert("Game Over");
    setUp();
}

function win() {
    BrickBreak_play = false;
    board.levelUp(++level);
    paddle.reset();
    BrickBreak_play = true;
    draw();
    BrickBreak_play = false;
    BB_ctx.font = "30px Comic Sans MS";
    BB_ctx.fillStyle = "#00ff00";
    BB_ctx.textAlign = "center";
    BB_ctx.fillText("LvL: " + level, BB_canvas.width / 2, BB_canvas.height / 2);
}

//Reconfigures QuadTree at each interval (called in draw())
//clears and re-adds all objects within the game
function updateQuad() {
    quadTree.clear();
    quadTree.insert(paddle);

    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
        for (var _iterator2 = gameBalls[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var b = _step2.value;

            quadTree.insert(b);
        }
    } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
            }
        } finally {
            if (_didIteratorError2) {
                throw _iteratorError2;
            }
        }
    }

    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
        for (var _iterator3 = board.bricks[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var brick = _step3.value;

            quadTree.insert(brick);
        }
    } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion3 && _iterator3.return) {
                _iterator3.return();
            }
        } finally {
            if (_didIteratorError3) {
                throw _iteratorError3;
            }
        }
    }
}

function physics() {
    //Ball Physics: collision detection between walls, bricks, paddle(s)
    var _iteratorNormalCompletion4 = true;
    var _didIteratorError4 = false;
    var _iteratorError4 = undefined;

    try {
        for (var _iterator4 = gameBalls[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
            var ball = _step4.value;
            ball.physics();
        } //Paddle movement
    } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion4 && _iterator4.return) {
                _iterator4.return();
            }
        } finally {
            if (_didIteratorError4) {
                throw _iteratorError4;
            }
        }
    }

    if (rightPressed && paddle.x < BB_canvas.width - paddle.width) {
        paddle.x += 7;
    } else if (leftPressed && paddle.x > 0) {
        paddle.x -= 7;
    } else if (upPressed) {
        //for later
    } else if (downPressed) {
        //for later
    }
}

//updates quadtree, moves objects based on physics calculations
//and draws all objects in game (paddle(s), ball(s), bricks
function draw() {
    if (!BrickBreak_play) {
        cancelAnimationFrame(frameID);
    } else {
        BB_ctx.clearRect(0, 0, BB_canvas.width, BB_canvas.height);

        updateQuad();

        physics();

        var _iteratorNormalCompletion5 = true;
        var _didIteratorError5 = false;
        var _iteratorError5 = undefined;

        try {
            for (var _iterator5 = gameBalls[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                var ball = _step5.value;

                ball.draw();
            }
        } catch (err) {
            _didIteratorError5 = true;
            _iteratorError5 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion5 && _iterator5.return) {
                    _iterator5.return();
                }
            } finally {
                if (_didIteratorError5) {
                    throw _iteratorError5;
                }
            }
        }

        paddle.draw();
        board.draw();

        document.getElementById("score").innerHTML = "Score: " + score;

        frameID = requestAnimationFrame(draw);
    }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if (e.keyCode == 39) {
        //right arrow key
        rightPressed = true;
    } else if (e.keyCode == 37) {
        //left arrow key
        leftPressed = true;
    } else if (e.keyCode == 32 && e.target == document.body) {
        //spacebar
        e.preventDefault();
    } else if (e.keyCode == 38) {
        //up arrow key
        //win();
        upPressed = true;
    } else if (e.keyCode == 40) {
        //down arrow key
        downPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.keyCode == 39) {
        //right arrow key
        rightPressed = false;
    } else if (e.keyCode == 37) {
        //left arrow key
        leftPressed = false;
    } else if (e.keyCode == 32) {
        //spacebar
        e.preventDefault();
        playNpause();
    } else if (e.keyCode == 38) {
        //up arrow key
        upPressed = false;
    } else if (e.keyCode == 40) {
        //down arrow key
        downPressed = false;
    }
}

//# sourceMappingURL=game-compiled.js.map