class CharacterSelection {

    constructor(game) {
        this.pos = {
            x: 0,
            y: 0
        }
        this.game = game;

        this.update = () => {
            this.getCase();
        }
        this.updateDisplay = () => {
            this.getCase();
        }

        this.getCase = ()=>{
            this.game.keys.forEach((keys, id) => {
                this.game.lastKeys.forEach((lastkeys, lastid) => {
                  if (id === lastid) {
                    if (this.game.keys.get("a") && !this.game.lastkeys.get("a")) {
                     
                    }
                    if (this.game.keys.get("up") && !lastkeys.get("up"))
                      this.pos.y = (((this.pos.y - 1) % nbMenu) + nbMenu) % nbMenu;
                    if (this.game.keys.get("down") && !lastkeys.get("down"))
                      this.pos.y = (this.pos.y + 1) % nbMenu;
                    if (this.game.keys.get("rigth") && !lastkeys.get("rigth"))
                      this.pos.x = (((this.pos.x - 1) % nbMenu) + nbMenu) % nbMenu;
                    if (this.game.keys.get("left") && !lastkeys.get("left"))
                      this.pos.x = (this.pos.x + 1) % nbMenu;
                  }
                });
              });
        }
    }
}

