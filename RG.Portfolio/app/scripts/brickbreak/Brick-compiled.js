"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Created by xaleth on 7/13/2016.
 * Brick class to be used for paddle and making of the game board
 * Paddle: used for hitting ball object into bricks
 * Bricks: to be broken using ball object to win the game
 */
var BRICK_WIDTH = 65;
var BRICK_HEIGHT = 20;

var Brick = function (_DrawableObj) {
    _inherits(Brick, _DrawableObj);

    function Brick(config) {
        _classCallCheck(this, Brick);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Brick).call(this));

        _this.width = BRICK_WIDTH; //default
        _this.height = BRICK_HEIGHT; //default

        _this.x = 0;
        _this.y = 0;

        _this.numHits = 1;
        _this.shown = true;

        _this.name = "brick";

        _this.color = "pink";

        Object.assign(_this, config);
        return _this;
    }

    _createClass(Brick, [{
        key: "draw",
        value: function draw() {
            BB_ctx.beginPath();
            BB_ctx.rect(this.x, this.y, this.width, this.height);
            BB_ctx.fillStyle = this.chooseColor();
            BB_ctx.fill();
            BB_ctx.closePath();
        }
    }, {
        key: "chooseColor",
        value: function chooseColor() {
            switch (this.numHits) {
                case 1:
                    this.color = "#00f500";
                    break;
                case 2:
                    this.color = "#0000ff";
                    break;
                case 3:
                    this.color = "#6600cc";
                    break;
                case 4:
                    this.color = "#ffff00";
                    break;
                default:
                    //Paddle Color
                    this.color = "#0095DD";
            }

            return this.color;
        }
    }, {
        key: "reset",
        value: function reset() {
            if (this.name == "paddle") {
                this.x = canvas.width / 2 - this.width / 2;
            }
        }
    }, {
        key: "hit",
        value: function hit() {
            if (this.name == "brick") {
                score += BASE_POINT * this.numHits;
                this.numHits = this.numHits > 0 ? this.numHits - 1 : 0;
            }
        }
    }]);

    return Brick;
}(DrawableObj);

//# sourceMappingURL=Brick-compiled.js.map