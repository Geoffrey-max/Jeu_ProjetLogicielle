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
    this.rankingMenuOptionList = ["newGame"];
    
    // Dev env--------------
    this.endMenu = new EndMenu(this);
    // ---------------------
    
    this.gameState = this.gameStateEnum.MAINMENU;
    this.mainMenu = new MainMenu(this);
    
    this.player = new Player("red", new Vector2D(0, 0), new Vector2D(20, 20));
    
    this.monsters = [];
    this.score = 0

    this.map = {}
    this.gravity = new Vector2D(0, 0);

    this.obstacles = [
      new Obstacle(new Vector2D(480, 0), new Vector2D(0, 0)),
      new Obstacle(new Vector2D(480, 0), new Vector2D(0, 270)),
      new Obstacle(new Vector2D(0, 270), new Vector2D(480, 0)),
      new Obstacle(new Vector2D(0, 270), new Vector2D(0, 0))
    ];

    this.request = obj => {
      return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open(obj.method || "GET", obj.url);
        if (obj.headers) {
          Object.keys(obj.headers).forEach(key => {
            xhr.setRequestHeader(key, obj.headers[key]);
          });
        }
        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve(xhr.response);
          } else {
            reject(xhr.statusText);
          }
        };
        xhr.onerror = () => reject(xhr.statusText);
        xhr.send(obj.body);
      });
    };


    this.update = keys => {
      this.keys = keys;

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
        ["a", keys.get("a")],
        ["r", keys.get("r")],
        ["escape", keys.get("escape")]
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
