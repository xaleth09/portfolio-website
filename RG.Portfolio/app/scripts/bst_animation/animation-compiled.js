"use strict";

/**
 * Created by xaleth on 6/30/2016.
 */

//animate search
var BST_canvas;
var BST_ctx;
var BST_play = false;
var id;

var tree = void 0;
function BSTsetUp() {
  BST_canvas = document.getElementById("BST_Canvas");
  BST_ctx = BST_canvas.getContext("2d");

  tree = null;
  tree = BST.randomBSTgen();

  document.addEventListener("mousemove", function (evt) {
    var rect = BST_canvas.getBoundingClientRect();
    var mouse = {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = tree.bfsArray[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var n = _step.value;

        if (mouse.x > n.leaf.x - n.leaf.radius && mouse.x < n.leaf.x + n.leaf.radius && mouse.y < n.leaf.y + n.leaf.radius && mouse.y > n.leaf.y - n.leaf.radius) {
          n.leaf.hover = true;
        } else {
          n.leaf.hover = false;
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
  });

  document.addEventListener("click", function (evt) {
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = tree.bfsArray[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var n = _step2.value;

        if (n.leaf.hover) {
          tree.remove(n.key);
        }
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
  });

  bst_play();
}

function bst_play() {
  BST_play = true;
  animation_draw();
}

function animation_draw() {
  if (!BST_play) {
    cancelAnimationFrame(id);
  } else {
    BST_ctx.clearRect(0, 0, BST_canvas.width, BST_canvas.height);

    tree.draw();
    id = requestAnimationFrame(animation_draw);
  }
}

//# sourceMappingURL=animation-compiled.js.map