"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by xaleth on 6/12/2016.
 * implemented based on java code in
 * 'Quick Tip: Use Quadtrees to Detect Likely Collisions in 2D Space'
 *                        by Steven Lambert
 * @ http://gamedevelopment.tutsplus.com/tutorials/quick-tip-use-quadtrees-to-detect-likely-collisions-in-2d-space--gamedev-374
 *
 * transpiled into javascript by Roberto Garza
 */
var MAX_OBJECTS = 4;
var MAX_LEVELS = 10;

var QuadTree = function () {
    function QuadTree(lvl, screenBounds) {
        _classCallCheck(this, QuadTree);

        this.level = lvl; //current depth of quadTree
        this.objects = []; //objects within the region/subregion
        this.nodes = []; //4 child nodes, which are subregions of the parent
        this.bounds = { //rectangle that bounds the subregion of screen
            x: screenBounds.x,
            y: screenBounds.y,
            width: screenBounds.width,
            height: screenBounds.height
        };
    }

    _createClass(QuadTree, [{
        key: "split",
        value: function split() {
            var subWidth = this.bounds.width / 2 | 0;
            var subHeight = this.bounds.height / 2 | 0;

            var tmpX = this.bounds.x;
            var tmpY = this.bounds.y;

            this.nodes[0] = new QuadTree(this.level + 1, { x: tmpX + subWidth, y: tmpY, width: subWidth, height: subHeight });
            this.nodes[1] = new QuadTree(this.level + 1, { x: tmpX, y: tmpY, width: subWidth, height: subHeight });
            this.nodes[2] = new QuadTree(this.level + 1, { x: tmpX, y: tmpY + subHeight, width: subWidth, height: subHeight });
            this.nodes[3] = new QuadTree(this.level + 1, { x: tmpX + subWidth, y: tmpY + subHeight, width: subWidth, height: subHeight });
        }

        //insert the object into the quadtree. if the node
        //exceeds the capacity, it will split and add all objects to
        //their corresponding nodes

    }, {
        key: "insert",
        value: function insert(objBounds) {
            if (this.nodes[0] != null) {
                var index = this.getIndex(objBounds);

                if (index != -1) {
                    this.nodes[index].insert(objBounds);
                    return;
                }
            }

            this.objects.push(objBounds);

            if (this.objects.length > MAX_OBJECTS && this.level < MAX_LEVELS) {
                if (this.nodes[0] == null) {
                    this.split();
                }

                var i = 0;
                while (i < this.objects.length) {
                    var obj = this.objects[i];
                    var _index = this.getIndex(obj);
                    if (_index != -1) {
                        var removedObj = this.objects.splice(this.objects.indexOf(obj), 1);
                        this.nodes[_index].insert(removedObj[0]);
                    } else {
                        i++;
                    }
                }
            }
        }

        //return all objects that could collide with the given object

    }, {
        key: "retrieve",
        value: function retrieve(objBounds) {
            var index = this.getIndex(objBounds);
            var returnObjs = this.objects;

            if (this.nodes[0] != null) {

                if (index != -1) {
                    returnObjs = returnObjs.concat(this.nodes[index].retrieve(objBounds));
                } else {
                    var _iteratorNormalCompletion = true;
                    var _didIteratorError = false;
                    var _iteratorError = undefined;

                    try {
                        for (var _iterator = this.nodes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                            var node = _step.value;

                            returnObjs = returnObjs.concat(node.retrieve(objBounds));
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
                }
            }

            return returnObjs;
        }
    }, {
        key: "getIndex",
        value: function getIndex(objBounds) {
            var index = -1;
            var vertMid = this.bounds.x + this.bounds.width / 2;
            var horzMid = this.bounds.y + this.bounds.height / 2;

            //Obj fits in top Quadrants
            var topQuad = objBounds.y < horzMid && objBounds.y + objBounds.height < horzMid;
            //Obj fits in bot Quadrants
            var botQuad = objBounds.y > horzMid;

            //Obj fits in left Quadrants
            if (objBounds.x < vertMid && objBounds.x + objBounds.width < vertMid) {
                if (topQuad) {
                    index = 1;
                } else if (botQuad) {
                    index = 2;
                }
            }
            //Obj fits in right quads
            else if (objBounds.x > vertMid) {
                    if (topQuad) {
                        index = 0;
                    } else if (botQuad) {
                        index = 3;
                    }
                }
            return index;
        }
    }, {
        key: "clear",
        value: function clear() {
            this.objects = [];
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = this.nodes[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var node = _step2.value;

                    node.clear();
                    node = null;
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

            this.nodes = [];
        }
    }, {
        key: "print",
        value: function print() {
            var str = this.level + ": ";
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = this.objects[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var obj = _step3.value;

                    str += obj.name + " ";
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

            console.log(str);

            for (var i = 0; i < 4; i++) {
                if (this.nodes[i] != null) {
                    this.nodes[i].print();
                }
            }
        }

        //Debugging/Visual function to show which level of the
        //QuadTree a certain object belongs in

    }, {
        key: "paint",
        value: function paint() {
            var color;
            switch (this.level) {
                case 0:
                    color = "red";
                    break;
                case 1:
                    color = "green";
                    break;
                case 2:
                    color = "purple";
                    break;
                case 3:
                    color = "blue";
                    break;
                case 4:
                    color = "yellow";
                    break;
                case 5:
                    color = "orange";
                    break;
                default:

            }

            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;

            try {
                for (var _iterator4 = this.objects[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                    var obj = _step4.value;

                    obj.color = color;
                    obj.draw();
                }
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

            for (var i = 0; i < 4; i++) {
                if (this.nodes[i] != null) {
                    this.nodes[i].paint();
                }
            }
        }

        //Debugging/Visual function to show where the screen bounds are
        //for each level and it's nodes at each iteration

    }, {
        key: "draw",
        value: function draw(canvas, ctx) {
            var color;
            switch (this.level) {
                case 0:
                    color = "red";
                    break;
                case 1:
                    color = "green";
                    break;
                case 2:
                    color = "purple";
                    break;
                case 3:
                    color = "blue";
                    break;
                case 4:
                    color = "yellow";
                    break;
                case 5:
                    color = "orange";
                    break;
                default:

            }

            ctx.beginPath();
            ctx.rect(this.bounds.x, this.bounds.y, this.bounds.width, this.bounds.height);
            ctx.strokeStyle = color;
            ctx.lineWidth = "4";
            ctx.stroke();

            for (var i = 0; i < 4; i++) {
                if (this.nodes[i] != null) {
                    this.nodes[i].draw(canvas, ctx);
                }
            }
        }
    }]);

    return QuadTree;
}();

//# sourceMappingURL=quadTree-compiled.js.map