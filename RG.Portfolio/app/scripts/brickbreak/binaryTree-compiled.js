"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by xaleth on 6/13/2016.
 */
/**
 * Created by xaleth on 6/12/2016.
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

var Node = function () {
    function Node(config) {
        _classCallCheck(this, Node);

        this.left = null;
        this.right = null;
        this.key = 0;
        this.value;

        Object.assign(this, config);
    }

    //Generator-Iteration InOrder
    /*
     for(let x of tree){
     console.log(x)
     }
     */


    _createClass(Node, [{
        key: Symbol.iterator,
        value: regeneratorRuntime.mark(function value() {
            return regeneratorRuntime.wrap(function value$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            if (!this.left) {
                                _context.next = 2;
                                break;
                            }

                            return _context.delegateYield(this.left, "t0", 2);

                        case 2:
                            _context.next = 4;
                            return this.key;

                        case 4:
                            if (!this.right) {
                                _context.next = 6;
                                break;
                            }

                            return _context.delegateYield(this.right, "t1", 6);

                        case 6:
                        case "end":
                            return _context.stop();
                    }
                }
            }, value, this);
        })
    }]);

    return Node;
}();

var Tree = function () {
    function Tree(config) {
        _classCallCheck(this, Tree);

        this.root = null;

        Object.assign(this, config);
    }

    _createClass(Tree, [{
        key: "insert",
        value: function insert(k) {
            var t = arguments.length <= 1 || arguments[1] === undefined ? this.root : arguments[1];

            if (t === null) {
                return new Node({ key: k });
            } else if (k < t.key) {
                t.left = this.insert(k, t.left);
                return t;
            } else if (k > t.key) {
                t.right = this.insert(k, t.right);
                return t;
            } else {
                return t;
            }
        }
    }, {
        key: "remove",
        value: function remove() {}
    }, {
        key: "printIndentedTree",
        value: function printIndentedTree() {
            var t = arguments.length <= 0 || arguments[0] === undefined ? this.root : arguments[0];

            console.log("");
            this.printIndentedTreeAux(t, "");
            console.log("");
        }
    }, {
        key: "printIndentedTreeAux",
        value: function printIndentedTreeAux(t, str) {
            if (t != null) {
                this.printIndentedTreeAux(t.right, str + "   ");
                console.log(str + "" + t.key);
                this.printIndentedTreeAux(t.left, str + "   ");
            }
        }
    }, {
        key: "inOrder",
        value: function inOrder() {
            var current = arguments.length <= 0 || arguments[0] === undefined ? this.root : arguments[0];

            if (current != null) {
                this.inOrder(current.left);
                console.log(current.key + ": " + current.value);
                this.inOrder(current.right);
            }
        }
    }]);

    return Tree;
}();

/*
/    myTree = new Tree();
/
/    myTree.root = myTree.insert(14, myTree.insert(20, myTree.insert(12, myTree.insert(2, myTree.insert(5, myTree.insert(3, myTree.insert(8,null)))))));
/
/    myTree.printIndentedTree();
/
/    for(let x of myTree.root){
/        console.log(x);
/    }
/
/    console.log("");
/    myTree.inOrder();
*/

//# sourceMappingURL=binaryTree-compiled.js.map