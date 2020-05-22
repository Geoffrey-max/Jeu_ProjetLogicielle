class Ranking {

  constructor(game) {
    this.game = game;
    this.scores = new Map([]);
    var date = new Date()
    var timedeath = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()

    if (game.fight) {
      game.request({ url: "https://apocalypse-military.herokuapp.com/historique", method: "POST", headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }, body: '{ "score":' + this.game.score + ', "datepassage": "' + timedeath + '", "id_joueurs": "' + this.game.usernom + '" } ' })
        .then(data => {
          game.request({ url: "https://apocalypse-military.herokuapp.com/historiqueDESC" }).then(data => {
            let varScore = JSON.parse(data);
            varScore.forEach(element => {
              this.scores.set(element.id_joueurs, element.score);
            });
          })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      game.request({ url: "https://apocalypse-military.herokuapp.com/historiqueDESC" }).then(data => {
        let varScore = JSON.parse(data);
        varScore.forEach(element => {
          this.scores.set(element.id_joueurs, element.score);
        });
      })
        .catch(error => {
          console.log(error);
        });
    }

    this.update = (game) => {
      this.game =game
      this.game.keys.forEach((key, id) => {
        this.game.lastKeys.forEach((lastkey, lastid) => {
          if (id === lastid) {
            if (id === "a" && lastid === "a" && key && !lastkey) {
              this.game.gameState = this.game.gameStateEnum.CHARACTERSELECTION;
              this.game.characterSelection = new CharacterSelection(
                this.game
              );
            }
          }
        });
      });
    }
    this.updateDisplay = (display) => {
      var my_gradient = display.cx.createLinearGradient(0, 0, 0, display.canvas.height * display.zoom);
      my_gradient.addColorStop(0, "black");
      my_gradient.addColorStop(1, "#a60000");
      display.cx.fillStyle = my_gradient;
      display.cx.fillRect(0, 0, display.canvas.width * display.zoom, display.canvas.height * display.zoom);

      display.cx.fillStyle = "white";
      display.cx.strokeStyle = display.color.red;
      display.cx.font = " " + 30 * display.zoom + "pt Ancherr";

      display.cx.fillText(" RANKING", 185 * display.zoom, 60 * display.zoom);
      display.cx.strokeText(" RANKING", 185 * display.zoom, 60 * display.zoom);

      display.cx.fillStyle = "white";
      display.cx.strokeStyle = display.color.red;
      display.cx.font = " " + 15 * display.zoom + "pt Ancherr";

      display.cx.fillText(" NEW GAME", 202.5 * display.zoom, 240 * display.zoom);
      display.cx.strokeText(" NEW GAME", 202.5 * display.zoom, 240 * display.zoom);
      display.cx.drawImage(
        display.lightningCursor,
        202.5 * display.zoom, 
        240 * display.zoom,
        70 * display.zoom,
        10 * display.zoom
      );
      display.cx.fillStyle = display.color.red;
      display.cx.fillRect(110 * display.zoom, 80 * display.zoom, 260 * display.zoom, 130 * display.zoom);

      display.cx.fillStyle = "black";
      display.cx.fillRect(113 * display.zoom, 83 * display.zoom, 254 * display.zoom, 124 * display.zoom);

      let i = 0;
      if (this.scores.size == 0) {
        display.cx.strokeText(
          "Loading",
          display.canvas.width / 2 - (10 * display.zoom),
          display.canvas.height - 100
        );
        display.cx.fillText(
          "Loading",
          display.canvas.width / 2 - (10 * display.zoom),
          display.canvas.height - 100
        );
      }
      this.scores.forEach((name, score) => {
        display.cx.fillStyle = "white";
        display.cx.fillText("" + score + " .................... " + name + "", 125 * display.zoom, (110 + 20 * i) * display.zoom);
        i++;
      })
    }
  }
}
