import { Enemy } from './Enemy';

export class GreenBoxEnemy extends Enemy {
    constructor(x: number, y: number, ctx: CanvasRenderingContext2D) {
        super(x, y, ctx, 50, 2); // Default health 50, speed 2
    }

    move() {
        if (this.x <= 0 || this.x >= this.ctx.canvas.width - 30) {
            this.direction *= -1;
        }
        if (this.x <= 0) {
            this.direction = 1;
        }
        this.x += this.direction * this.moveSpeed;
        this.age++;
    }

    draw() {
        // Draw the box
        this.ctx.fillStyle = 'green';
        this.ctx.fillRect(this.x, this.y, 30, 30);

        // Draw the health bar above the box
        const barWidth = 30;
        const barHeight = 5;
        const healthRatio = this.health / this.maxHealth;
        const healthBarX = this.x;
        const healthBarY = this.y - barHeight - 2;

        // Background bar
        this.ctx.fillStyle = 'red';
        this.ctx.fillRect(healthBarX, healthBarY, barWidth, barHeight);

        // Current health
        this.ctx.fillStyle = 'lime';
        this.ctx.fillRect(healthBarX, healthBarY, barWidth * healthRatio, barHeight);
    }

    checkShoot() {
        // does nothing
    }
}
