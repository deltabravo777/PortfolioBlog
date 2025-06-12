import { Drawable } from "../Drawable";

export abstract class Enemy extends Drawable {
    health: number;
    maxHealth: number;
    moveSpeed: number;
    direction: number;

    constructor(x: number, y: number, ctx: CanvasRenderingContext2D, health = 50, moveSpeed = 2) {
        super(x, y, ctx);
        this.health = health;
        this.maxHealth = health;
        this.moveSpeed = moveSpeed;
        this.direction = 1;
    }

    abstract checkShoot(): void;
}
