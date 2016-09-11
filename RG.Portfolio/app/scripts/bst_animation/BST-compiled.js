"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by xaleth on 6/12/2016.
 * with help from http://www.2ality.com/2015/03/es6-generators.html
 * "ES6 generators in Depth" by Dr. Axel Rauschmayer
 *
 *  // Recursively traverse the tree, printing out the keys, one per line; by changing order
 //    of statements, can get all 6 traversals:
 //
 //    Preorder          V L R
 //    Inorder           L V R
 //    Postorder         L R V
 //    Reverse Preorder  V R L
 //    ReverseInorder    R V L
 //    ReversePostorder  R L V
 *
 */

var MAX_HEIGHT = 5;

var BST = function () {
    function BST(config) {
        _classCallCheck(this, BST);

        this.root = null;
        this.bfsArray = [];
        this.height = 0;
        Object.assign(this, config);
    }

    //Printing for Debugging Purposes


    _createClass(BST, [{
        key: "printIndentedTree",
        value: function printIndentedTree() {
            var current = arguments.length <= 0 || arguments[0] === undefined ? this.root : arguments[0];

            console.log("");
            this.printIndentedTreeAux(current, "");
            console.log("");
        }
    }, {
        key: "printIndentedTreeAux",
        value: function printIndentedTreeAux(current, str) {
            if (current != null) {
                this.printIndentedTreeAux(current.right, str + "   ");
                console.log(str + "" + current.key);
                this.printIndentedTreeAux(current.left, str + "   ");
            }
        }
    }, {
        key: "printInOrder",
        value: function printInOrder() {
            var current = arguments.length <= 0 || arguments[0] === undefined ? this.root : arguments[0];

            if (current != null) {
                this.printInOrder(current.left);
                console.log(current.key);
                this.printInOrder(current.right);
            }
        }
    }, {
        key: "printPreOrder",
        value: function printPreOrder() {
            var current = arguments.length <= 0 || arguments[0] === undefined ? this.root : arguments[0];

            if (current != null) {
                console.log(current.key);
                this.printPreOrder(current.left);
                this.printPreOrder(current.right);
            }
        }
    }, {
        key: "printPostOrder",
        value: function printPostOrder() {
            var current = arguments.length <= 0 || arguments[0] === undefined ? this.root : arguments[0];

            if (current != null) {
                this.printPostOrder(current.left);
                this.printPostOrder(current.right);
                console.log(current.key);
            }
        }

        //Iterator-Generators

    }, {
        key: "inOrderGen",
        value: regeneratorRuntime.mark(function inOrderGen() {
            var n = arguments.length <= 0 || arguments[0] === undefined ? this.root : arguments[0];
            return regeneratorRuntime.wrap(function inOrderGen$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            if (!n.left) {
                                _context.next = 2;
                                break;
                            }

                            return _context.delegateYield(this.inOrderGen(n.left), "t0", 2);

                        case 2:
                            _context.next = 4;
                            return n;

                        case 4:
                            if (!n.right) {
                                _context.next = 6;
                                break;
                            }

                            return _context.delegateYield(this.inOrderGen(n.right), "t1", 6);

                        case 6:
                        case "end":
                            return _context.stop();
                    }
                }
            }, inOrderGen, this);
        })
    }, {
        key: "preOrderGen",
        value: regeneratorRuntime.mark(function preOrderGen() {
            var n = arguments.length <= 0 || arguments[0] === undefined ? this.root : arguments[0];
            return regeneratorRuntime.wrap(function preOrderGen$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            _context2.next = 2;
                            return n;

                        case 2:
                            if (!n.left) {
                                _context2.next = 4;
                                break;
                            }

                            return _context2.delegateYield(this.preOrderGen(n.left), "t0", 4);

                        case 4:
                            if (!n.right) {
                                _context2.next = 6;
                                break;
                            }

                            return _context2.delegateYield(this.preOrderGen(n.right), "t1", 6);

                        case 6:
                        case "end":
                            return _context2.stop();
                    }
                }
            }, preOrderGen, this);
        })
    }, {
        key: "postOrderGen",
        value: regeneratorRuntime.mark(function postOrderGen() {
            var n = arguments.length <= 0 || arguments[0] === undefined ? this.root : arguments[0];
            return regeneratorRuntime.wrap(function postOrderGen$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            if (!n.left) {
                                _context3.next = 2;
                                break;
                            }

                            return _context3.delegateYield(this.postOrderGen(n.left), "t0", 2);

                        case 2:
                            if (!n.right) {
                                _context3.next = 4;
                                break;
                            }

                            return _context3.delegateYield(this.postOrderGen(n.right), "t1", 4);

                        case 4:
                            _context3.next = 6;
                            return n;

                        case 6:
                        case "end":
                            return _context3.stop();
                    }
                }
            }, postOrderGen, this);
        })

        /*
          Utility Functions to update this BST:
          insert(), remove() + removeAux(), search(), findMin(), randomBSTgen()
        */

    }, {
        key: "insert",
        value: function insert(keyVal) {
            var node = arguments.length <= 1 || arguments[1] === undefined ? this.root : arguments[1];

            if (this.height < MAX_HEIGHT) {
                this.root = this.insertAux(keyVal, node);
                this.updateBSTAnimation();
            }
        }
    }, {
        key: "insertAux",
        value: function insertAux(keyVal) {
            var node = arguments.length <= 1 || arguments[1] === undefined ? this.root : arguments[1];

            if (node === null) {
                return new Node({ key: keyVal['key'], value: keyVal['value'] | 0 });
            } else if (keyVal['key'] < node.key) {
                node.left = this.insertAux(keyVal, node.left);
                return node;
            } else if (keyVal['key'] > node.key) {
                node.right = this.insertAux(keyVal, node.right);
                return node;
            } else {
                return node;
            }
        }
    }, {
        key: "remove",
        value: function remove(key) {
            this.root = this.removeAux(key, this.root);
            this.updateBSTAnimation();
            if (this.root == null) {
                tree = BST.randomBSTgen();
            }
        }
    }, {
        key: "removeAux",
        value: function removeAux(key, node) {
            if (node == null) {
                return null;
            }

            if (key < node.key) {
                //go left
                node.left = this.removeAux(key, node.left);
                return node;
            } else if (key > node.key) {
                //go right
                node.right = this.removeAux(key, node.right);
                return node;
            } else {
                //key == node.key
                if (node.left == null && node.right == null) {
                    //no children
                    return null;
                } else if (node.left != null && node.right == null) {
                    //only left child
                    if (node == this.root) {
                        node.left.numInRow = 0;
                        node.left.depth = 0;
                    }
                    return node.left;
                } else if (node.left == null && node.right != null) {
                    //only right child
                    if (node == this.root) {
                        node.right.numInRow = 0;
                        node.right.depth = 0;
                    }
                    return node.right;
                } else {
                    //two children
                    var tmp = this.findMin(node.right);
                    node.key = tmp.key;
                    node.value = tmp.value;
                    node.right = this.removeAux(tmp.key, node.right);
                    return node;
                }
            }
        }
    }, {
        key: "findMin",
        value: function findMin() {
            var node = arguments.length <= 0 || arguments[0] === undefined ? this.root : arguments[0];

            if (node.left == null) {
                return node;
            }

            return this.findMin(node.left);
        }
    }, {
        key: "search",
        value: function search(key) {
            var curN = arguments.length <= 1 || arguments[1] === undefined ? this.root : arguments[1];

            if (curN == null) {
                return null;
            }

            if (key == curN.key) {
                return curN;
            } else if (key < curN.key) {
                return this.search(key, curN.left);
            } else if (key > curN.key) {
                return this.search(key, curN.right);
            }
        }

        //Generates and returns a random BST tree

    }, {
        key: "BFSUpdate",


        /*
         Utility Functions for Drawing the BST
        */

        //Does a BFS of the BST to update the Depth, and rowPosition values of each node,
        //updates the BST property bfsArray[] which is an array of nodes
        //in depth order and returns it
        //The depth update and the returned array are use in updateBSTAnimation
        value: function BFSUpdate() {
            var q = [];
            this.bfsArray = [];

            if (this.root == null) {
                return;
            }

            q.push(this.root);

            while (q.length != 0) {
                var node = q.shift();

                this.bfsArray.push(node);

                if (node.left != null) {
                    node.left.depth = node.depth + 1;
                    node.left.numInRow = node.numInRow * 2;
                    q.push(node.left);
                }
                if (node.right != null) {
                    node.right.depth = node.depth + 1;
                    node.right.numInRow = node.numInRow * 2 + 1;
                    q.push(node.right);
                }
            }

            this.height = this.bfsArray[this.bfsArray.length - 1].depth;
            return this.bfsArray;
        }

        //Func. that adds leaves and connecting edges (lines), that can be drawn
        //to the BST_canvas, to each node within the BST.
        //This does this by using this.bfsArray[] (an array of bst nodes in depth order)
        //and the nodes position in its corresponding row (node.numInRow),
        //              ex.  0
        //                 0    1
        //                0 1  2 3,
        //
        //to place each leaf and line proportionally throughout the BST_canvas

    }, {
        key: "updateBSTAnimation",
        value: function updateBSTAnimation() {
            var colors = ["black", "cyan", "green", "blue", "purple"];
            this.BFSUpdate();
            if (this.bfsArray.length == 0) {
                return;
            }

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this.bfsArray[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var n = _step.value;

                    n.lines["left"] = null;
                    n.lines["right"] = null;
                    n.leaf = null;

                    var pow = Math.pow(2, n.depth + 1);
                    var powPlus = Math.pow(2, n.depth + 2);

                    var fy = BST_canvas.height / 10 + BST_canvas.height / 10 * n.depth; //Y position of leaves at N depth
                    var ty = BST_canvas.height / 10 + BST_canvas.height / 10 * (n.depth + 1);

                    var fx = BST_canvas.width / pow + BST_canvas.width / pow * n.numInRow * 2;

                    if (n.left != null) {
                        var txLeft = fx - BST_canvas.width / powPlus;
                        n.lines["left"] = new Line(fx, fy, txLeft, ty, colors[n.depth]);
                    }

                    if (n.right != null) {
                        var txRight = fx + BST_canvas.width / powPlus;
                        n.lines["right"] = new Line(fx, fy, txRight, ty, colors[n.depth]);
                    }

                    n.leaf = new Leaf(fx, fy, { depth: n.depth, text: n.key });
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
    }, {
        key: "draw",
        value: function draw() {
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = this.bfsArray[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var n = _step2.value;

                    if (n.lines["left"] != null) {
                        n.lines["left"].draw();
                    }
                    if (n.lines["right"] != null) {
                        n.lines["right"].draw();
                    }

                    n.leaf.draw();
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
    }], [{
        key: "randomBSTgen",
        value: function randomBSTgen() {
            var retBST = new BST();

            //let numNodes = Math.floor((Math.random() * MAX_NODES) + 3);
            var numNodes = 500;
            for (var i = 0; i < numNodes; i++) {
                var rndKey = Math.floor(Math.random() * 40 + 1);
                var rndVal = Math.floor(Math.random() * 40 + 1);
                retBST.insert({ key: rndKey, value: rndVal });
            }

            return retBST;
        }
    }]);

    return BST;
}();

var Node = function () {
    function Node(config) {
        _classCallCheck(this, Node);

        this.left = null;
        this.right = null;
        this.key = 0;
        this.value = 0;

        //used for drawing in updateBSTAnimation();
        this.depth = 0;
        this.numInRow = 0;

        this.lines = { left: null, right: null };

        this.leaf = new Leaf();

        Object.assign(this, config);
    }

    /*Generator-Iteration InOrder
     for(let x of tree.root){
     console.log(x)
     }
      //this makes the object itself iterable
     //in this case an In-Order Traversal
     *[Symbol.iterator](){
     if(this.left){
     yield* this.left;
     }
     yield this.key;
     if(this.right){
     yield* this.right;
     }
     }
     */
    /*
     Iterating through a Generator InOrder
     for(let x of Node.prototype.inOrderGen(tree.root)){
     console.log(x);
     }
     */
    //this retuns an iterator


    _createClass(Node, [{
        key: "inOrderGen",
        value: regeneratorRuntime.mark(function inOrderGen(n) {
            return regeneratorRuntime.wrap(function inOrderGen$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            if (!n.left) {
                                _context4.next = 2;
                                break;
                            }

                            return _context4.delegateYield(this.inOrderGen(n.left), "t0", 2);

                        case 2:
                            _context4.next = 4;
                            return n.key;

                        case 4:
                            if (!n.right) {
                                _context4.next = 6;
                                break;
                            }

                            return _context4.delegateYield(this.inOrderGen(n.right), "t1", 6);

                        case 6:
                        case "end":
                            return _context4.stop();
                    }
                }
            }, inOrderGen, this);
        })
    }, {
        key: "preOrderGen",
        value: regeneratorRuntime.mark(function preOrderGen(n) {
            return regeneratorRuntime.wrap(function preOrderGen$(_context5) {
                while (1) {
                    switch (_context5.prev = _context5.next) {
                        case 0:
                            _context5.next = 2;
                            return n.key;

                        case 2:
                            if (!n.left) {
                                _context5.next = 4;
                                break;
                            }

                            return _context5.delegateYield(this.preOrderGen(n.left), "t0", 4);

                        case 4:
                            if (!n.right) {
                                _context5.next = 6;
                                break;
                            }

                            return _context5.delegateYield(this.preOrderGen(n.right), "t1", 6);

                        case 6:
                        case "end":
                            return _context5.stop();
                    }
                }
            }, preOrderGen, this);
        })
    }, {
        key: "postOrderGen",
        value: regeneratorRuntime.mark(function postOrderGen(n) {
            return regeneratorRuntime.wrap(function postOrderGen$(_context6) {
                while (1) {
                    switch (_context6.prev = _context6.next) {
                        case 0:
                            if (!n.left) {
                                _context6.next = 2;
                                break;
                            }

                            return _context6.delegateYield(this.postOrderGen(n.left), "t0", 2);

                        case 2:
                            if (!n.right) {
                                _context6.next = 4;
                                break;
                            }

                            return _context6.delegateYield(this.postOrderGen(n.right), "t1", 4);

                        case 4:
                            _context6.next = 6;
                            return n.key;

                        case 6:
                        case "end":
                            return _context6.stop();
                    }
                }
            }, postOrderGen, this);
        })
    }]);

    return Node;
}();

//# sourceMappingURL=BST-compiled.js.map