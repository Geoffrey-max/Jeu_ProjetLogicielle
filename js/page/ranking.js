class Ranking {
  constructor(game) {
    this.game = game;

    this.update = game => {
      this.game = game;
      console.log("rankk");
    };
    this.updateDisplay = display => {};
  }
}
