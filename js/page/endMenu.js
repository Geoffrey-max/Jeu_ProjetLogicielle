class EndMenu {

  constructor(game) {
    this.game = game;

    this.update = () => {
      this.game.keys.forEach((key, id) => {
        this.game.lastKeys.forEach((lastkey, lastid) => {
          if (id === lastid) {
            if (id === "a" && lastid === "a" && key && !lastkey) {
              var currmenu = this.game.endMenuOptionList[this.game.cursor];
              switch (currmenu) {
                case this.game.endMenuOptionList[0]:
                  this.game.gameState = this.game.gameStateEnum.CHARACTERSELECTION;
                  this.game.characterSelection = new CharacterSelection(this.game);
                  break;
                case this.game.endMenuOptionList[1]:
                  this.game.gameState = this.game.gameStateEnum.RANKING;
                  break;
                case this.game.endMenuOptionList[2]:
                  this.game.gameState = this.game.gameStateEnum.MAINMENU;
                default:
                  break;
              }
            }
            if (id === "up" && lastid === "up" && key && !lastkey) {
              this.game.cursor =
                (((this.game.cursor - 1) % nbMenu) + nbMenu) % nbMenu;
              console.log(this.game.cursor);
            }
            if (id === "down" && lastid === "down" && key && !lastkey) {
              this.game.cursor = (this.game.cursor + 1) % nbMenu;
              console.log(this.game.cursor);
            }
          }
        });
      }, this);

    }
    this.updateDisplay = (display) => {
      var my_gradient = display.cx.createLinearGradient(0, 0, 0, display.canvas.height * display.zoom);
      my_gradient.addColorStop(0, "black");
      my_gradient.addColorStop(1, "#a60000");
      display.cx.fillStyle = my_gradient;
      display.cx.fillRect(0, 0, display.canvas.width * display.zoom, display.canvas.height * display.zoom);

      display.cx.fillStyle = "white";
      display.cx.strokeStyle = "red";
      display.cx.font = " " + 30 * display.zoom + "pt Ancherr";

      display.cx.fillText("END MENU", 182.5 * display.zoom, 60 * display.zoom);
      display.cx.strokeText("END MENU", 182.5 * display.zoom, 60 * display.zoom);

      display.cx.font = " " + 15 * display.zoom + "pt Ancherr";
      display.cx.fillText("Restart", 185 * display.zoom, 150 * display.zoom);
      display.cx.strokeText(
        "Restart",
        185 * display.zoom,
        150 * display.zoom
      );
      display.cx.fillText("Ranking", 185 * display.zoom, 180 * display.zoom);
      display.cx.strokeText("Ranking", 185 * display.zoom, 180 * display.zoom);

      display.cx.fillText("Return to Main", 185 * display.zoom, 210 * display.zoom);
      display.cx.strokeText("Return to Main", 185 * display.zoom, 210 * display.zoom);
    }

  }
}

