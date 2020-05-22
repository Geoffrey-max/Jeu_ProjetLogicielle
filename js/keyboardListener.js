class KeyboardListener {
    constructor() {
        this.keys = null;

        this.keyCodes = new Map([
            [81, "left"],
            [90, "up"],
            [68, "right"],
            [83, "down"],
            [79, "a"],
            [80, "b"],
            [82, "r"],
            [27,"escape"]

        ]);

        this.listen = () => {
            var pressed = new Map();
            this.keyCodes.forEach(code => pressed.set(code, false));
            var handler = event => {
                if (this.keyCodes.get(event.keyCode) !== undefined) {
                    var down = event.type === "keydown";
                    pressed.set(this.keyCodes.get(event.keyCode), down);
                    event.preventDefault();
                }
            };
            addEventListener("keydown", handler);
            addEventListener("keyup", handler);
            this.keys = pressed;
        };
    }
}