/**
 * Created by xaleth on 6/12/2016.
 * implemented based on java code in
 * 'Quick Tip: Use Quadtrees to Detect Likely Collisions in 2D Space'
 *                        by Steven Lambert
 * @ http://gamedevelopment.tutsplus.com/tutorials/quick-tip-use-quadtrees-to-detect-likely-collisions-in-2d-space--gamedev-374
 *
 * transpiled into javascript by Roberto Garza
 */
const MAX_OBJECTS = 4;
const MAX_LEVELS = 10;

class QuadTree{

    constructor(lvl, screenBounds){
        this.level = lvl;         //current depth of quadTree
        this.objects = [];        //objects within the region/subregion
        this.nodes = []; //4 child nodes, which are subregions of the parent
        this.bounds = {           //rectangle that bounds the subregion of screen
            x:      screenBounds.x,
            y:      screenBounds.y,
            width:  screenBounds.width,
            height: screenBounds.height
        };
    }

    split(){
        let subWidth =  (this.bounds.width  / 2) | 0;
        let subHeight = (this.bounds.height / 2) | 0;

        let tmpX = this.bounds.x;
        let tmpY = this.bounds.y;

        this.nodes[0] = new QuadTree(this.level+1, {x:tmpX+subWidth, y:tmpY,           width:subWidth, height:subHeight} )
        this.nodes[1] = new QuadTree(this.level+1, {x:tmpX,          y:tmpY,           width:subWidth, height:subHeight} )
        this.nodes[2] = new QuadTree(this.level+1, {x:tmpX,          y:tmpY+subHeight, width:subWidth, height:subHeight} )
        this.nodes[3] = new QuadTree(this.level+1, {x:tmpX+subWidth, y:tmpY+subHeight, width:subWidth, height:subHeight} )
    }


    //insert the object into the quadtree. if the node
    //exceeds the capacity, it will split and add all objects to
    //their corresponding nodes
    insert(objBounds){
        if(this.nodes[0] != null){
            let index = this.getIndex(objBounds);

            if(index != -1){
                this.nodes[index].insert(objBounds);
                return;
            }
        }

        this.objects.push(objBounds);

        if( this.objects.length > MAX_OBJECTS && this.level < MAX_LEVELS ){
            if( this.nodes[0] == null ){
                this.split();
            }

            let i = 0;
            while( i < this.objects.length){
                let obj = this.objects[i];
                let index = this.getIndex(obj);
                if(index != -1){
                    let removedObj = this.objects.splice(this.objects.indexOf(obj),1);
                    this.nodes[index].insert(removedObj[0]);
                }else{
                    i++;
                }
            }
        }
    }

    //return all objects that could collide with the given object
    retrieve(objBounds){
        let index = this.getIndex(objBounds);
        let returnObjs = this.objects;

        if(this.nodes[0] != null) {

            if (index != -1) {
                returnObjs = returnObjs.concat(this.nodes[index].retrieve(objBounds));
            } else {
                for (let node of this.nodes) {
                    returnObjs = returnObjs.concat(node.retrieve(objBounds));
                }
            }

        }

        return returnObjs;

    }

    getIndex(objBounds){
        let index = -1;
        let vertMid = this.bounds.x + (this.bounds.width/2);
        let horzMid = this.bounds.y + (this.bounds.height/2)

        //Obj fits in top Quadrants
        let topQuad = (objBounds.y < horzMid && objBounds.y + objBounds.height < horzMid);
        //Obj fits in bot Quadrants
        let botQuad = (objBounds.y > horzMid);



        //Obj fits in left Quadrants
        if( objBounds.x < vertMid && objBounds.x + objBounds.width < vertMid ){
            if(topQuad){
                index = 1;
            }else if(botQuad){
                index = 2;
            }
        }
        //Obj fits in right quads
        else if( objBounds.x > vertMid ){
            if(topQuad){
                index = 0;
            }else if(botQuad){
                index = 3;
            }
        }
        return index;
    }

    clear(){
        this.objects = [];
        for(let node of this.nodes){
            node.clear();
            node = null;
        }

        this.nodes = [];
    }

    print(){
        let str = this.level+": ";
        for(let obj of this.objects){
            str += obj.name+ " ";
        }

        console.log(str);

        for(let i = 0; i < 4; i++){
            if(this.nodes[i] != null){
                this.nodes[i].print();
            }
        }

    }

    //Debugging/Visual function to show which level of the
    //QuadTree a certain object belongs in
    paint(){
        var color;
        switch(this.level) {
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

        for(let obj of this.objects){
            obj.color = color;
            obj.draw();
        }

        for(let i = 0; i < 4; i++){
            if(this.nodes[i] != null){
                this.nodes[i].paint();
            }
        }

    }

    //Debugging/Visual function to show where the screen bounds are
    //for each level and it's nodes at each iteration
    draw(canvas, ctx){
        var color;
        switch(this.level) {
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

        for(let i = 0; i < 4; i++){
            if(this.nodes[i] != null){
                this.nodes[i].draw(canvas,ctx);
            }
        }

    }

}
