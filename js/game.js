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

    this.gravity = new Vector2D(0, 0);

    this.obstacles = [
      new Obstacle(new Vector2D(480, 0), new Vector2D(0, 0)),
      new Obstacle(new Vector2D(480, 0), new Vector2D(0, 270)),
      new Obstacle(new Vector2D(0, 270), new Vector2D(480, 0)),
      new Obstacle(new Vector2D(0, 270), new Vector2D(0, 0))
    ];

    let request = obj => {
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

    // {
    //   obstacle: new Obstacle(new Vector2D(65, 78), new Vector2D(0, 100))
    // },
    // {
    //   obstacle: new Obstacle(new Vector2D(65, 78), new Vector2D(300, 100))
    // },

    request({ url: "https://apocalypse-military.herokuapp.com/obstacles" })
      .then(data => {
        let obstacle = JSON.parse(data);
        obstacle.forEach(element => {
          var newobstacle = new Obstacle(
            new Vector2D(element.width, element.height),
            new Vector2D(element.positionx, element.positiony)
          );
          this.obstacles.push(newobstacle);
        });
      })
      .catch(error => {
        console.log(error);
      });

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
