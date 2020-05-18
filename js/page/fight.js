class Fight {
  constructor(game) {
    this.game = game;
    // donne la derniere direction du personnage
    this.lastDirection = "up";
    this.bulletSettings = [];
    this.bulletSize = 8;
    
    this.vagues = []
    this.currVague = 0 

    game.request({ url: "https://apocalypse-military.herokuapp.com/vagues" })
    .then(data => {
      let vagues = JSON.parse(data);
      vagues.forEach(element => {
        this.vagues.push(element);
        this.vagueready= true
      });
    })
    .catch(error => {
      console.log(error);
    });
    game.request({ url: "https://apocalypse-military.herokuapp.com/obstaclesbymap/"+game.map.name })
      .then(data => {
        let obstacle = JSON.parse(data);
        obstacle.forEach(element => {
          var newobstacle = new Obstacle(
            new Vector2D(element.width, element.height),
            new Vector2D(element.positionx, element.positiony)
          );
          game.obstacles.push(newobstacle);
          this.obstacleready= true
        });
      })
      .catch(error => {
        console.log(error);
      });

    this.update = game => {
      this.game = game;
      if (this.obstacleready && this.vagueready) {
        if (this.game.player.life <= 0) {
          this.game.ranking = new Ranking(game)
          this.game.gameState = "ranking"
        }

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
              game,
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
                     game,
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
        this.game.monsters.forEach((monster, index) => {
          monster.update(game);
          if (rectAt(monster.pos, monster.size, this.game.player.pos, this.game.player.size)) {
            this.game.player.life -= 1
            this.game.player.stat = "touch"
            this.game.monsters.splice(index, 1);
          }
        });
      }


    };
    this.updateDisplay = display => {
      display.cx.drawImage(
        display[this.game.map.name + "plateauSprite"],
        this.game.map.sx,
        this.game.map.sy,
        this.game.map.sw,
        this.game.map.sh,
        0,
        0,
        display.canvas.width,
        display.canvas.height
      );



      this.display = display;

      var player = display.game.player;
      player.updateDisplay(display, this.lastDirection);

      display.game.obstacles.forEach(obstacle => {
        display.cx.drawImage(
          display.obstacleSprite,
          0,
          0,
          0,
          0,
          obstacle.pos.x * display.zoom,
          obstacle.pos.y * display.zoom,
          obstacle.size.x * display.zoom,
          obstacle.size.y * display.zoom
        );
      });

      // HUD
      display.cx.fillStyle = "#660000";
      display.cx.font = 1 * display.zoom + "px arial";




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

      if (!this.obstacleready && !this.vagueready) {
        display.cx.strokeText(
        "Loading",
          display.canvas.width/2 -(10*display.zoom),
          display.canvas.height-100
        );
        display.cx.fillText(
          "Loading",
          display.canvas.width/2 - (10*display.zoom),
          display.canvas.height-100
        );
      }

    };
    this.updateGUIDisplay = display => {
      display.cx.font = " " + 20 * display.zoom + "pt Ancherr";
      display.cx.strokeStyle = display.color.red;
      display.cx.fillStyle = "white";
      display.cx.lineWidth = 5;
      display.cx.strokeText(
        this.game.player.ammos + "/" + this.game.player.fixammos,
        display.canvas.width - (50 * display.zoom),
        display.canvas.height - (20 * display.zoom)
      );
      display.cx.fillText(
        this.game.player.ammos + "/" + this.game.player.fixammos,
        display.canvas.width - (50 * display.zoom),
        display.canvas.height - (20 * display.zoom)
      );

      display.cx.lineWidth = 2;
      display.cx.font = " " + 12 * display.zoom + "pt Ancherr";

      display.cx.strokeRect((2 * display.zoom), display.canvas.height - (56 * display.zoom), (40 * display.zoom), (15 * display.zoom))
      display.cx.strokeText(
        "#" + this.game.score,
        (10 * display.zoom),
        display.canvas.height - (45 * display.zoom)
      );
      display.cx.fillText(
        "#" + this.game.score,
        (10 * display.zoom),
        display.canvas.height - (45 * display.zoom)
      );
      for (let i = 0; i < this.game.player.maxLife; i++) {
        if (i < this.game.player.life) {
          display.cx.drawImage(
            display.hearthFull,
            (15 * i + 30) * display.zoom,
            10 * display.zoom,
            15 * display.zoom,
            7 * display.zoom
          );

        } else {
          display.cx.drawImage(
            display.hearthVoid,
            (15 * i + 30) * display.zoom,
            10 * display.zoom,
            15 * display.zoom,
            7 * display.zoom
          );
        }
      }
      // display.cx.fillText(
      //   "X : " +
      //   display.game.player.pos.x +
      //   " Y: " +
      //   display.game.player.pos.y +
      //   "",
      //   100 * display.zoom,
      //   100 * display.zoom
      // );
      display.cx.lineWidth = 1;

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
