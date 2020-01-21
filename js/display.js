class Display {
  constructor(game) {
    this.frame = 0;
    this.zoom = 1;
    this.playerSprite = document.createElement("img");
    this.playerSprite.src = "img/Sprite2.jpg";
    this.canvasSprite = document.createElement("img");
    this.canvasSprite.src = "img/tile.png";
    this.obstacleSprite = document.createElement("img");
    this.obstacleSprite.src = "img/Sprite2.jpg";
    this.backgroundSprite = document.createElement("img");
    this.backgroundSprite.src = "img/atacama03.jpg";
    this.firtThemeSprite = document.createElement("img");
    this.firtThemeSprite.src = "img/perso.png";
    this.cursorSprite = document.createElement("img");
    this.cursorSprite.src = "img/cursor.png";
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
          this.displayMainMenu();
          break;
        case this.game.gameStateEnum.CHARACTERSELECTION:
          this.displayCharacterSelection();
          break;
        case this.game.gameStateEnum.GAME:
          this.displayGame();
          break;
        case this.game.gameStateEnum.RANKING:
          this.displayRanking();
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

    this.displayMainMenu = () => {
      this.cx.drawImage(
        this.backgroundSprite,
        0,
        0,
        this.canvas.width,
        this.canvas.height
      );
      this.cx.drawImage(
        this.firtThemeSprite,
        0,
        0,
        (this.canvas.height*this.firtThemeSprite.width)/this.firtThemeSprite.height,
        this.canvas.height
      );

      this.cx.fillStyle = "red";
      this.cx.strokeStyle = "white";
      this.cx.font = " " + 30 * this.zoom + "pt consolas";

      this.cx.fillText(" APOCALYPSE", 50, 60);
      this.cx.strokeText(" APOCALYPSE", 50, 60);
      this.cx.fillText(" MILITARY", 60, 90);
      this.cx.strokeText(" MILITARY", 60, 90);
    };


    
    this.displayGame = () => {
      var player = this.game.player;

      this.cx.drawImage(
        this.playerSprite,
        0,
        0,
        432,
        400,
        player.pos.x * this.zoom,
        player.pos.y * this.zoom,
        player.size.x * this.zoom,
        player.size.y * this.zoom
      );

      this.game.obstacles.forEach(obstacle => {
        this.cx.drawImage(
          this.obstacleSprite,
          0,
          0,
          432,
          400,
          obstacle.obstacle.pos.x * this.zoom,
          obstacle.obstacle.pos.y * this.zoom,
          obstacle.obstacle.size.x * this.zoom,
          obstacle.obstacle.size.y * this.zoom
        );
      });

      this.cx.fillStyle = "blue";
      this.cx.font = " " + 12 * this.zoom + " consolas";
      this.cx.fillText(
        "X : " + this.game.player.pos.x + " Y: " + this.game.player.pos.y + "",
        10 * this.zoom,
        10 * this.zoom
      );
    };
    this.resize();
    window.addEventListener("resize", this.resize);
    document.body.appendChild(this.canvas);
  }
}
