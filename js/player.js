class Player {
  constructor(player) {
    this.name = player.name;
    this.pos = player.pos;
    this.power = player.power;
    this.size = player.size;
    this.speed = new Vector2D(0, 0);
    this.walkSpeed = player.walkSpeed ? player.walkSpeed : 5;
    this.attackspeed = 0;
    this.fixattackspeed = player.attackspeed ? player.attackspeed : 10;
    this.fixammos = player.ammos ? player.ammos : 20;
    this.ammos = this.ofixammos;

    this.moveX = game => {
      if (game.keys.get("left")) this.speed.x = -this.walkSpeed;
      else if (game.keys.get("right")) this.speed.x = +this.walkSpeed;
      else this.speed.x = 0;

      var Xmovement = new Vector2D(this.speed.x, 0);
      var newPos = this.pos.plus(Xmovement);

      var obstacles = obstacleAt(newPos, this.size, game.obstacles);

      if (obstacles.length > 0) {
        this.speed.x = 0;
      } else {
        this.pos = newPos;
      }
    };

    this.moveY = game => {
      if (game.keys.get("up")) this.speed.y = -this.walkSpeed;
      else if (game.keys.get("down")) this.speed.y = +this.walkSpeed;
      else this.speed.y = 0;

      var Ymovement = new Vector2D(0, this.speed.y);
      var newPos = this.pos.plus(Ymovement);

      var obstacles = obstacleAt(newPos, this.size, game.obstacles);

      if (obstacles.length > 0) {
        this.speed.y = 0;
      } else {
        this.pos = newPos;
      }
    };
    this.updateGun = game => {
      if (this.attackspeed > 0) {
        this.attackspeed--;
      }
      if (this.ammos == 0) {
        this.attackspeed = 60;
        this.ammos = this.fixammos;
      }
    };

    this.update = game => {
      this.moveX(game);
      this.moveY(game);
      this.updateGun(game);

      if (this.pos.y > 270) this.pos.y = 0;
    };
  }
}
