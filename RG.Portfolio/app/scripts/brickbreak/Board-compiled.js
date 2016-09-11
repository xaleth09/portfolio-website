"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Created by xaleth on 7/13/2016.
 */
//Board class which makes an array of bricks with properties set in config file for each level (to be implemented later)
//Properties in this order defined in config file:
//               rows: number of rows,
//               rowPadding: padding between each row,
//               brickPadding: padding between each bricks on the left and right side
//               rowXoffset: offset from the left side of screen,
//               rowYoffset: offset from the top of screen,
//               boardMatrix[]: the boardMatrix itself set to 0 if no brick should be made or
//                              set to a number which would make a brick which requires that number
//                              of hits to be destroyed,
var Board = function (_DrawableObj) {
    _inherits(Board, _DrawableObj);

    function Board(config) {
        _classCallCheck(this, Board);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Board).call(this));

        _this.rows;
        _this.rowPadding;
        _this.brickPadding;
        _this.rowXoffset;
        _this.rowYoffset;
        _this.boardMatrix;
        _this.bricks = [];

        _this.brickWidth = BRICK_WIDTH;
        _this.brickHeight = BRICK_HEIGHT;

        Object.assign(_this, config);
        return _this;
    }

    //makes board from given config
    //Adds brick to game board if value in boardMatrix is > 1,
    //this value is also used to determine amount of hits needed to remove the brick


    _createClass(Board, [{
        key: "makeBoard",
        value: function makeBoard() {
            var y;
            var x;
            for (var i = 0; i < this.rows; i++) {
                x = this.rowXoffset;
                y = i === 0 ? this.rowYoffset : y + this.rowPadding + this.brickHeight;
                for (var j = 0; j < this.boardMatrix[i].length; j++) {
                    if (this.boardMatrix[i][j] >= 1) {
                        this.bricks.push(new Brick({ x: x, y: y, numHits: this.boardMatrix[i][j], width: this.brickWidth, height: this.brickHeight }));
                    }
                    x = x + (this.brickWidth + this.brickPadding);
                }
            }
        }

        //Draws board to BB_canvas
        //and removes bricks if numHits reaches 0

    }, {
        key: "draw",
        value: function draw() {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {

                for (var _iterator = this.bricks[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var _b = _step.value;

                    if (_b.numHits == 0) {
                        this.bricks.splice(this.bricks.indexOf(_b), 1);
                    }
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

            if (this.bricks.length == 0) {
                win();
            } else {
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    for (var _iterator2 = this.bricks[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var b = _step2.value;

                        b.draw();
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
            }
        }
    }, {
        key: "updateBoard",
        value: function updateBoard(rows, rowPadding, brickSize, brickPadding, rowXoffset, rowYoffset, mat) {
            this.rows = rows;
            this.rowPadding = rowPadding;
            this.brickPadding = brickPadding;
            this.rowXoffset = rowXoffset;
            this.rowYoffset = rowYoffset;
            this.boardMatrix = mat;
            this.bricks = [];

            this.brickWidth = brickSize.width || BRICK_WIDTH; //default 65
            this.brickHeight = brickSize.height || BRICK_HEIGHT; //default 20

            this.makeBoard();
        }
    }, {
        key: "levelUp",
        value: function levelUp(level) {
            var mat = [];
            gameBalls[0] = new Ball();
            BrickBreak_play = false;

            //updateBoard(rows, rowPadding, brickSize, brickPadding, rowXoffset, rowYoffset, mat);
            switch (level) {
                case 1:
                    mat = [[1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1]];
                    board.updateBoard(4, 15, {}, 10, BB_canvas.width / 14, BB_canvas.height / 10, mat);

                    break;
                case 2:
                    mat = [[1, 0, 1, 0, 1, 0, 1, 0, 1], [0, 2, 0, 2, 0, 2, 0, 2, 0], [2, 0, 2, 0, 2, 0, 2, 0, 2], [0, 1, 0, 1, 0, 1, 0, 1, 0]];
                    board.updateBoard(4, 15, {}, 10, BB_canvas.width / 14, BB_canvas.height / 10, mat);
                    break;
                case 3:
                    mat = [[1, 2, 1, 0, 2, 1, 2, 0, 1, 2, 1], [2, 1, 2, 0, 1, 2, 1, 0, 2, 1, 2], [1, 2, 1, 0, 2, 1, 2, 0, 1, 2, 1], [2, 1, 2, 0, 1, 2, 1, 0, 2, 1, 2], [1, 2, 1, 0, 2, 1, 2, 0, 1, 2, 1]];
                    board.updateBoard(5, 10, {}, 5, BB_canvas.width / 90, BB_canvas.height / 10, mat);
                    break;
                case 4:
                    mat = [[0, 0, 0, 3, 0, 0, 0], [0, 0, 3, 2, 3, 0, 0], [0, 3, 2, 1, 2, 3, 0], [3, 2, 1, 1, 1, 2, 3], [0, 3, 2, 1, 2, 3, 0], [0, 0, 3, 2, 3, 0, 0], [0, 0, 0, 3, 0, 0, 0]];
                    board.updateBoard(7, 8, {}, 10, BB_canvas.width / 5.8, BB_canvas.height / 10, mat);
                    break;
                case 5:
                    mat = [[2, 1, 3, 2, 1, 3, 2, 1, 3, 2, 1, 3, 2], [0, 2, 1, 3, 2, 1, 3, 2, 1, 3, 2, 1, 3], [0, 0, 2, 1, 3, 2, 1, 3, 2, 1, 3, 2, 1], [0, 0, 0, 2, 1, 3, 2, 1, 3, 2, 1, 3, 2], [0, 0, 0, 0, 2, 1, 3, 2, 1, 3, 2, 1, 3], [0, 0, 0, 0, 0, 2, 1, 3, 2, 1, 3, 2, 1], [0, 0, 0, 0, 0, 0, 2, 1, 3, 2, 1, 3, 2]];
                    board.updateBoard(7, 5, { width: 45 }, 7, BB_canvas.width / 13.8, BB_canvas.height / 10, mat);
                    break;
                case 6:
                    mat = [[0, 0, 0, 0, 3, 2, 1, 2, 3, 0, 0, 0, 0], [0, 0, 0, 4, 3, 2, 0, 2, 3, 4, 0, 0, 0], [0, 0, 3, 4, 3, 0, 0, 0, 3, 4, 3, 0, 0], [0, 2, 3, 0, 0, 1, 0, 1, 0, 0, 3, 2, 0], [1, 2, 0, 0, 0, 0, 4, 0, 0, 0, 0, 2, 1], [0, 2, 3, 0, 0, 1, 0, 1, 0, 0, 3, 2, 0], [0, 0, 3, 4, 3, 0, 0, 0, 3, 4, 3, 0, 0], [0, 0, 0, 4, 3, 2, 0, 2, 3, 4, 0, 0, 0], [0, 0, 0, 0, 3, 2, 1, 2, 3, 0, 0, 0, 0]];
                    board.updateBoard(9, 5, { width: 45 }, 7, BB_canvas.width / 13.8, BB_canvas.height / 10, mat);
                    break;
                case 7:
                    mat = [[0, 0, 0, 0, 0, 0, 4, 4, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 4, 4, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 4, 4, 4, 4, 0, 0, 0, 0, 0], [0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0], [0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0], [0, 0, 0, 4, 4, 0, 0, 0, 0, 4, 4, 0, 0, 0], [0, 0, 4, 4, 4, 0, 0, 0, 0, 4, 4, 4, 0, 0], [0, 0, 4, 4, 4, 4, 0, 0, 4, 4, 4, 4, 0, 0], [0, 4, 4, 4, 4, 4, 0, 0, 4, 4, 4, 4, 4, 0], [0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0], [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4], [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4]];
                    board.updateBoard(11, 5, { width: 35, height: 20 }, 5, BB_canvas.width / 7, BB_canvas.height / 10, mat);
                    break;
                default:
            }
        }
    }]);

    return Board;
}(DrawableObj);

//# sourceMappingURL=Board-compiled.js.map