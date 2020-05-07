class Ranking {

    constructor(game) {
        this.game = game;

        this.top5 = new Map([
            ["XE Sling", 5000],
            ["ThrallHDGaming", 2500],
            ["XE Kwoak", 1000],
            ["SISI", 300],
            ["Quoi", 200]
        ]);

        this.update = () => {
            console.log("rankk");
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

            display.cx.fillStyle = display.color.red;
            display.cx.fillRect(110 * display.zoom, 80 * display.zoom, 260 * display.zoom, 130 * display.zoom);

            display.cx.fillStyle = "black";
            display.cx.fillRect(113 * display.zoom, 83 * display.zoom, 254 * display.zoom, 124 * display.zoom);

            let i = 0;
            this.top5.forEach((score, name) => {
                display.cx.fillStyle = "white";
                display.cx.fillText("" + score + " .................... " + name + "", 125 * display.zoom, (110 + 20 * i) * display.zoom);
                i++;
            })
        }
    }
}
