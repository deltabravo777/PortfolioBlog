import { Drawable } from "../Drawable";

export class Bullet extends Drawable {
    speed: number;

    constructor(x: number, y: number, ctx: CanvasRenderingContext2D, speed: number = 20) {
        super(x, y, ctx);
        this.speed = speed;
    }

    move() {
        this.y -= this.speed;
    }

    draw() {
        this.ctx.fillStyle = 'white';
        this.ctx.fillRect(this.x, this.y, 5, 10);
    }
}
