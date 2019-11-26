class Obstacle {
    constructor(img, wh, ht, pos) {
        image = img;
        witdh = wh;
        height = ht;
        position = pos;
        type = null;

        this.updateType = (valeurType) => {
            this.type = valeurType;
        };
    }
}