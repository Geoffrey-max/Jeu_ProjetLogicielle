class MapSelection {
    constructor(game) {
      this.pos = {
        x: 0,
        y: 0
      };
      this.game = game;
      this.mapList = [
        { name: "2Ddungeons" },
        { name: "player1" },
        { name: "player1" },
        { name: "player1" }
      ];
      this.mapPerList = 3;
      this.indexchoose = 0;
      
      this.update = game => {
        this.game = game;
        this.nbrow = Math.ceil(this.mapList.length / this.mapPerList);
        this.updatePos();
        console.log(this.pos);
      };
      this.updateDisplay = display => {
        var my_gradient = display.cx.createLinearGradient(
          0,
          0,
          0,
          display.canvas.height * display.zoom
        );
        my_gradient.addColorStop(0, "black");
        my_gradient.addColorStop(1, "#a60000");
        display.cx.fillStyle = my_gradient;
        display.cx.fillRect(
          0,
          0,
          display.canvas.width * display.zoom,
          display.canvas.height * display.zoom
        );
  
        display.cx.fillStyle = "white";
        display.cx.strokeStyle = "red";
        display.cx.lineWidth = 6;
        this.mapList.forEach((_, index) => {
          if (index === this.indexchoose) {
            display.cx.strokeRect(
              ((index % this.mapPerList) *((320 - 10 * this.mapPerList) / this.mapPerList + 10) +80) * display.zoom,
              (Math.floor(index / this.mapPerList) *((180 - 10 * this.nbrow) / this.nbrow + 10) +75) *display.zoom,
              ((320 - 10 * this.mapPerList) / this.mapPerList +10) * display.zoom,
              ((180 - 10 * this.nbrow) / this.nbrow +10) * display.zoom
            );
            
            display.cx.drawImage(
              display.plateauSprite,
              ((index % this.mapPerList) *((320 - 10 * this.mapPerList) / this.mapPerList + 10) +80) * display.zoom,
              (Math.floor(index / this.mapPerList) *((180 - 10 * this.nbrow) / this.nbrow + 10) +75) *display.zoom,
              ((320 - 10 * this.mapPerList) / this.mapPerList +10) * display.zoom,
              ((180 - 10 * this.nbrow) / this.nbrow +10) * display.zoom
            );
  
          }else{
            display.cx.drawImage(
              display.plateauSprite,
              ((index % this.mapPerList) *
                ((320 - 10 * this.mapPerList) / this.mapPerList + 10) +
                85) *
                display.zoom,
              (Math.floor(index / this.mapPerList) *
                ((180 - 10 * this.nbrow) / this.nbrow + 10) +
                80) *
                display.zoom,
              ((320 - 10 * this.mapPerList) / this.mapPerList) * display.zoom,
              ((180 - 10 * this.nbrow) / this.nbrow) * display.zoom
            );
          }
        });
  
        display.cx.lineWidth = 1;
        display.cx.font = " " + 30 * display.zoom + "pt Ancherr";
        display.cx.fillText(
          " CHOOSE A MAP",
          140 * display.zoom,
          60 * display.zoom
        );
        display.cx.strokeText(
          " CHOOSE A MAP",
          140 * display.zoom,
          60 * display.zoom
        );
      };
  
      this.updatePos = () => {
        this.game.keys.forEach((key, id) => {
          this.game.lastKeys.forEach((lastkey, lastid) => {
            if (id === lastid) {
              if (id === "a" && lastid === "a" && key && !lastkey) {
                this.game.gameState = this.game.gameStateEnum.GAME;
                this.game.fight = new Fight(
                  this.game
                );
              }
              if (id === "up" && lastid === "up" && key && !lastkey) {
                this.pos.y =
                  (((this.pos.y - 1) % this.nbrow) + this.nbrow) % this.nbrow;
              }
              if (id === "down" && lastid === "down" && key && !lastkey) {
                this.pos.y =
                  (((this.pos.y + 1) % this.nbrow) + this.nbrow) % this.nbrow;
              }
              if (id === "left" && lastid === "left" && key && !lastkey) {
                this.pos.x =
                  (((this.pos.x - 1) % this.nbrow) + this.nbrow) % this.nbrow;
              }
              if (id === "right" && lastid === "right" && key && !lastkey) {
                this.pos.x = (this.pos.x + 1) % this.mapPerList;
              }
              this.indexchoose = this.pos.x + this.pos.y * this.mapPerList;
              console.log(this.pos);
  
              console.log(this.indexchoose);
            }
          });
        });
      };
    }
  }
  