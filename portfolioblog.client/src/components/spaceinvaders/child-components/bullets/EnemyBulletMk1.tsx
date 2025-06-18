import { EnemyBullet } from './EnemyBullet';

export class EnemyBulletMk1 extends EnemyBullet {
    constructor(x: number, y: number, ctx: CanvasRenderingContext2D) {
        super(x, y, ctx, 7);
    }

    move() {
        this.y += this.speed;
    }

    draw() {
        this.ctx.fillStyle = 'red';
        this.ctx.fillRect(this.x, this.y, 5, 10);
    }
}
