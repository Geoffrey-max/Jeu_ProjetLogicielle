class Display {
  constructor(game) {
    this.frame = 0;
    this.zoom = 1;
    this.playerSprite = document.createElement("img");
    this.playerSprite.src = "img/Sprite2.jpg";
    this.canvasSprite = document.createElement("img");
    this.canvasSprite.src = "img/tile.png";
    this.game = game;

    this.canvas = document.createElement("canvas");
    this.cx = this.canvas.getContext("2d");

    this.update = () => {
      this.cx.clearRect(0, 0, this.canvas.width * this.zoom, this.canvas.height * this.zoom);

      this.cx.fillStyle = "White";
      this.cx.fillRect(0, 0, this.canvas.width * this.zoom, this.canvas.height * this.zoom);
      // this.cx.drawImage(this.canvasSprite, 0, 0, 384, 256, 0, 0, this.canvas.width, this.canvas.height);

      var player = this.game.player;

      this.cx.drawImage(this.playerSprite, 0, 0, 432, 400,
        player.pos.x * this.zoom,
        player.pos.y * this.zoom,
        player.size.x * this.zoom,
        player.size.y * this.zoom)

      this.cx.fillStyle = "yellow";
      this.game.obstacles.forEach(obstacle => {
        this.cx.fillRect(
          obstacle.pos.x * this.zoom,
          obstacle.pos.y * this.zoom,
          obstacle.size.x * this.zoom,
          obstacle.size.y * this.zoom
        );
      });

      this.cx.fillStyle = "blue";
      this.cx.font = " " + 12 * this.zoom + " consolas";
      this.cx.fillText("X : " + this.game.player.pos.x + " Y: " + this.game.player.pos.y + "", 10 * this.zoom, 10 * this.zoom);

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
