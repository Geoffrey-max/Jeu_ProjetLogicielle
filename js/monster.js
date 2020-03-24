class Monster {
  constructor(pos, life, size) {
    this.life = life;
    this.pos = pos;
    this.size = size ? size : new Vector2D(16, 32);
    this.speed = new Vector2D(0, 0);
    this.walkSpeed = 1;
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
