class Fight {
  constructor(game) {
    this.game = game;

    this.update = game => {
      this.game = game;
      console.log("rankk");
    };
    this.updateDisplay = display => {
      var player = display.game.player;

      display.cx.drawImage(
        display.playerSprite,
        0,
        0,
        432,
        400,
        player.pos.x * display.zoom,
        player.pos.y * display.zoom,
        player.size.x * display.zoom,
        player.size.y * display.zoom
      );

      display.game.obstacles.forEach(obstacle => {
        display.cx.drawImage(
          display.obstacleSprite,
          0,
          0,
          432,
          400,
          obstacle.obstacle.pos.x * display.zoom,
          obstacle.obstacle.pos.y * display.zoom,
          obstacle.obstacle.size.x * display.zoom,
          obstacle.obstacle.size.y * display.zoom
        );
      });

      display.cx.fillStyle = "blue";
      display.cx.font = " " + 12 * display.zoom + " consolas";
      display.cx.fillText(
        "X : " +
          display.game.player.pos.x +
          " Y: " +
          display.game.player.pos.y +
          "",
        10 * display.zoom,
        10 * display.zoom
      );
    };
  }
}
