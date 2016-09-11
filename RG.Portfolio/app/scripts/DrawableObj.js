/**
 * Created by xaleth on 7/12/2016.
 */

class DrawableObj{
    constructor(){
        if(this.constructor === DrawableObj) {
            throw new TypeError('Abstract class "drawableObj" cannot be instantiated directly.');
        }

        if(this.draw === DrawableObj.prototype.draw){
            throw new TypeError('Please implement abstract method draw()');
        }
    }

    draw(){
        throw new TypeError("Do not call abstract method draw from child.");
    }
}


//Sub-classes of DrawableObj
const RADIUS = 20;
class Leaf extends DrawableObj {
    constructor(x = BST_canvas.width/2, y = BST_canvas.height/10, config) {
        super();
        this.x = x;
        this.y = y;
        this.radius = RADIUS;
        this.depth;
        this.text;

        this.hover = false;

        Object.assign(this,config);

        this.color = this.chooseColor();
    }

    draw(){
        BST_ctx.beginPath();
        BST_ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
        BST_ctx.fillStyle = this.hover ? "grey": this.chooseColor();
        BST_ctx.fill();
        BST_ctx.closePath();
        BST_ctx.fillStyle = this.hover ? "white": "black"; // font color to write the text with
        var font = "bold " + this.radius +"px serif";
        BST_ctx.font = font;
        BST_ctx.textBaseline = "top";
        BST_ctx.fillText(this.text, this.x-this.radius/2, this.y-this.radius/2);
    }

    chooseColor(){
        let color;
        switch(this.depth){
            case 0: //root
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
}


class Line extends DrawableObj{
    constructor(fx = BST_canvas.width/2,fy = 0,tx = BST_canvas.width/2,ty = BST_canvas.height, color = "black"){
        super();
        this.fromX = fx;
        this.fromY = fy;
        this.toX = tx;
        this.toY = ty;
        this.color = color;
    }

    draw(){
        BST_ctx.beginPath();
        BST_ctx.moveTo(this.fromX,this.fromY);
        BST_ctx.lineTo(this.toX,this.toY);
        BST_ctx.strokeStyle = this.color;
        BST_ctx.lineWidth = 10;
        BST_ctx.stroke();
    }
}
