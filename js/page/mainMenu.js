class MainMenu {
  constructor(game) {
    this.game = game;

    this.update = () => {
      var nbMenu = this.game.mainmenuOptionList.length;
      this.game.keys.forEach((key, id) => {
        this.game.lastKeys.forEach((lastkey, lastid) => {
          if (id === lastid) {
            if (id === "a" && lastid === "a" && key && !lastkey) {
              var currmenu = this.game.mainmenuOptionList[this.game.cursor];
              switch (currmenu) {
                case this.game.mainmenuOptionList[0]:
                  this.game.gameState = this.game.gameStateEnum.CHARACTERSELECTION;
                  this.game.characterSelection = new CharacterSelection(
                    this.game
                  );
                  break;
                case this.game.mainMenuOptionList[1]:
                  this.game.gameState = this.game.gameStateEnum.RANKING;
                  break;
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
      });
    };

    this.updateDisplay = display => {
      display.cx.drawImage(
        display.backgroundSprite,
        0,
        0,
        display.canvas.width,
        display.canvas.height
      );
      display.cx.drawImage(
        display.firtThemeSprite,
        0,
        0,
        (display.canvas.height * display.firtThemeSprite.width) /
          display.firtThemeSprite.height,
        display.canvas.height
      );
      switch (display.game.cursor) {
        case 0:
          display.cx.drawImage(
            display.lightningCursor,
            321 * display.zoom,
            150 * display.zoom,
            70 * display.zoom,
            10 * display.zoom
          );
          break;
        case 1:
          display.cx.drawImage(
            display.lightningCursor,
            321 * display.zoom,
            180 * display.zoom,
            70 * display.zoom,
            10 * display.zoom
          );
          break;

        default:
          break;
      }
      display.cx.fillStyle = "white";
      display.cx.strokeStyle = "red";
      display.cx.font = " " + 30 * display.zoom + "pt Ancherr";

      display.cx.fillText(" APOCALYPSE", 270 * display.zoom, 60 * display.zoom);
      display.cx.strokeText(
        " APOCALYPSE",
        270 * display.zoom,
        60 * display.zoom
      );
      display.cx.fillText(" MILITARY", 290 * display.zoom, 90 * display.zoom);
      display.cx.strokeText(" MILITARY", 290 * display.zoom, 90 * display.zoom);

      display.cx.font = " " + 15 * display.zoom + "pt Ancherr";
      display.cx.fillText(" New Game", 320 * display.zoom, 150 * display.zoom);
      display.cx.strokeText(
        " New Game",
        320 * display.zoom,
        150 * display.zoom
      );
      display.cx.fillText(" Ranking", 325 * display.zoom, 180 * display.zoom);
      display.cx.strokeText(" Ranking", 325 * display.zoom, 180 * display.zoom);
    };
  }
}
