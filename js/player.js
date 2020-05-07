class Player {
  constructor(player) {
    this.name = player.name;
    this.pos = player.pos;
    this.power = player.power;
    this.size = player.size;
    this.speed = new Vector2D(0, 0);
    this.walkSpeed = player.walkSpeed ? player.walkSpeed : 5;
    this.attackspeed = 0;
    this.maxLife = player.life;
    this.life = player.life;
    this.fixattackspeed = player.attackspeed ? player.attackspeed : 10;
    this.fixammos = player.ammos ? player.ammos : 20;
    this.ammos = this.fixammos;
    this.stat = "normal"
  
    this.timer = null
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


    this.updateDisplay = (display,lastDirection) => {
      var settingImg = {
        down: { sx: 0, sy: 0, sw: 0, sh: 0 },
        up: { sx: 0, sy: 0, sw: 0, sh: 0 },
        left: { sx: 0, sy: 0, sw: 0, sh: 0 },
        right: { sx: 0, sy: 0, sw: 0, sh: 0 }
      }
      switch (this.name) {
        case "Jotaro":
          settingImg = {
            down: { sx: 7, sy: 8, sw: 30, sh: 40 },
            up: { sx: 250, sy: 8, sw: 30, sh: 40 },
            left: { sx: 130, sy: 8, sw: 30, sh: 40 },
            right: { sx: 372, sy: 8, sw: 30, sh: 40 }
          }
          break
        case "LSamurai":
          settingImg = {
            down: { sx: 205, sy: 4, sw: 95, sh: 165 },
            up: { sx: 314, sy: 15, sw: 120, sh: 165 },
            left: { sx: 1, sy: 10, sw: 100, sh: 170 },
            right: { sx: 103, sy: 9, sw: 100, sh: 170 }
          }
          break
        case "Sasuke":
          settingImg =  {
            down: { sx: 0, sy: 200, sw: 32, sh: 61 },
            up: { sx: 0, sy: 70, sw: 32, sh: 60 },
            left: { sx: 0, sy: 135, sw: 32, sh: 61 },
            right: { sx: 0, sy: 0, sw: 32, sh: 60 }
          }
          break
      }

      switch (lastDirection) {
        case "up":
          display.cx.drawImage(
            display[this.name + "Sprite"],
            settingImg.up.sx,
            settingImg.up.sy,
            settingImg.up.sw,
            settingImg.up.sh,
            this.pos.x * display.zoom,
            this.pos.y * display.zoom,
            this.size.x * display.zoom,
            this.size.y * display.zoom
          );

          break;
        case "down":
          display.cx.drawImage(
            display[this.name + "Sprite"],
            settingImg.down.sx,
            settingImg.down.sy,
            settingImg.down.sw,
            settingImg.down.sh,
            this.pos.x * display.zoom,
            this.pos.y * display.zoom,
            this.size.x * display.zoom,
            this.size.y * display.zoom
          );
          break;
        case "left":
          display.cx.drawImage(
            display[this.name + "Sprite"],
            settingImg.left.sx,
            settingImg.left.sy,
            settingImg.left.sw,
            settingImg.left.sh,
            this.pos.x * display.zoom,
            this.pos.y * display.zoom,
            this.size.x * display.zoom,
            this.size.y * display.zoom
          );
          break;
        case "right":
          display.cx.drawImage(
            display[this.name + "Sprite"],
            settingImg.right.sx,
            settingImg.right.sy,
            settingImg.right.sw,
            settingImg.right.sh,
            this.pos.x * display.zoom,
            this.pos.y * display.zoom,
            this.size.x * display.zoom,
            this.size.y * display.zoom
          );
          break;

        default:
          break;
      }
      display.cx.drawImage(
        display[this.name + "SpritePPGame"],
        1 * display.zoom,
        1 * display.zoom,
        25 * display.zoom,
        25* display.zoom
      );
    }

    this.update = game => {
      if (this.stat ==="touch") {
        if(this.timer == null){
          this.timer = 25
        }
      }
      this.moveX(game);
      this.moveY(game);
      this.updateGun(game);

      if (this.pos.y > 270) this.pos.y = 0;
    };
  }
}
