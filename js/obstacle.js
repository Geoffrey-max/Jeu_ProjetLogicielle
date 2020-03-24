class Obstacle {
    constructor( size, pos) {
        this.size = size;
        this.pos = pos;
        this.type = null;

        this.updateType = (valeurType) => {
            this.type = valeurType;
        };
    }
}