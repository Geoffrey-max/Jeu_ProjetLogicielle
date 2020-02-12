class Fight {
  constructor(game) {
    this.game = game;
    // donne la derniere direction du personnage
    this.lastDirection = "up";
    this.bulletSettings = [];
    this.bulletSize=16

    this.update = game => {
      this.game = game;
      this.game.keys.forEach((key, id) => {
        this.game.lastKeys.forEach((lastkey, lastid) => {
          if (id === lastid) {
            if (id === "a" && lastid === "a" && key) {
              this.throwBullet();
              
            }
            if (id === "up" && lastid === "up" && key) {
              this.lastDirection = "up";
            }
            if (id === "down" && lastid === "down" && key) {
              this.lastDirection = "down";
            }
            if (id === "left" && lastid === "left" && key) {
              this.lastDirection = "left";
            }
            if (id === "right" && lastid === "right" && key) {
              this.lastDirection = "right";
            }
          }
        });
      });
      console.log("rankk");
    };
    this.updateDisplay = display => {;
      this.display = display;
      var player = display.game.player;

      display.cx.drawImage(
        display.playerSprite,
        0,
        0,
        432,
        400,
        player.pos.x * display.zoom,
        player.pos.y * display.zoom,
        player.size.x * display.zoom,
        player.size.y * display.zoom
      );

      display.game.obstacles.forEach(obstacle => {
        display.cx.drawImage(
          display.obstacleSprite,
          0,
          0,
          432,
          400,
          obstacle.obstacle.pos.x * display.zoom,
          obstacle.obstacle.pos.y * display.zoom,
          obstacle.obstacle.size.x * display.zoom,
          obstacle.obstacle.size.y * display.zoom
        );
      });

      display.cx.fillStyle = "blue";
      display.cx.font = " " + 12 * display.zoom + " consolas";
      display.cx.fillText(
        "X : " +
          display.game.player.pos.x +
          " Y: " +
          display.game.player.pos.y +
          "",
        10 * display.zoom,
        10 * display.zoom
      );

      var spliceArray=[];
      this.bulletSettings.forEach((bullet, index) => {
        display.cx.drawImage(display.playerSprite, bullet.x, bullet.y, this.bulletSize, this.bulletSize);
        if (
          bullet.x > display.canvas.width ||
          bullet.x < 0 ||
          bullet.y > display.canvas.height ||
          bullet.y < 0
        ) {
          this.bulletSettings.splice(index, 1);
        } else {
          switch (bullet.direction) {
            case "up":
              bullet.y -= this.bulletSize;
              break;

            case "down":
              bullet.y += this.bulletSize;
              break;

            case "right":
              bullet.x += this.bulletSize;
              break;

            case "left":
              bullet.x -= this.bulletSize;
              break;

            default:
              break;
          }
        }
      });
    };
    this.throwBullet = () => {
      this.bulletSettings.push({
        x: this.game.player.pos.x* this.display.zoom + (this.game.player.size.x/2-this.bulletSize/2),
        y: this.game.player.pos.y* this.display.zoom+(this.game.player.size.x/2-this.bulletSize/2),
        direction: this.lastDirection
      });
    };
  }
}
