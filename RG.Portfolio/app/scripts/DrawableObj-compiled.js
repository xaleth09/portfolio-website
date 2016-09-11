'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by xaleth on 7/12/2016.
 */

var DrawableObj = function () {
    function DrawableObj() {
        _classCallCheck(this, DrawableObj);

        if (this.constructor === DrawableObj) {
            throw new TypeError('Abstract class "drawableObj" cannot be instantiated directly.');
        }

        if (this.draw === DrawableObj.prototype.draw) {
            throw new TypeError('Please implement abstract method draw()');
        }
    }

    _createClass(DrawableObj, [{
        key: 'draw',
        value: function draw() {
            throw new TypeError("Do not call abstract method draw from child.");
        }
    }]);

    return DrawableObj;
}();

//Sub-classes of DrawableObj


var RADIUS = 20;

var Leaf = function (_DrawableObj) {
    _inherits(Leaf, _DrawableObj);

    function Leaf() {
        var x = arguments.length <= 0 || arguments[0] === undefined ? BST_canvas.width / 2 : arguments[0];
        var y = arguments.length <= 1 || arguments[1] === undefined ? BST_canvas.height / 10 : arguments[1];
        var config = arguments[2];

        _classCallCheck(this, Leaf);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Leaf).call(this));

        _this.x = x;
        _this.y = y;
        _this.radius = RADIUS;
        _this.depth;
        _this.text;

        _this.hover = false;

        Object.assign(_this, config);

        _this.color = _this.chooseColor();
        return _this;
    }

    _createClass(Leaf, [{
        key: 'draw',
        value: function draw() {
            BST_ctx.beginPath();
            BST_ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            BST_ctx.fillStyle = this.hover ? "grey" : this.chooseColor();
            BST_ctx.fill();
            BST_ctx.closePath();
            BST_ctx.fillStyle = this.hover ? "white" : "black"; // font color to write the text with
            var font = "bold " + this.radius + "px serif";
            BST_ctx.font = font;
            BST_ctx.textBaseline = "top";
            BST_ctx.fillText(this.text, this.x - this.radius / 2, this.y - this.radius / 2);
        }
    }, {
        key: 'chooseColor',
        value: function chooseColor() {
            var color = void 0;
            switch (this.depth) {
                case 0:
                    //root
                    color = "brown";
                    break;
                case 1:
                    color = "green";
                    break;
                case 2:
                    color = "orange";
                    break;
                case 3:
                    color = "#ffd11a";
                    break;
                case 4:
                    color = "red";
                    break;
                case 5:
                    color = "#ff9933";
                    break;
                case 6:
                    color = "#996633";
                    break;
                default:
                    color = "pink";
            }

            return color;
        }
    }]);

    return Leaf;
}(DrawableObj);

var Line = function (_DrawableObj2) {
    _inherits(Line, _DrawableObj2);

    function Line() {
        var fx = arguments.length <= 0 || arguments[0] === undefined ? BST_canvas.width / 2 : arguments[0];
        var fy = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
        var tx = arguments.length <= 2 || arguments[2] === undefined ? BST_canvas.width / 2 : arguments[2];
        var ty = arguments.length <= 3 || arguments[3] === undefined ? BST_canvas.height : arguments[3];
        var color = arguments.length <= 4 || arguments[4] === undefined ? "black" : arguments[4];

        _classCallCheck(this, Line);

        var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(Line).call(this));

        _this2.fromX = fx;
        _this2.fromY = fy;
        _this2.toX = tx;
        _this2.toY = ty;
        _this2.color = color;
        return _this2;
    }

    _createClass(Line, [{
        key: 'draw',
        value: function draw() {
            BST_ctx.beginPath();
            BST_ctx.moveTo(this.fromX, this.fromY);
            BST_ctx.lineTo(this.toX, this.toY);
            BST_ctx.strokeStyle = this.color;
            BST_ctx.lineWidth = 10;
            BST_ctx.stroke();
        }
    }]);

    return Line;
}(DrawableObj);

//# sourceMappingURL=DrawableObj-compiled.js.map