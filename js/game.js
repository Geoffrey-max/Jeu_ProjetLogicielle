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
      RANKING: "ranking",
      ENDMENU: "endMenu"
    };
    this.cursor = 0;
    this.mainmenuOptionList = ["newGame", "ranking"];
    this.endMenuOptionList = ["restart", "ranking", "main"];

    // Dev env--------------
    // this.characterSelection = new CharacterSelection(this);
    this.endMenu = new EndMenu(this);
    this.fight = new Fight(this);
    // this.mapSelection = new MapSelection(this);
    this.ranking = new Ranking(this);
    // ---------------------

    this.gameState = this.gameStateEnum.MAINMENU;
    this.mainMenu = new MainMenu(this);

    this.player = new Player("red", new Vector2D(0, 0), new Vector2D(20, 20));

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
        case this.gameStateEnum.MAPSELECTION:
          this.updateMapSelection();
          break;
        case this.gameStateEnum.GAME:
          this.updateGame();
          break;
        case this.gameStateEnum.RANKING:
          this.updateRanking();
          break;
        case this.gameStateEnum.ENDMENU:
          this.updateEndMenu();
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
      this.mainMenu.update(this);
    };
    this.updateCharacterSelection = () => {
      this.characterSelection.update(this);
    };
    this.updateMapSelection = () => {
      this.mapSelection.update(this);
    };
    this.updateGame = () => {
      this.fight.update(this);
    };

    this.updateRanking = () => {
      this.ranking.update(this);
    };

    this.updateEndMenu = () => {
      this.endMenu.update(this);
    };
  }
}
