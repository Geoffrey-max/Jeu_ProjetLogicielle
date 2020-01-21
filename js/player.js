class Player {

    constructor(color, pos, size) {
        this.color = color;
        this.pos = pos;
        this.size = size;
        this.speed = new Vector2D(0, 0);
        this.jumpSpeed = 5;
        this.walkSpeed = 10;


        this.moveX = game => {

            if (game.keys.get("left")) this.speed.x = -this.walkSpeed;
            else if (game.keys.get("right")) this.speed.x = +this.walkSpeed;
            else this.speed.x = 0;

            var Xmovement = new Vector2D(this.speed.x, 0);
            var newPos = this.pos.plus(Xmovement);

            var obstacles = obstacleAt(
                newPos, this.size,
                game.obstacles
            );

            if (obstacles.length > 0) {
                this.speed.x = 0;
            } else {
                this.pos = newPos;
            }
        }

        this.moveY = game => {

            if (game.keys.get("up")) this.speed.y = -this.walkSpeed;
            else if (game.keys.get("down")) this.speed.y = +this.walkSpeed;
            else this.speed.y = 0;

            var Ymovement = new Vector2D(0, this.speed.y);
            var newPos = this.pos.plus(Ymovement);

            var obstacles = obstacleAt(
                newPos, this.size,
                game.obstacles
            );

            if (obstacles.length > 0) {
                this.speed.y = 0;
            } else {
                this.pos = newPos;
            }

        }

        this.update = game => {

            this.moveX(game);
            this.moveY(game);

            if (this.pos.y > 270) this.pos.y = 0;
        }
    }
}

