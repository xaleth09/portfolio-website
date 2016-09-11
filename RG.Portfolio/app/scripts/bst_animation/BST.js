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

const MAX_HEIGHT = 5;
class BST{

    constructor(config){
        this.root = null;
        this.bfsArray = [];
        this.height = 0;
        Object.assign(this,config);
    }

  //Printing for Debugging Purposes
    printIndentedTree(current = this.root){
        console.log("");
        this.printIndentedTreeAux(current,"");
        console.log("");
    }

    printIndentedTreeAux(current, str){
        if(current != null){
            this.printIndentedTreeAux(current.right, str + "   ");
            console.log(str +""+current.key);
            this.printIndentedTreeAux(current.left, str + "   ");
        }
    }

    printInOrder(current = this.root){
        if(current != null){
            this.printInOrder(current.left);
            console.log(current.key);
            this.printInOrder(current.right);
        }
    }

    printPreOrder(current = this.root){
        if(current != null){
            console.log(current.key);
            this.printPreOrder(current.left);
            this.printPreOrder(current.right);
        }
    }

    printPostOrder(current = this.root){
        if(current != null){
            this.printPostOrder(current.left);
            this.printPostOrder(current.right);
            console.log(current.key)
        }
    }

  //Iterator-Generators
    *inOrderGen(n = this.root){
        if(n.left){
            yield* this.inOrderGen(n.left);
        }

        yield n;

        if(n.right){
            yield* this.inOrderGen(n.right);
        }
    }

    *preOrderGen(n = this.root){
        yield n;

        if(n.left){
            yield* this.preOrderGen(n.left);
        }

        if(n.right){
            yield* this.preOrderGen(n.right);
        }
    }

    *postOrderGen(n = this.root){
        if(n.left){
            yield* this.postOrderGen(n.left);
        }

        if(n.right){
            yield* this.postOrderGen(n.right);
        }

        yield n;
    }


  /*
    Utility Functions to update this BST:
    insert(), remove() + removeAux(), search(), findMin(), randomBSTgen()
  */

    insert(keyVal, node = this.root){
        if(this.height < MAX_HEIGHT){
            this.root = this.insertAux(keyVal, node);
            this.updateBSTAnimation();
        }
    }

    insertAux(keyVal, node = this.root){
        if(node === null){
            return new Node({key: keyVal['key'], value: keyVal['value'] | 0});
        }else if(keyVal['key'] < node.key){
            node.left = this.insertAux(keyVal, node.left);
            return node;
        }else if(keyVal['key'] > node.key){
            node.right = this.insertAux(keyVal, node.right);
            return node;
        }else{
            return node;
        }
    }


    remove(key){
        this.root = this.removeAux(key, this.root);
        this.updateBSTAnimation();
        if(this.root == null){
            tree = BST.randomBSTgen();
        }
    }

    removeAux(key, node){
        if(node == null){
            return null;
        }

        if(key < node.key){ //go left
            node.left = this.removeAux(key, node.left)
            return node;
        }else if(key > node.key){ //go right
            node.right = this.removeAux(key, node.right);
            return node;
        }else{ //key == node.key
            if(node.left == null && node.right == null){ //no children
                return null;
            }else if(node.left != null && node.right == null){ //only left child
                if(node == this.root){
                    node.left.numInRow = 0;
                    node.left.depth = 0;
                }
                return node.left;
            }else if(node.left == null && node.right != null){ //only right child
                if(node == this.root){
                    node.right.numInRow = 0;
                    node.right.depth = 0;
                }
                return node.right;
            }else{ //two children
                let tmp = this.findMin(node.right);
                node.key = tmp.key;
                node.value = tmp.value;
                node.right = this.removeAux(tmp.key, node.right);
                return node;
            }
        }
    }

    findMin(node = this.root){
        if(node.left == null){
            return node;
        }

        return this.findMin(node.left);
    }


