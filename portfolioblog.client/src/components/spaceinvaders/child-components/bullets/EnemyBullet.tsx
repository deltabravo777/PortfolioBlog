import { Drawable } from "../Drawable";

export abstract class EnemyBullet extends Drawable {
    speed: number;
    damage: number;

    constructor(x: number, y: number, ctx: CanvasRenderingContext2D, speed: number = 10) {
        super(x, y, ctx);
        this.speed = speed;
        this.damage = 5; // assign damage value here
    }

    abstract move(): void;
    abstract draw(): void;
}
