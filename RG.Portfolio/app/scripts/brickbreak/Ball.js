/**
 * Created by xaleth on 7/13/2016.
 */
class Ball extends DrawableObj{
  constructor(config){
    super();
    this.speed = 3.75;

    this.x = BB_canvas.width/2;
    this.y = BB_canvas.height-30;

    let negPos1 = Math.floor((Math.random() * 16) + 1); //randomizes whether ball will go left or right at start of game
    this.dx = (negPos1%2 == 1)? this.speed:-this.speed;
    this.dy = -this.speed;

    this.ballAccel = .05

    this.radius = 8;
    this.height = this.radius; //used in quadTree insertion
    this.width = this.radius;  //used in quadTree insertion

    this.color = "#0095DD";
    this.name = "ball";

    Object.assign(this,config);
  }

  draw(){
    BB_ctx.beginPath();
    BB_ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
    BB_ctx.fillStyle = this.color;
    BB_ctx.fill();
    BB_ctx.closePath();
  }

  physics(){
    //Ball physics

    //ball hits side walls
    if(this.x + this.dx > BB_canvas.width-this.radius || this.x + this.dx < this.radius) {
      this.dx = -this.dx;
    }
    //ball hits top wall
    if(this.y + this.dy < this.radius) {
      this.dy = -this.dy;

      //ball hits bottom wall
    }else if(this.y + this.dy > BB_canvas.height-this.radius){
      lose();
    }

    //Tests for collisions between "close" (as determined by quadtree) objects
    //and this ball. objects returned are the bricks in the game board or the paddle
    let collisionObjs = quadTree.retrieve(this);
    for(let obj of collisionObjs){
      if(obj.name == "paddle"){
        if(this.y + this.dy > obj.y - this.radius && this.x > obj.x && this.x < obj.x + obj.width){
          this.dy += this.ballAccel;
          this.dx += this.ballAccel;
          this.dy = -this.dy;
        }

      }else if(obj.name == "brick"){
        if(this.x + this.dx > obj.x - this.radius && this.x + this.dx < obj.x + obj.width + this.radius && this.y + this.dy > obj.y - this.radius && this.y + this.dy < obj.y + obj.height + this.radius ){
          obj.hit();
          this.dy = -this.dy;
        }
      }
    }

    this.x += this.dx;
    this.y += this.dy;
  }

}
