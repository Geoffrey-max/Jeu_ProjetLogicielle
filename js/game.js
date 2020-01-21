class Game {
  constructor() {
    this.frame = 0;

    this.keys = null;
    this.lastKeys = new Map([
      ["left", false],
      ["up", false],
      ["right", false],
      ["down", false],
      ["select", false]
    ]);
    this.gameStateEnum = {
      MAINMENU: "mainMenu",
      CHARACTERSELECTION: "characterSelection",
      MAPSELECTION: "mapSelection",
      GAME: "game",
      RANKING: "ranking"
    };
    this.cursor = 0;
    this.mainmenuOptionList = ["newGame", "ranking"];
    this.endMenuOptionList = ["restart", "selectNewMap", "ranking", "main"];
    this.characterSelection = new CharacterSelection(this);
    this.gameState = this.gameStateEnum.CHARACTERSELECTION;

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

      switch (this.gameState) {
        case this.gameStateEnum.MAINMENU:
          this.updateMainMenu();
          break;
        case this.gameStateEnum.CHARACTERSELECTION:
          this.updateCharacterSelection();
          break;
        case this.gameStateEnum.GAME:
          this.updateGame();
          break;
        case this.gameStateEnum.RANKING:
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
        ["a", keys.get("a")]
      ]);
      this.frame++;
    };

    this.updateMainMenu = () => {
      var nbMenu = this.mainmenuOptionList.length;
      this.keys.forEach((key, id) => {
        this.lastKeys.forEach((lastkey, lastid) => {
          if (id === lastid) {
            if (id === "a" && lastid === "a" && key && !lastkey) {
              var currmenu = this.mainmenuOptionList[this.cursor];
              switch (currmenu) {
                case this.mainmenuOptionList[0]:
                  console.log("go to CHARARTERSELECTION");
                  this.gameState = this.gameStateEnum.CHARACTERSELECTION;
                  this.characterSelection = new CharacterSelection(this);
                  break;
                case this.mainMenuOptionList[1]:
                  this.gameState = this.gameStateEnum.RANKING;
                  break;
                default:
                  break;
              }
            }
            if (id === "up" && lastid === "up" && key && !lastkey) {
              this.cursor = (((this.cursor - 1) % nbMenu) + nbMenu) % nbMenu;
              console.log(this.cursor);
            }
            if (id === "down" && lastid === "down" && key && !lastkey) {
              this.cursor = (this.cursor + 1) % nbMenu;
              console.log(this.cursor);
            }
          }
        });
      });
    };
    this.updateCharacterSelection = ()=>{
      this.characterSelection.update();
    };
    this.updateEndMenu = () => {
      this.keys.forEach((keys, id) => {
        this.lastKeys.forEach((lastkey, lastid) => {
          if (id === lastid) {
            if (id === "a" && lastid === "a" && keys && !lastkey) {
              // console.log("a : " + id);
              var currmenu = this.endMenuOptionList[this.cursor];
              switch (currmenu) {
                case this.endMenuOptionList[0]:
                  console.log("go to restart");
                  this.gameState = this.gameStateEnum.FIGHT;
                  break;
                case this.endMenuOptionList[1]:
                  console.log("go to CHARARTERSELECTION");
                  this.gameState = this.gameStateEnum.CHARACTERSELECTION;
                  break;
                case this.endMenuOptionList[2]:
                  console.log("go to NewGAME");
                  this.gameState = this.gameStateEnum.RANKING;
                  break;
                case this.endMenuOptionList[3]:
                  console.log("go to Home");
                  this.gameState = this.gameStateEnum.MAINMENU;
                  break;
                default:
                  break;
              }
            }
            if (id === "up" && lastid === "up" && key && !lastkey) {
              this.cursor = (((this.cursor - 1) % this.endMenuOptionList.length) + this.endMenuOptionList.length) % this.endMenuOptionList.length;
              console.log(this.cursor);
            }
            if (id === "down" && lastid === "down" && key && !lastkey) {
              this.cursor = (this.cursor + 1) % this.endMenuOptionList.length;
              console.log(this.cursor);
            }
          }
        });
      }, this);
    };
  }
}
