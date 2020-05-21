class Monster {
  constructor(game, life, size,speed) {
    this.life = life;
    this.pos = getPosition(game,size);
    this.size = size ? size : new Vector2D(16, 32);
    this.speed = new Vector2D(0, 0);
    this.walkSpeed = speed;
    this.posPlayerX = null;
    this.posPlayerY = null;


    this.moveX = game => {
      if (game.player.pos.x != null) {
        this.posPlayerX = game.player.pos.x;
        if (this.posPlayerX < this.pos.x) {
          this.speed.x = -this.walkSpeed;
        }
        else if (this.posPlayerX > this.pos.x) {
          this.speed.x = +this.walkSpeed;
        }
        var Xmovement = new Vector2D(this.speed.x, 0);
        var newPos = this.pos.plus(Xmovement);
        this.pos = newPos;
      }
    };

    this.moveY = game => {
      if (game.player.pos.y != null) {
        this.posPlayerY = game.player.pos.y;
        if (this.posPlayerY < this.pos.y) {
          this.speed.y = -this.walkSpeed;
        }
        else if (this.posPlayerY > this.pos.y) {
          this.speed.y = +this.walkSpeed;
        }
        var Ymovement = new Vector2D(0, this.speed.y);
        var newPos = this.pos.plus(Ymovement);
        this.pos = newPos;
      }
    };


    this.update = game => {
      this.moveX(game);
      this.moveY(game);
    };
  }
}

let getPosition = function (game,size){
  aleapos = new Vector2D(
    Math.floor(Math.random() * Math.floor(480 - size.x)),
    Math.floor(Math.random() * Math.floor(270 - size.y))
  )
  while (obstacleAt(aleapos,size,game.obstacles).length>0) {
    if (aleapos.x < 480) {
      aleapos.x++
    }else{
      aleapos.x = 0
      aleapos.y++
    }
    aleapos.y= aleapos.y == 270? 0:aleapos.y
  }
  return aleapos

}
