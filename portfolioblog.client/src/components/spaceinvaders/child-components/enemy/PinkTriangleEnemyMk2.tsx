import { EnemyBulletMk1 } from '../bullets/EnemyBulletMk1';
import { Enemy } from './Enemy';
import { PlayerShip } from '../PlayerShip';  // Assuming you import PlayerShip for tracking


export class PinkTriangleEnemyMk2 extends Enemy {
    enemyBullets: EnemyBulletMk1[];
    playerShip: PlayerShip;

    moveSpeed: number = 1;
    age: number = 0;

    aligned: boolean = false;
    burstShotsRemaining: number = 0;
    burstCooldown: number = 0;
    floatDistance: number;
    shootingCooldown: number = 0; // new cooldown counter

    constructor(
        x: number,
        y: number,
        ctx: CanvasRenderingContext2D,
        playerShip: PlayerShip,
        enemyBullets: EnemyBulletMk1[],
        floatDistance: number
    ) {
        super(x, y, ctx, 100, 1);
        this.enemyBullets = enemyBullets;
        this.playerShip = playerShip;
        this.floatDistance = floatDistance;
    }

    move() {
        if (this.shootingCooldown > 0) {
            this.shootingCooldown--;
        }

        if (this.age < this.floatDistance) {
            // Float down into screen first 100 frames (~100px)
            this.y += this.moveSpeed;
        } else {
            const playerCenter = this.playerShip.x;
            const enemyCenter = this.x + 15; // approx center x
            const diff = playerCenter - enemyCenter;

            if (!this.aligned && this.shootingCooldown === 0) {
                // Only try to align and shoot if cooldown is zero
                if (Math.abs(diff) <= 4) {
                    this.aligned = true;
                    this.burstShotsRemaining = 3;
                    this.burstCooldown = 0;
                } else {
                    this.x += Math.sign(diff) * this.moveSpeed;
                }
            } else if (this.aligned && this.burstShotsRemaining > 0 && this.burstCooldown <= 0) {
                this.fireBullet();
                this.burstShotsRemaining--;
                this.burstCooldown = 15;
            } else if (this.burstCooldown > 0) {
                this.burstCooldown--;
            } else if (this.aligned && this.burstShotsRemaining === 0) {
                // Burst finished, reset aligned and start shooting cooldown
                this.aligned = false;
                this.shootingCooldown = 75;
            } else if (!this.aligned) {
                // When not aligned and on cooldown, just follow player horizontally without shooting
                if (diff !== 0) {
                    this.x += Math.sign(diff) * this.moveSpeed;
                }
            }
        }

        this.age++;
    }

    fireBullet() {
        const bulletX = this.x + 15 - 2.5;
        const bulletY = this.y + 30;
        const bullet = new EnemyBulletMk1(bulletX, bulletY, this.ctx);
        this.enemyBullets.push(bullet);
    }

    draw() {
        const baseWidth = 30;
        const height = 30;

        const xCenter = this.x + baseWidth / 2;
        const yBottom = this.y + height;

        this.ctx.fillStyle = 'hotpink';
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

    checkShoot() { }
}
