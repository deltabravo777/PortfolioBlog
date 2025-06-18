import { Enemy } from './Enemy';
import { PlayerShip } from '../PlayerShip';
import { EnemyBullet } from '../bullets/EnemyBullet';
import { EnemyBulletMk1 } from '../bullets/EnemyBulletMk1';

export class BrownBoxEnemy extends Enemy {
    playerShip: PlayerShip;
    enemyBullets: EnemyBullet[];
    pauseTimer: number = 0;
    burstShotsRemaining: number = 0;
    burstCooldown: number = 0;
    aligned: boolean = false;

    constructor(
        x: number,
        y: number,
        ctx: CanvasRenderingContext2D,
        playerShip: PlayerShip,
        enemyBullets: EnemyBullet[]
    ) {
        super(x, y, ctx, 60, 1.5); // health 60, slower speed
        this.playerShip = playerShip;
        this.enemyBullets = enemyBullets;
    }

    move() {
        if (!this.aligned) {
            const playerCenter = this.playerShip.x;
            //const playerCenter = this.playerShip.x + this.playerShip.width / 2;
            const enemyCenter = this.x + 15;
            const diff = playerCenter - enemyCenter;

            if (Math.abs(diff) <= 4) {
                this.aligned = true;
                this.pauseTimer = 30; // pause for 1 second (assuming 60 FPS)
                this.burstShotsRemaining = 3;
                this.burstCooldown = 0;
            } else {
                this.x += Math.sign(diff) * this.moveSpeed;
            }
        } else if (this.pauseTimer > 0) {
            this.pauseTimer--;
        } else if (this.burstShotsRemaining > 0 && this.burstCooldown <= 0) {
            this.fire();
            this.burstShotsRemaining--;
            this.burstCooldown = 15; // 15 frame delay between burst shots
        } else if (this.burstCooldown > 0) {
            this.burstCooldown--;
        }
        else {
            // All burst logic is done—reset for another homing pass
            this.aligned = false;
        }
    }

    fire() {
        const bullet = new EnemyBulletMk1(
            this.x + 15 - 2, // center of the enemy
            this.y + 30,     // just below the enemy
            this.ctx
        );
        this.enemyBullets.push(bullet);
    }

    draw() {
        this.ctx.fillStyle = 'rgb(123, 63, 0)'; // classic dark brown

        this.ctx.fillRect(this.x, this.y, 30, 30);

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
        // Shooting handled in move()
    }
}
