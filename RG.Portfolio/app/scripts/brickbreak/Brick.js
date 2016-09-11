/**
 * Created by xaleth on 7/13/2016.
 * Brick class to be used for paddle and making of the game board
 * Paddle: used for hitting ball object into bricks
 * Bricks: to be broken using ball object to win the game
 */
const BRICK_WIDTH = 65;
const BRICK_HEIGHT = 20;

class Brick extends DrawableObj{
    constructor(config){
        super();
        this.width  = BRICK_WIDTH;  //default
        this.height = BRICK_HEIGHT; //default

        this.x = 0;
        this.y = 0;

        this.numHits = 1;
        this.shown = true;

        this.name = "brick";

        this.color = "pink";

        Object.assign(this,config);
    }

    draw(){
        BB_ctx.beginPath();
        BB_ctx.rect(this.x, this.y, this.width, this.height);
        BB_ctx.fillStyle = this.chooseColor();
        BB_ctx.fill();
        BB_ctx.closePath();
    }

    chooseColor(){
        switch(this.numHits){
            case 1:
                this.color = "#00f500";
                break;
            case 2:
                this.color = "#0000ff";
                break;
            case 3:
                this.color = "#6600cc";
                break;
            case 4:
                this.color = "#ffff00";
                break;
            default: //Paddle Color
                this.color =  "#0095DD"
        }

        return this.color;
    }

    reset(){
        if(this.name == "paddle"){
            this.x = canvas.width/2 - this.width/2;
        }
    }

    hit(){
        if(this.name == "brick"){
            score += BASE_POINT*this.numHits;
            this.numHits = (this.numHits > 0) ? this.numHits-1: 0;
        }
    }
}
