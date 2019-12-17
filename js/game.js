class Game {
  constructor() {
    this.frame = 0;

    this.keys = null;
    this.lastKeys = null;


    this.player = new Player("red", new Vector2D(0, 0), new Vector2D(32, 32));

    this.obstacles = [
      {
        obstacle: new Obstacle(new Image(432, 400), new Vector2D(128, 64), new Vector2D(0, 100))
      },
      {
        obstacle: new Obstacle(new Image(432, 400), new Vector2D(128, 64), new Vector2D(300, 100))
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
    ]

    this.gravity = new Vector2D(0, 0);

    this.update = keys => {
      this.keys = keys;

      this.player.update(this);

      this.lastKeys = new Map([
        ["left", keys.get("left")],
        ["up", keys.get("up")],
        ["right", keys.get("right")],
        ["down", keys.get("down")],
        ["select", keys.get("select")]
      ]);

      this.frame++;
    };
  }
}
