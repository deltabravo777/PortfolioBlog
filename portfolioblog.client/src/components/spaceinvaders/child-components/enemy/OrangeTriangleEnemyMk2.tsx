import { EnemyBullet } from '../bullets/EnemyBullet';
import { EnemyBulletMk1 } from '../bullets/EnemyBulletMk1';
import { Enemy } from './Enemy';
//import { EnemyBullet } from '../EnemyBullet';
//import { EnemyBulletMk1 } from '../EnemyBulletMk1';

export class OrangeTriangleEnemyMk2 extends Enemy {
    static waveGroups: Record<number, OrangeTriangleEnemyMk2[]> = {};
    static waveDirections: Record<number, number> = {};

    enemyBullets: EnemyBullet[];
    bulletShootDelay: number;
    bulletShootInterval: number;
    wave: number;

    constructor(
        x: number,
        y: number,
        ctx: CanvasRenderingContext2D,
        enemyBullets: EnemyBullet[],
        bulletShootDelay: number,
        bulletShootInterval: number,
        wave: number
    ) {
        super(x, y, ctx, 50, 2);
        this.enemyBullets = enemyBullets;
        this.bulletShootDelay = bulletShootDelay;
        this.bulletShootInterval = bulletShootInterval;
        this.wave = wave;

        if (!OrangeTriangleEnemyMk2.waveGroups[wave]) {
            OrangeTriangleEnemyMk2.waveGroups[wave] = [];
            OrangeTriangleEnemyMk2.waveDirections[wave] = 1;
        }

        OrangeTriangleEnemyMk2.waveGroups[wave].push(this);
    }

    destroy() {
        const group = OrangeTriangleEnemyMk2.waveGroups[this.wave];
        if (group) {
            OrangeTriangleEnemyMk2.waveGroups[this.wave] = group.filter(friend => friend !== this);
        }
    }

    move() {
        const canvasWidth = this.ctx.canvas.width;
        const group = OrangeTriangleEnemyMk2.waveGroups[this.wave];
        const direction = OrangeTriangleEnemyMk2.waveDirections;

        if (group && group[0] === this) {
            for (const friend of group) {
                if (friend.x <= 0) {
                    direction[this.wave] = 1;
                }
                if (friend.x + 30 >= canvasWidth) {
                    direction[this.wave] = -1;
                }
            }
        }

        if (this.x <= 0) {
            direction[this.wave] = 1;
        }

        this.x += direction[this.wave] * this.moveSpeed;
        this.age++;
    }

    draw() {
        const baseWidth = 30;
        const height = 30;

        const xCenter = this.x + baseWidth / 2;
        const yBottom = this.y + height;

        this.ctx.fillStyle = 'orange';
        this.ctx.beginPath();
        this.ctx.moveTo(this.x, this.y);
        this.ctx.lineTo(this.x + baseWidth, this.y);
        this.ctx.lineTo(xCenter, yBottom);
        this.ctx.closePath();
        this.ctx.fill();

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
        if (this.age < this.bulletShootDelay) return;

        const timeSinceFirstShot = this.age - this.bulletShootDelay;

        if (timeSinceFirstShot % this.bulletShootInterval === 0) {
            this.enemyBullets.push(
                new EnemyBulletMk1(this.x + 13, this.y + 30, this.ctx)
            );
        }
    }

    shoot() {
        const bulletX = this.x + 15 - 2.5;
        const bulletY = this.y + 30;

        const bullet = new EnemyBulletMk1(bulletX, bulletY, this.ctx);
        this.enemyBullets.push(bullet);
    }
}
