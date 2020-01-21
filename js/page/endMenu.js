class EndMenu {
  constructor(game) {
    this.game = game;

    this.update = game => {
      this.game = game;
      this.game.keys.forEach((keys, id) => {
        this.game.lastKeys.forEach((lastkey, lastid) => {
          if (id === lastid) {
            // if (id === "a" && lastid === "a" && keys && !lastkey) {
            //   // console.log("a : " + id);
            //   var currmenu = this.game.endMenuOptionList[this.game.cursor];
            //   switch (currmenu) {
            //     case this.game.endMenuOptionList[0]:
            //       console.log("go to restart");
            //       this.game.gameState = this.game.gameStateEnum.FIGHT;
            //       break;
            //     case this.game.endMenuOptionList[1]:
            //       console.log("go to CHARARTERSELECTION");
            //       this.game.gameState = this.game.gameStateEnum.CHARACTERSELECTION;
            //       break;
            //     case this.game.endMenuOptionList[2]:
            //       console.log("go to NewGAME");
            //       this.game.gameState = this.game.gameStateEnum.RANKING;
            //       break;
            //     case this.game.endMenuOptionList[3]:
            //       console.log("go to Home");
            //       this.game.gameState = this.game.gameStateEnum.MAINMENU;
            //       break;
            //     default:
            //       break;
            //   }
            // }
            // if (id === "up" && lastid === "up" && key && !lastkey) {
            //   this.game.cursor = (((this.game.cursor - 1) % this.game.endMenuOptionList.length) + this.game.endMenuOptionList.length) % this.game.endMenuOptionList.length;
            //   console.log(this.game.cursor);
            // }
            // if (id === "down" && lastid === "down" && key && !lastkey) {
            //   this.game.cursor = (this.game.cursor + 1) % this.game.endMenuOptionList.length;
            //   console.log(this.game.cursor);
            // }
          }
        });
      }, this);
    };
    this.updateDisplay = display => {};
  }
}
