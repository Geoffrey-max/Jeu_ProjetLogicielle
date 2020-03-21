class Fight {
  constructor(game) {
    this.game = game;
    // donne la derniere direction du personnage
    this.lastDirection = "up";
    this.bulletSettings = [];
    this.bulletSize = 8;
    this.game.monsters = [new Monster(new Vector2D(150, 100),5)];

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
    };
    this.updateDisplay = display => {
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

      this.bulletSettings.forEach((bullet, index) => {
        display.cx.drawImage(
          display.playerSprite,
          bullet.x,
          bullet.y,
          this.bulletSize * display.zoom,
          this.bulletSize * display.zoom
        );

          var idMonstreTch = bulletAtMonster(bullet,this.bulletSize, this.game.monsters)

        if (
          bullet.x > display.canvas.width ||
          bullet.x < 0 ||
          bullet.y > display.canvas.height ||
          bullet.y < 0
        ) {
          this.bulletSettings.splice(index, 1);
        } else if (idMonstreTch.length >0) {
          this.bulletSettings.splice(index, 1);

          // enleve des pv plus supprime le monstre si mort 
          idMonstreTch.forEach(id=>{
            this.game.monsters[id].life--
            if (this.game.monsters[id].life == 0) {
              this.game.monsters.splice(id,1)
              // TODO a delete c'est pour teste
              this.game.monsters = [new Monster(new Vector2D( Math.floor(Math.random() * Math.floor(display.canvas.width)), Math.floor(Math.random() * Math.floor(display.canvas.height))),5)];
            }
          })
          
        } else {
          switch (bullet.direction) {
            case "up":
              bullet.y -= this.bulletSize * 2;
              break;

            case "down":
              bullet.y += this.bulletSize * 2;
              break;

            case "right":
              bullet.x += this.bulletSize * 2;
              break;

            case "left":
              bullet.x -= this.bulletSize * 2;
              break;

            default:
              break;
          }
        }
      });
      this.game.monsters.forEach(monster => {
        display.cx.drawImage(
          display.playerSprite,
          monster.pos.x,
          monster.pos.y,
          monster.size.x * display.zoom,
          monster.size.y * display.zoom
        );
      });
    };
    this.updateGUIDisplay = display => {
      display.cx.fillText(
        this.game.player.ammos + "/" + this.game.player.fixammos,
        display.canvas.width - 50,
        display.canvas.height - 50
      );
    };

    this.throwBullet = () => {
      if (this.game.player.attackspeed == 0) {
        this.bulletSettings.push({
          x:
            this.game.player.pos.x * this.display.zoom +
            ((this.game.player.size.x / 2) * this.display.zoom -
              (this.bulletSize / 2) * this.display.zoom),
          y:
            this.game.player.pos.y * this.display.zoom +
            ((this.game.player.size.x / 2) * this.display.zoom -
              (this.bulletSize / 2) * this.display.zoom),
          direction: this.lastDirection
        });
        this.game.player.ammos--;
        this.game.player.attackspeed = this.game.player.fixattackspeed;
      }
    };
  }
}
