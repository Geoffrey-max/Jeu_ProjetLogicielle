class Game {
  constructor() {
    this.frame = 0;

    this.keys = null;
    this.lastKeys = null;
    this.gameStateEnum = {
      MAINMENU: "mainMenu",
      CHARACTERSELECTION: "characterSelection",
      GAME: "game",
      RANKING: "ranking"
    };
    this.cursor = 0;
    this.mainmenuOptionList = ["newGame", "ranking"];
    this.gameState = this.gameStateEnum.MAINMENU;

    this.player = new Player("red", new Vector2D(0, 0), new Vector2D(32, 32));

    this.obstacles = [
      {
        obstacle: new Obstacle(
          new Image(432, 400),
          new Vector2D(128, 64),
          new Vector2D(0, 100)
        )
      },
      {
        obstacle: new Obstacle(
          new Image(432, 400),
          new Vector2D(128, 64),
          new Vector2D(300, 100)
        )
      },
      {
        obstacle: new Obstacle(null, new Vector2D(480, 0), new Vector2D(0, 0))
      },
      {
        obstacle: new Obstacle(null, new Vector2D(480, 0), new Vector2D(0, 270))
      },
      {
        obstacle: new Obstacle(null, new Vector2D(0, 270), new Vector2D(480, 0))
      },
      {
        obstacle: new Obstacle(null, new Vector2D(0, 270), new Vector2D(0, 0))
      }
    ];

    this.gravity = new Vector2D(0, 0);

    this.update = keys => {
      this.keys = keys;

      this.player.update(this);
      // this.cx.drawImage(this.canvasSprite, 0, 0, 384, 256, 0, 0, this.canvas.width, this.canvas.height);
      switch (this.game.gameState) {
        case this.game.gameStateEnum.MAINMENU:
          this.updateMainMenu();
          break;
        case this.game.gameStateEnum.CHARACTERSELECTION:
          this.updateMainMenuupdateCharacterSelection();
          break;
        case this.game.gameStateEnum.GAME:
          this.updateGame();
          break;
        case this.game.gameStateEnum.RANKING:
          this.updateRanking();
          break;
        default:
          break;
      }
      this.lastKeys = new Map([
        ["left", keys.get("left")],
        ["up", keys.get("up")],
        ["right", keys.get("right")],
        ["down", keys.get("down")],
        ["select", keys.get("select")]
      ]);

      this.frame++;
    };

    this.updateMainMenu = () => {
      var nbMenu = this.mainmenuOptionList.length;
      this.inputList.forEach((input, id) => {
        this.lastInputList.forEach((lastinput, lastid) => {
          if (id === lastid) {
            if (input.a && !lastinput.a) {
              var currmenu = this.mainmenuOptionList[this.cursor];
              switch (currmenu) {
                case this.mainmenuOptionList[0]:
                  console.log("go to CHARARTERSELECTION");
                  this.gameState = this.gameStateEnum.CHARACTERSELECTION;
                  this.characterSelection = new CharacterSelection(
                    this.characters,
                    this.mainmenuOptionList[this.cursor]
                  );
                  break;
                case this.endMenuOptionList[2]:
                  console.log("go to NewGAME");
                  this.fight = new Fight(this.player1, this.stage);
                  this.gameState = this.gameStateEnum.FIGHT;
                  break;
                default:
                  break;
              }
            }
            if (input.up && !lastinput.up)
              this.cursor = (((this.cursor - 1) % nbMenu) + nbMenu) % nbMenu;
            if (input.down && !lastinput.down)
              this.cursor = (this.cursor + 1) % nbMenu;
          }
        });
      });
    };
    this.updateEndMenu = () => {
      this.inputList.forEach((input, id) => {
        this.lastInputList.forEach((lastinput, lastid) => {
          if (id === lastid) {
            if (input.a && !lastinput.a) {
              // console.log("a : " + id);
              var currmenu = this.endMenuOptionList[this.cursor];
              switch (currmenu) {
                case this.endMenuOptionList[0]:
                  console.log("go to MAIN");
                  this.gameState = this.gameStateEnum.MAINMENU;
                  break;
                case this.endMenuOptionList[1]:
                  console.log("go to CHARARTERSELECTION");
                  this.gameState = this.gameStateEnum.CHARACTERSELECTION;
                  break;
                case this.endMenuOptionList[2]:
                  console.log("go to NewGAME");
                  this.fight = new Fight(this.player1, this.stage);
                  this.gameState = this.gameStateEnum.FIGHT;
                  break;
                default:
                  break;
              }
            }
            if (input.up && !lastinput.up) {
              this.cursor =
                (((this.cursor - 1) % this.endMenuOptionList.length) +
                  this.endMenuOptionList.length) %
                this.endMenuOptionList.length;
              // console.log("up : " + this.cursor);
            }
            if (input.down && !lastinput.down) {
              this.cursor =
                (((this.cursor + 1) % this.endMenuOptionList.length) +
                  this.endMenuOptionList.length) %
                this.endMenuOptionList.length;
              // console.log("down : " + this.cursor);
            }
          }
        });
      }, this);
    };
  }
}
