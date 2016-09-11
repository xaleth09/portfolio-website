/**
 * Created by xaleth on 6/30/2016.
 */

//animate search
var BST_canvas;
var BST_ctx;
var BST_play = false;
var id;


let tree;
function BSTsetUp(){
    BST_canvas = document.getElementById("BST_Canvas");
    BST_ctx = BST_canvas.getContext("2d");

    tree = null;
    tree = BST.randomBSTgen();

  document.addEventListener("mousemove", function(evt){
    var rect = BST_canvas.getBoundingClientRect();
    var mouse = {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };

    for(let n of tree.bfsArray){
      if(mouse.x > n.leaf.x-n.leaf.radius && mouse.x < n.leaf.x+n.leaf.radius && mouse.y < n.leaf.y + n.leaf.radius && mouse.y > n.leaf.y - n.leaf.radius){
        n.leaf.hover = true;
      }else{
        n.leaf.hover = false;
      }
    }


  });

  document.addEventListener("click", function(evt){
    for(let n of tree.bfsArray){
      if(n.leaf.hover){
        tree.remove(n.key);
      }
    }
  });


    bst_play();
}

function bst_play(){
    BST_play = true;
    animation_draw();
}

function animation_draw(){
    if(!BST_play){
        cancelAnimationFrame(id);
    }else{
        BST_ctx.clearRect(0,0, BST_canvas.width, BST_canvas.height);

        tree.draw();
        id = requestAnimationFrame(animation_draw);
    }
}



