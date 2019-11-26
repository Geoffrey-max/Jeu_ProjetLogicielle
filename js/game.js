class Game {
  constructor() {
    this.frame = 0;

    this.keys = null;
    this.lastKeys = null;


    this.player = new Player("red", new Vector2D(0, 0), new Vector2D(32, 32));

    this.obstacles = [
      {
        color: "yellow",
        pos: new Vector2D(0, 100),
        size: new Vector2D(300, 16)
      },
      {
        color: "yellow",
        pos: new Vector2D(400, 100),
        size: new Vector2D(300, 16)
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
