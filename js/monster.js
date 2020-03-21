class Monster {
  constructor(pos, life, size) {
    this.life = life;
    this.pos = pos;
    this.size = size ? size : new Vector2D(16, 32);
    this.speed = new Vector2D(0, 0);
    this.walkSpeed = 5;

    this.moveX = (game, command) => {
      this.speed.x = +this.walkSpeed;
      var Xmovement = new Vector2D(this.speed.x, 0);
      var newPos = this.pos.plus(Xmovement);
      this.pos = newPos;
    };

    this.moveY = game => {
      this.speed.y = +this.walkSpeed;
      var Ymovement = new Vector2D(0, this.speed.y);
      var newPos = this.pos.plus(Ymovement);

      this.pos = newPos;
    };

    this.update = game => {
      this.moveX(game);
      this.moveY(game);
    };
  }
}
