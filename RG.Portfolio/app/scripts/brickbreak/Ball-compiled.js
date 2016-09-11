"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Created by xaleth on 7/13/2016.
 */
var Ball = function (_DrawableObj) {
  _inherits(Ball, _DrawableObj);

  function Ball(config) {
    _classCallCheck(this, Ball);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Ball).call(this));

    _this.speed = 3.75;

    _this.x = BB_canvas.width / 2;
    _this.y = BB_canvas.height - 30;

    var negPos1 = Math.floor(Math.random() * 16 + 1); //randomizes whether ball will go left or right at start of game
    _this.dx = negPos1 % 2 == 1 ? _this.speed : -_this.speed;
    _this.dy = -_this.speed;

    _this.ballAccel = .05;

    _this.radius = 8;
    _this.height = _this.radius; //used in quadTree insertion
    _this.width = _this.radius; //used in quadTree insertion

    _this.color = "#0095DD";
    _this.name = "ball";

    Object.assign(_this, config);
    return _this;
  }

  _createClass(Ball, [{
    key: "draw",
    value: function draw() {
      BB_ctx.beginPath();
      BB_ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      BB_ctx.fillStyle = this.color;
      BB_ctx.fill();
      BB_ctx.closePath();
    }
  }, {
    key: "physics",
    value: function physics() {
      //Ball physics

      //ball hits side walls
      if (this.x + this.dx > BB_canvas.width - this.radius || this.x + this.dx < this.radius) {
        this.dx = -this.dx;
      }
      //ball hits top wall
      if (this.y + this.dy < this.radius) {
        this.dy = -this.dy;

        //ball hits bottom wall
      } else if (this.y + this.dy > BB_canvas.height - this.radius) {
        lose();
      }

      //Tests for collisions between "close" (as determined by quadtree) objects
      //and this ball. objects returned are the bricks in the game board or the paddle
      var collisionObjs = quadTree.retrieve(this);
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = collisionObjs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var obj = _step.value;

          if (obj.name == "paddle") {
            if (this.y + this.dy > obj.y - this.radius && this.x > obj.x && this.x < obj.x + obj.width) {
              this.dy += this.ballAccel;
              this.dx += this.ballAccel;
              this.dy = -this.dy;
            }
          } else if (obj.name == "brick") {
            if (this.x + this.dx > obj.x - this.radius && this.x + this.dx < obj.x + obj.width + this.radius && this.y + this.dy > obj.y - this.radius && this.y + this.dy < obj.y + obj.height + this.radius) {
              obj.hit();
              this.dy = -this.dy;
            }
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

      this.x += this.dx;
      this.y += this.dy;
    }
  }]);

  return Ball;
}(DrawableObj);

//# sourceMappingURL=Ball-compiled.js.map