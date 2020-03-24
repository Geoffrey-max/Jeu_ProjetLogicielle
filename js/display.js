class Display {
  constructor(game) {
    this.frame = 0;
    this.zoom = 1;
    this.canvasSprite = document.createElement("img");
    this.canvasSprite.src = "img/tile.png";
    this.obstacleSprite = document.createElement("img");
    this.obstacleSprite.src = "img/game/maisonCasse.png";
    this.backgroundSprite = document.createElement("img");
    this.backgroundSprite.src = "img/atacama03.jpg";
    this.firtThemeSprite = document.createElement("img");
    this.firtThemeSprite.src = "img/perso.png";
    this.lightningCursor = document.createElement("img");
    this.lightningCursor.src = "img/bolt1.png";

    this.playerSprite = document.createElement('img');
    this.playerSprite.src = 'img/game/jotaro.png';
    this.playerSpritePP = document.createElement('img');
    this.playerSpritePP.src = 'img/game/jotaroPP.png';
    this.monsterSprite = document.createElement('img');
    this.monsterSprite.src = 'img/game/zombie.gif';
    this.plateauSprite = document.createElement('img');
    this.plateauSprite.src = 'img/game/plateau.png';



    this.game = game;

    this.canvas = document.createElement("canvas");
    this.cx = this.canvas.getContext("2d");

    this.update = () => {
      this.cx.clearRect(
        0,
        0,
        this.canvas.width * this.zoom,
        this.canvas.height * this.zoom
      );

      this.cx.fillStyle = "White";
      this.cx.fillRect(
        0,
        0,
        this.canvas.width * this.zoom,
        this.canvas.height * this.zoom
      );
      // this.cx.drawImage(this.canvasSprite, 0, 0, 384, 256, 0, 0, this.canvas.width, this.canvas.height);
      switch (this.game.gameState) {
        case this.game.gameStateEnum.MAINMENU:
          this.game.mainMenu.updateDisplay(this);
          break;
        case this.game.gameStateEnum.CHARACTERSELECTION:
          this.game.characterSelection.updateDisplay(this);
          break;
        case this.game.gameStateEnum.MAPSELECTION:
          this.game.mapSelection.updateDisplay(this);
          break;
        case this.game.gameStateEnum.GAME:
          this.game.fight.updateDisplay(this);
          this.game.fight.updateGUIDisplay(this);
          break;
        case this.game.gameStateEnum.RANKING:
          this.game.ranking.updateDisplay(this);
          break;
        case this.game.gameStateEnum.ENDMENU:
          this.game.endMenu.updateDisplay(this);
          break;
        default:
          break;
      }

      this.frame++;
    };

    this.resize = () => {
      if (innerWidth >= 1920 && innerHeight >= 1080) {
        this.zoom = 4;
        this.cx.scale(this.zoom, this.zoom);
        this.canvas.width = 1920;
        this.canvas.height = 1080;
      } else if (innerWidth >= 1440 && innerHeight >= 810) {
        this.zoom = 3;
        this.cx.scale(this.zoom, this.zoom);
        this.canvas.width = 1440;
        this.canvas.height = 810;
      } else if (innerWidth >= 960 && innerHeight >= 540) {
        this.zoom = 2;
        this.cx.scale(this.zoom, this.zoom);
        this.canvas.width = 960;
        this.canvas.height = 540;
      } else {
        this.zoom = 1;
        this.cx.scale(this.zoom, this.zoom);
        this.canvas.width = 480;
        this.canvas.height = 270;
      }
      this.cx.imageSmoothingEnabled = false;
    };

    this.resize();
    window.addEventListener("resize", this.resize);
    document.body.appendChild(this.canvas);
  }
}
