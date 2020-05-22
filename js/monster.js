class Monster {
  constructor(game, life, size, speed, posPlayerX, posPlayerY) {
    this.life = life;
    this.pos = getPosition(game, size);
    this.size = size ? size : new Vector2D(16, 32);
    this.speed = new Vector2D(0, 0);
    this.walkSpeed = speed;
    this.posPlayerX = posPlayerX;
    this.posPlayerY = posPlayerY;
    let bloque = 0;
    this.posTest = new Vector2D(0, 0);
    this.speedTest = new Vector2D(0, 0);
    this.newPosTest = new Vector2D(0, 0);
    this.posPlayer = new Vector2D(posPlayerX, posPlayerY);
    this.lastPos = new Vector2D(0, 0);


    this.moveX = game => {
      bloque = 0;
      if (game.player.pos.x != null) {
        if (rectAt(this.pos, this.size, this.posPlayer, game.player.size)) {
          this.posPlayerX = game.player.pos.x;
          this.posPlayerY = game.player.pos.y;
          this.posPlayer.x = this.posPlayerX;
          this.posPlayer.y = this.posPlayerY;
        }
        if (this.posPlayerX < this.pos.x) {
          this.posTest = this.pos;
          this.speedTest.x = -this.walkSpeed;
          var XmovementTest = new Vector2D(this.speedTest.x, 0);
          this.newPosTest = this.posTest.plus(XmovementTest);
          game.obstacles.forEach(obstacle => {
            if (rectAt(obstacle.pos, obstacle.size, this.newPosTest, this.size)) {
              if (this.posPlayerY === this.pos.y) {
                this.posPlayerX = game.player.pos.x;
                this.posPlayerY = game.player.pos.y;
                this.posPlayer.x = this.posPlayerX;
                this.posPlayer.y = this.posPlayerY;
              }
              this.speed.x = 0;
              bloque = 1;
            }
          });
          if (bloque === 0) {
            this.speed.x = -this.walkSpeed;
          }
        }
        else if (this.posPlayerX > this.pos.x) {
          this.posTest = this.pos;
          this.speedTest.x = +this.walkSpeed;
          var XmovementTest = new Vector2D(this.speedTest.x, 0);
          this.newPosTest = this.posTest.plus(XmovementTest);
          game.obstacles.forEach(obstacle => {
            if (rectAt(obstacle.pos, obstacle.size, this.newPosTest, this.size)) {
              if (this.posPlayerY === this.pos.y) {
                this.posPlayerX = game.player.pos.x;
                this.posPlayerY = game.player.pos.y;
                this.posPlayer.x = this.posPlayerX;
                this.posPlayer.y = this.posPlayerY;
              }
              this.speed.x = 0;
              bloque = 1;
            }
          });
          if (bloque === 0) {
            this.speed.x = +this.walkSpeed;
          }
        }
        var Xmovement = new Vector2D(this.speed.x, 0);
        var newPos = this.pos.plus(Xmovement);
        this.pos = newPos;
      }
    };

    this.moveY = game => {
      bloque = 0;
      if (game.player.pos.y != null) {
        if (this.posPlayerY < this.pos.y) {
          this.posTest = this.pos;
          this.speedTest.y = -this.walkSpeed;
          var YmovementTest = new Vector2D(0, this.speedTest.y);
          this.newPosTest = this.posTest.plus(YmovementTest);
          game.obstacles.forEach(obstacle => {
            if (rectAt(obstacle.pos, obstacle.size, this.newPosTest, this.size)) {
              if (this.posPlayerX === this.pos.x) {
                this.posPlayerX = game.player.pos.x;
                this.posPlayerY = game.player.pos.y;
                this.posPlayer.x = this.posPlayerX;
                this.posPlayer.y = this.posPlayerY;
              }
              this.speed.y = 0;
              bloque = 1;
            }
          });
          if (bloque === 0) {
            this.speed.y = -this.walkSpeed;
          }
        }
        else if (this.posPlayerY > this.pos.y) {
          this.posTest = this.pos;
          this.speedTest.y = +this.walkSpeed;
          var YmovementTest = new Vector2D(0, this.speedTest.y);
          this.newPosTest = this.posTest.plus(YmovementTest);
          game.obstacles.forEach(obstacle => {
            if (rectAt(obstacle.pos, obstacle.size, this.newPosTest, this.size)) {
              if (this.posPlayerX === this.pos.x) {
                this.posPlayerX = game.player.pos.x;
                this.posPlayerY = game.player.pos.y;
                this.posPlayer.x = this.posPlayerX;
                this.posPlayer.y = this.posPlayerY;
              }
              this.speed.y = 0;
              bloque = 1;
            }
          });
          if (bloque === 0) {
            this.speed.y = +this.walkSpeed;
          }
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

let getPosition = function (game, size) {
  aleapos = new Vector2D(
    Math.floor(Math.random() * Math.floor(480 - size.x)),
    Math.floor(Math.random() * Math.floor(270 - size.y))
  )
  while (obstacleAt(aleapos, size, game.obstacles).length > 0) {
    if (aleapos.x < 480) {
      aleapos.x++
    } else {
      aleapos.x = 0
      aleapos.y++
    }
    aleapos.y = aleapos.y == 270 ? 0 : aleapos.y
  }
  return aleapos

}