    search(key, curN = this.root){
        if(curN == null){
            return null;
        }

        if(key == curN.key){
            return curN;
        }else if(key < curN.key ){
            return this.search(key, curN.left);
        }else if(key > curN.key){
            return this.search(key, curN.right);
        }

    }


    //Generates and returns a random BST tree
    static randomBSTgen(){
    var retBST = new BST();

    //let numNodes = Math.floor((Math.random() * MAX_NODES) + 3);
    let numNodes = 500;
    for(let i = 0; i < numNodes; i++ ){
        let rndKey = Math.floor((Math.random() * 40) + 1);
        let rndVal = Math.floor((Math.random() * 40) + 1);
        retBST.insert({key: rndKey,value: rndVal});
    }

    return retBST;
}



   /*
    Utility Functions for Drawing the BST
   */

    //Does a BFS of the BST to update the Depth, and rowPosition values of each node,
    //updates the BST property bfsArray[] which is an array of nodes
    //in depth order and returns it
    //The depth update and the returned array are use in updateBSTAnimation
    BFSUpdate(){
        let q = [];
        this.bfsArray = [];

        if(this.root == null){
            return;
        }

        q.push(this.root);

        while(q.length != 0){
            let node = q.shift();

            this.bfsArray.push(node);

            if(node.left != null){
                node.left.depth = node.depth+1;
                node.left.numInRow = node.numInRow*2;
                q.push(node.left);
            }
            if(node.right != null){
                node.right.depth = node.depth+1;
                node.right.numInRow = node.numInRow*2+1;
                q.push(node.right);
            }
        }

        this.height = this.bfsArray[this.bfsArray.length-1].depth;
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
    updateBSTAnimation(){
        let colors = ["black", "cyan", "green", "blue", "purple"];
        this.BFSUpdate();
        if(this.bfsArray.length == 0){
            return;
        }


        for(let n of this.bfsArray){
            n.lines["left"] = null;
            n.lines["right"] = null;
            n.leaf = null;


            let pow = Math.pow(2,n.depth+1);
            let powPlus = Math.pow(2,n.depth+2);

            let fy = BST_canvas.height/10 + ((BST_canvas.height/10)*(n.depth)); //Y position of leaves at N depth
            let ty = BST_canvas.height/10 + ((BST_canvas.height/10)*(n.depth+1));

            let fx = BST_canvas.width/pow + ((BST_canvas.width/pow)*(n.numInRow)*2) ;

            if(n.left != null){
                let txLeft = fx - BST_canvas.width/powPlus;
                n.lines["left"] = new Line(fx, fy, txLeft, ty, colors[n.depth]);
            }

            if(n.right != null){
                let txRight = fx + BST_canvas.width/powPlus;
                n.lines["right"] = new Line(fx, fy, txRight, ty, colors[n.depth]);
            }

            n.leaf = new Leaf(fx,fy,{depth: n.depth, text: n.key})
        }
    }


    draw(){
        for(let n of this.bfsArray){
            if(n.lines["left"] != null){
                n.lines["left"].draw();
            }
            if(n.lines["right"] != null){
                n.lines["right"].draw();
            }

            n.leaf.draw();
        }
    }
}

class Node{
    constructor(config){
        this.left = null;
        this.right = null;
        this.key = 0;
        this.value = 0;

        //used for drawing in updateBSTAnimation();
        this.depth = 0;
        this.numInRow = 0;

        this.lines =  {left: null, right: null};

        this.leaf = new Leaf();

        Object.assign(this,config);
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
    *inOrderGen(n){
        if(n.left){
            yield* this.inOrderGen(n.left);
        }

        yield n.key;

        if(n.right){
            yield* this.inOrderGen(n.right);
        }
    }

    *preOrderGen(n){
        yield n.key;

        if(n.left){
            yield* this.preOrderGen(n.left);
        }

        if(n.right){
            yield* this.preOrderGen(n.right);
        }
    }

    *postOrderGen(n){
        if(n.left){
            yield* this.postOrderGen(n.left);
        }

        if(n.right){
            yield* this.postOrderGen(n.right);
        }

        yield n.key;
    }

}





