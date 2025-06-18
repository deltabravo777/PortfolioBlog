import { EnemyBullet } from '../bullets/EnemyBullet';
import { EnemyBulletMk1 } from '../bullets/EnemyBulletMk1';
import { Enemy } from './Enemy';

export class PinkTriangleEnemy extends Enemy {
    enemyBullets: EnemyBullet[];
    constructor(
        x: number,
        y: number,
        ctx: CanvasRenderingContext2D,
        enemyBullets: EnemyBullet[]
    ) {
        super(x, y, ctx, 30, 2); // 30 health, speed 2
        this.enemyBullets = enemyBullets;
    }

    move() {
        // Only move down for the first 15 steps (30 units total)
        if (this.age < 40) {
            this.y += this.moveSpeed;
        }

        this.age++;
    }

    draw() {
        const baseWidth = 30;
        const height = 30;

        const xCenter = this.x + baseWidth / 2;
        const yBottom = this.y + height;

        this.ctx.fillStyle = 'pink';
        this.ctx.beginPath();
        this.ctx.moveTo(this.x, this.y);            // top-left
        this.ctx.lineTo(this.x + baseWidth, this.y); // top-right
        this.ctx.lineTo(xCenter, yBottom);           // bottom-center (pointy tip)
        this.ctx.closePath();
        this.ctx.fill();

        // Draw health bar
        const barWidth = 30;
        const barHeight = 5;
        const healthRatio = this.health / this.maxHealth;
        const healthBarX = this.x;
        const healthBarY = this.y - barHeight - 2;

        this.ctx.fillStyle = 'red';
        this.ctx.fillRect(healthBarX, healthBarY, barWidth, barHeight);

        this.ctx.fillStyle = 'lime';
        this.ctx.fillRect(healthBarX, healthBarY, barWidth * healthRatio, barHeight);
    }

    checkShoot() {
        if (this.age === 40 || (this.age > 40 && (this.age - 40) % 100 === 0)) {
            this.shoot();
        }
    }


    shoot() {
        // Create a bullet at center-bottom of the triangle enemy
        const bulletX = this.x + 15 - 2.5; // center x minus half bullet width (assuming bullet width=5)
        const bulletY = this.y + 30;       // bottom y of the triangle

        const bullet = new EnemyBulletMk1(bulletX, bulletY, this.ctx);
        this.enemyBullets.push(bullet);
    }
}
