class Fight {
  constructor(game) {
    this.game = game;
    // donne la derniere direction du personnage
    this.lastDirection = "up";
    this.bulletSettings = [];
    this.bulletSize = 8;

    this.update = game => {
      this.game = game;

      this.game.player.update(this.game);
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

      if (this.game.monsters.length === 0) {
        this.game.monsters = [
          new Monster(
            new Vector2D(
              Math.floor(Math.random() * Math.floor(480 - 16)),
              Math.floor(Math.random() * Math.floor(270 - 32))
            ),
            5,
            new Vector2D(16, 32)
          )
        ];
      }

      this.bulletSettings.forEach((bullet, index) => {
        var idMonstreTch = bulletAtMonster(
          bullet,
          this.bulletSize,
          this.game.monsters
        );

        if (
          bullet.x > this.display.canvas.width ||
          bullet.x < 0 ||
          bullet.y > this.display.canvas.height ||
          bullet.y < 0
        ) {
          this.bulletSettings.splice(index, 1);
        } else if (idMonstreTch.length > 0) {
          this.bulletSettings.splice(index, 1);

          // enleve des pv plus supprime le monstre si mort
          idMonstreTch.forEach(id => {
            this.game.monsters[id].life--;
            if (
              this.game.monsters[id].life == 0 ||
              this.game.monsters.length == 0
            ) {
              this.game.monsters.splice(id, 1);
              // TODO a delete c'est pour test
              this.game.monsters = [
                new Monster(
                  new Vector2D(
                    Math.floor(
                      Math.random() * Math.floor(480 - 16)
                    ),
                    Math.floor(
                      Math.random() * Math.floor(270 - 32)
                    )
                  ),
                  5,
                  new Vector2D(16, 32)
                )
              ];
            }
          });
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
      this.game.monsters.forEach((monster) => {
        monster.update(game);
      });
    };
    this.updateDisplay = display => {
      display.cx.drawImage(
        display.plateauSprite,
        88,
        44,
        325,
        267,
        0,
        0,
        display.canvas.width,
        display.canvas.height
      );



      this.display = display;
      var player = display.game.player;
      var settingImg = {
        down: { sx: 0, sy: 0, sw: 0, sh: 0 },
        up: { sx: 0, sy: 0, sw: 0, sh: 0 },
        left: { sx: 0, sy: 0, sw: 0, sh: 0 },
        right: { sx: 0, sy: 0, sw: 0, sh: 0 }
      }
      switch (player.name) {
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

      switch (this.lastDirection) {
        case "up":
          display.cx.drawImage(
            display[player.name + "Sprite"],
            settingImg.up.sx,
            settingImg.up.sy,
            settingImg.up.sw,
            settingImg.up.sh,
            player.pos.x * display.zoom,
            player.pos.y * display.zoom,
            player.size.x * display.zoom,
            player.size.y * display.zoom
          );

          break;
        case "down":
          display.cx.drawImage(
            display[player.name + "Sprite"],
            settingImg.down.sx,
            settingImg.down.sy,
            settingImg.down.sw,
            settingImg.down.sh,
            player.pos.x * display.zoom,
            player.pos.y * display.zoom,
            player.size.x * display.zoom,
            player.size.y * display.zoom
          );
          break;
        case "left":
          display.cx.drawImage(
            display[player.name + "Sprite"],
            settingImg.left.sx,
            settingImg.left.sy,
            settingImg.left.sw,
            settingImg.left.sh,
            player.pos.x * display.zoom,
            player.pos.y * display.zoom,
            player.size.x * display.zoom,
            player.size.y * display.zoom
          );
          break;
        case "right":
          display.cx.drawImage(
            display[player.name + "Sprite"],
            settingImg.right.sx,
            settingImg.right.sy,
            settingImg.right.sw,
            settingImg.right.sh,
            player.pos.x * display.zoom,
            player.pos.y * display.zoom,
            player.size.x * display.zoom,
            player.size.y * display.zoom
          );
          break;

        default:
          break;
      }

      display.game.obstacles.forEach(obstacle => {
        display.cx.drawImage(
          display.obstacleSprite,
          70,
          25,
          35,
          103,
          obstacle.pos.x * display.zoom,
          obstacle.pos.y * display.zoom,
          obstacle.size.x * display.zoom,
          obstacle.size.y * display.zoom
        );
      });

      display.cx.fillStyle = "blue";
      display.cx.font = 4 * display.zoom + "px arial";
      display.cx.fillText(
        "X : " +
        display.game.player.pos.x +
        " Y: " +
        display.game.player.pos.y +
        "",
        10 * display.zoom,
        10 * display.zoom
      );

      display.cx.font = " " + 8 * display.zoom + "px consolas";
      this.bulletSettings.forEach((bullet, index) => {
        display.cx.drawImage(
          display.lightningCursor,
          bullet.x * display.zoom,
          bullet.y * display.zoom,
          this.bulletSize * display.zoom,
          this.bulletSize * display.zoom
        );
      });
      this.game.monsters.forEach(monster => {
        display.cx.drawImage(
          display.monsterSprite,
          monster.pos.x * display.zoom,
          monster.pos.y * display.zoom,
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
            this.game.player.pos.x +
            ((this.game.player.size.x / 2) -
              (this.bulletSize / 2)),
          y:
            this.game.player.pos.y +
            ((this.game.player.size.x / 2) -
              (this.bulletSize / 2)),
          direction: this.lastDirection
        });
        this.game.player.ammos--;
        this.game.player.attackspeed = this.game.player.fixattackspeed;
      }
    };
  }
}
