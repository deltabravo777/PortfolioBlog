import { Enemy } from './Enemy';
import { PlayerShip } from '../PlayerShip';
import { EnemyBullet } from '../bullets/EnemyBullet';
import { OrangeEnemyLaserMk1 } from '../bullets/OrangeEnemyLaserseMk1';
//import { OrangeEnemyLaserMk1 } from '../bullets/OrangeEnemyLaserMk1';

export class YellowBoxEnemyMk1 extends Enemy {
    playerShip: PlayerShip;
    enemyBullets: EnemyBullet[];
    pauseTimer: number = 0;
    burstShotsRemaining: number = 0;
    burstCooldown: number = 0;
    aligned: boolean = false;
    shootingCooldown: number = 0;

    private _laser: OrangeEnemyLaserMk1 | null = null;
    get laser(): OrangeEnemyLaserMk1 | null {
        return this._laser;
    }
    set laser(value: OrangeEnemyLaserMk1 | null) {
        if (this._laser != null && value == null) {
            this.aligned = false;
            this.shootingCooldown = 75;
        }
        this._laser = value;
    }

    size: number = 30; // box is 30x30

    constructor(
        x: number,
        y: number,
        ctx: CanvasRenderingContext2D,
        playerShip: PlayerShip,
        enemyBullets: EnemyBullet[]
    ) {
        // Since x,y are center, convert to top-left for Enemy constructor
        super(x - 15, y - 15, ctx, 60, 1.5);
        this.playerShip = playerShip;
        this.enemyBullets = enemyBullets;
        this.laser = null;
        this.shootingCooldown = 0;
    }

    move() {
        // If there's an active laser, wait for it to expire before doing anything else
        if (this.shootingCooldown > 0) this.shootingCooldown--;
        if (this.laser && !this.laser.isExpired()) {
            return;
        }

        // If laser has expired, clean up the reference
        if (this.laser && this.laser.isExpired()) {
            this.laser = null;
        }

        if (!this.aligned) {
            const playerCenter = this.playerShip.x;
            const enemyCenter = this.x;
            //const enemyCenter = this.x + this.size / 2;
            const diff = playerCenter - enemyCenter;

            if (Math.abs(diff) <= 4 && this.shootingCooldown === 0) {
                this.aligned = true;
                this.pauseTimer = 30; // pause before firing
            } else if (Math.abs(diff) >= 2) {
                this.x += Math.sign(diff) * this.moveSpeed;
            }
        } else if (this.pauseTimer > 0) {
            this.pauseTimer--;
        } else if (!this.laser) {
            this.fire(); // fire once
        } else {
            // laser exists, wait for it to expire (handled at the top)
        }
    }


    fire() {
        // Since this.x,y are top-left, center is this.x + 15, this.y + 15
        const laser = new OrangeEnemyLaserMk1(
            this.x + this.size / 2 - 2, // small offset to center laser horizontally
            this.y + this.size,         // laser starts just below the box
            this.ctx,
            this,                       // source is this enemy
            2000
        );
        this.enemyBullets.push(laser);
        this.laser = laser;
    }

    draw() {
        const halfSize = this.size / 2;
        const topLeftX = this.x - halfSize;
        const topLeftY = this.y - halfSize;

        // Draw yellow box
        this.ctx.fillStyle = 'yellow';
        this.ctx.fillRect(topLeftX, topLeftY, this.size, this.size);

        // Draw health bar above box
        const barWidth = this.size;
        const barHeight = 5;
        const healthRatio = this.health / this.maxHealth;
        const healthBarX = topLeftX;
        const healthBarY = topLeftY - barHeight - 2;

        this.ctx.fillStyle = 'red';
        this.ctx.fillRect(healthBarX, healthBarY, barWidth, barHeight);

        this.ctx.fillStyle = 'lime';
        this.ctx.fillRect(healthBarX, healthBarY, barWidth * healthRatio, barHeight);
    }


    checkShoot() {
        // No shooting logic yet
    }
}
