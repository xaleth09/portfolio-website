/**
 * Created by xaleth on 7/13/2016.
 */
//Board class which makes an array of bricks with properties set in config file for each level (to be implemented later)
//Properties in this order defined in config file:
//               rows: number of rows,
//               rowPadding: padding between each row,
//               brickPadding: padding between each bricks on the left and right side
//               rowXoffset: offset from the left side of screen,
//               rowYoffset: offset from the top of screen,
//               boardMatrix[]: the boardMatrix itself set to 0 if no brick should be made or
//                              set to a number which would make a brick which requires that number
//                              of hits to be destroyed,
class Board extends DrawableObj{
    constructor(config){
        super();
        this.rows;
        this.rowPadding;
        this.brickPadding;
        this.rowXoffset;
        this.rowYoffset;
        this.boardMatrix;
        this.bricks = [];

        this.brickWidth = BRICK_WIDTH;
        this.brickHeight = BRICK_HEIGHT;

        Object.assign(this, config);
    }

    //makes board from given config
    //Adds brick to game board if value in boardMatrix is > 1,
    //this value is also used to determine amount of hits needed to remove the brick
    makeBoard(){
        var y;
        var x;
        for(var i = 0; i < this.rows; i++){
            x = this.rowXoffset;
            y = (i === 0) ? this.rowYoffset : y+this.rowPadding+this.brickHeight;
            for(var j = 0; j < this.boardMatrix[i].length; j++){
                if(this.boardMatrix[i][j] >= 1){
                    this.bricks.push( new Brick({ x:x, y:y, numHits:this.boardMatrix[i][j], width:this.brickWidth, height:this.brickHeight}) );

                }
                x = x + (this.brickWidth + this.brickPadding);
            }
        }
    }

    //Draws board to BB_canvas
    //and removes bricks if numHits reaches 0
    draw(){

        for(let b of this.bricks){
            if(b.numHits == 0){
                this.bricks.splice(this.bricks.indexOf(b),1);
            }
        }

        if(this.bricks.length == 0){
            win();
        }else{
            for(let b of this.bricks){
                b.draw();
            }
        }



    }

    updateBoard(rows, rowPadding, brickSize, brickPadding, rowXoffset, rowYoffset, mat){
        this.rows = rows;
        this.rowPadding = rowPadding;
        this.brickPadding = brickPadding;
        this.rowXoffset = rowXoffset;
        this.rowYoffset = rowYoffset;
        this.boardMatrix = mat;
        this.bricks = [];

        this.brickWidth  = brickSize.width  || BRICK_WIDTH;   //default 65
        this.brickHeight = brickSize.height || BRICK_HEIGHT;  //default 20

        this.makeBoard();
    }


    levelUp(level){
    let mat = [];
    gameBalls[0] = new Ball();
    BrickBreak_play = false;

    //updateBoard(rows, rowPadding, brickSize, brickPadding, rowXoffset, rowYoffset, mat);
    switch(level){
        case 1:
            mat = [[1,1,1,1,1,1,1,1,1],
                [1,1,1,1,1,1,1,1,1],
                [1,1,1,1,1,1,1,1,1],
                [1,1,1,1,1,1,1,1,1]];
            board.updateBoard(4,15,{},10,BB_canvas.width/14, BB_canvas.height/10, mat);

            break;
        case 2:
            mat =   [[1,0,1,0,1,0,1,0,1],
                [0,2,0,2,0,2,0,2,0],
                [2,0,2,0,2,0,2,0,2],
                [0,1,0,1,0,1,0,1,0]];
            board.updateBoard(4,15,{},10,BB_canvas.width/14, BB_canvas.height/10, mat);
            break;
        case 3:
            mat =   [[1,2,1,0,2,1,2,0,1,2,1],
                [2,1,2,0,1,2,1,0,2,1,2],
                [1,2,1,0,2,1,2,0,1,2,1],
                [2,1,2,0,1,2,1,0,2,1,2],
                [1,2,1,0,2,1,2,0,1,2,1]];
            board.updateBoard(5,10,{},5,BB_canvas.width/90, BB_canvas.height/10, mat);
            break;
        case 4:
            mat =   [[0,0,0,3,0,0,0],
                [0,0,3,2,3,0,0],
                [0,3,2,1,2,3,0],
                [3,2,1,1,1,2,3],
                [0,3,2,1,2,3,0],
                [0,0,3,2,3,0,0],
                [0,0,0,3,0,0,0]];
            board.updateBoard(7,8,{},10,BB_canvas.width/5.8, BB_canvas.height/10, mat);
            break;
        case 5:
            mat =  [[2,1,3,2,1,3,2,1,3,2,1,3,2],
                [0,2,1,3,2,1,3,2,1,3,2,1,3],
                [0,0,2,1,3,2,1,3,2,1,3,2,1],
                [0,0,0,2,1,3,2,1,3,2,1,3,2],
                [0,0,0,0,2,1,3,2,1,3,2,1,3],
                [0,0,0,0,0,2,1,3,2,1,3,2,1],
                [0,0,0,0,0,0,2,1,3,2,1,3,2]];
            board.updateBoard(7,5,{width:45},7,BB_canvas.width/13.8, BB_canvas.height/10, mat);
            break;
        case 6:
            mat =  [[0,0,0,0,3,2,1,2,3,0,0,0,0],
                [0,0,0,4,3,2,0,2,3,4,0,0,0],
                [0,0,3,4,3,0,0,0,3,4,3,0,0],
                [0,2,3,0,0,1,0,1,0,0,3,2,0],
                [1,2,0,0,0,0,4,0,0,0,0,2,1],
                [0,2,3,0,0,1,0,1,0,0,3,2,0],
                [0,0,3,4,3,0,0,0,3,4,3,0,0],
                [0,0,0,4,3,2,0,2,3,4,0,0,0],
                [0,0,0,0,3,2,1,2,3,0,0,0,0]];
            board.updateBoard(9,5,{width:45},7,BB_canvas.width/13.8, BB_canvas.height/10, mat);
            break;
        case 7:
            mat =  [[0,0,0,0,0,0,4,4,0,0,0,0,0,0],
                [0,0,0,0,0,0,4,4,0,0,0,0,0,0],
                [0,0,0,0,0,4,4,4,4,0,0,0,0,0],
                [0,0,0,0,4,4,4,4,4,4,0,0,0,0],
                [0,0,0,4,4,4,4,4,4,4,4,0,0,0],
                [0,0,0,4,4,0,0,0,0,4,4,0,0,0],
                [0,0,4,4,4,0,0,0,0,4,4,4,0,0],
                [0,0,4,4,4,4,0,0,4,4,4,4,0,0],
                [0,4,4,4,4,4,0,0,4,4,4,4,4,0],
                [0,4,4,4,4,4,4,4,4,4,4,4,4,0],
                [4,4,4,4,4,4,4,4,4,4,4,4,4,4],
                [4,4,4,4,4,4,4,4,4,4,4,4,4,4]];
            board.updateBoard(11,5,{width: 35,height:20},5,BB_canvas.width/7, BB_canvas.height/10, mat);
            break;
        default:
    }
}

}
