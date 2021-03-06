class CharacterSelection {
  constructor(game) {
    this.pos = {
      x: 0,
      y: 0
    };
    this.game = game;
    this.characterList = [
      { name: "Jotaro",pos:new Vector2D(70, 100), size:new Vector2D(20, 25),walkSpeed:3, attackspeed:10, ammos:20, life:4},
      { name: "LSamurai",pos:new Vector2D(70, 100), size:new Vector2D(20, 25),walkSpeed:5, attackspeed:7, ammos:10, life:3},
      { name: "Sasuke",pos:new Vector2D(70, 100), size:new Vector2D(20, 25),walkSpeed:4, attackspeed:15, ammos:30, life:3}
    ];
    this.charaPerLigne = 3;
    this.indexchoose = 0;
    this.update = game => {
      this.game = game;
      this.nbrow = Math.ceil(this.characterList.length / this.charaPerLigne);
      this.updatePos();
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
      display.cx.strokeStyle = display.color.red;
      display.cx.lineWidth = 6;
      this.characterList.forEach((character, index) => {
        if (index === this.indexchoose) {
          display.cx.strokeRect(
            ((index % this.charaPerLigne) *
              ((320 - 10 * this.charaPerLigne) / this.charaPerLigne + 10) +
              80) *
              display.zoom,
            (Math.floor(index / this.charaPerLigne) *
              ((180 - 10 * this.nbrow) / this.nbrow + 10) +
              75) *
              display.zoom,
            ((320 - 10 * this.charaPerLigne) / this.charaPerLigne + 10) *
              display.zoom,
            ((180 - 10 * this.nbrow) / this.nbrow + 10) * display.zoom
          );

          display.cx.drawImage(
            display[character.name+"SpritePP"],
            ((index % this.charaPerLigne) *
              ((320 - 10 * this.charaPerLigne) / this.charaPerLigne + 10) +
              80) *
              display.zoom,
            (Math.floor(index / this.charaPerLigne) *
              ((180 - 10 * this.nbrow) / this.nbrow + 10) +
              75) *
              display.zoom,
            ((320 - 10 * this.charaPerLigne) / this.charaPerLigne + 10) *
              display.zoom,
            ((180 - 10 * this.nbrow) / this.nbrow + 10) * display.zoom
          );
        } else {
          display.cx.drawImage(
            display[character.name+"SpritePP"],
            ((index % this.charaPerLigne) *
              ((320 - 10 * this.charaPerLigne) / this.charaPerLigne + 10) +
              85) *
              display.zoom,
            (Math.floor(index / this.charaPerLigne) *
              ((180 - 10 * this.nbrow) / this.nbrow + 10) +
              80) *
              display.zoom,
            ((320 - 10 * this.charaPerLigne) / this.charaPerLigne) *
              display.zoom,
            ((180 - 10 * this.nbrow) / this.nbrow) * display.zoom
          );
        }
      });

      display.cx.lineWidth = 1;
      display.cx.font = " " + 30 * display.zoom + "pt Ancherr";
      display.cx.fillText(
        " CHOOSE A SKIN",
        140 * display.zoom,
        60 * display.zoom
      );
      display.cx.strokeText(
        " CHOOSE A SKIN",
        140 * display.zoom,
        60 * display.zoom
      );
    };

    this.updatePos = () => {
      this.game.keys.forEach((key, id) => {
        this.game.lastKeys.forEach((lastkey, lastid) => {
          if (id === lastid) {
            if (id === "a" && lastid === "a" && key && !lastkey) {
              this.game.player = new Player(
              this.characterList[this.indexchoose]
              );
              this.game.gameState = this.game.gameStateEnum.MAPSELECTION;
              this.game.mapSelection = new MapSelection(this.game);
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
              this.pos.x = (this.pos.x + 1) % this.charaPerLigne;
            }
            this.indexchoose = this.pos.x + this.pos.y * this.charaPerLigne;
          }
        });
      });
    };
  }
}
