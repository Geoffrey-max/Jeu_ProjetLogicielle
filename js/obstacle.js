class Obstacle {
    constructor(img, size, pos) {
        this.image = img;
        this.size = size;
        this.pos = pos;
        this.type = null;

        this.updateType = (valeurType) => {
            this.type = valeurType;
        };
    }
}