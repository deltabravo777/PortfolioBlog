import { EnemyBullet } from './EnemyBullet';
import { Drawable } from '../Drawable';
import { Enemy } from '../enemy/Enemy';
import { YellowBoxEnemyMk1 } from '../enemy/YellowBoxEnemyMk1';

export class OrangeEnemyLaserMk1 extends EnemyBullet {
    width: number;
    height: number;
    lifespan: number;
    source: YellowBoxEnemyMk1;
    lastDamageDealtAge: number;

    constructor(
        x: number,
        y: number,
        ctx: CanvasRenderingContext2D,
        source: YellowBoxEnemyMk1,
        height: number = 200,   // Beam length
        lifespan: number = 60   // Frames before disappearing
    ) {
        super(x, y, ctx, 0); // Laser doesn't travel; speed is 0
        this.width = 4;
        this.height = height;
        this.lifespan = lifespan;
        this.source = source;
        this.damage = 5;
        this.lastDamageDealtAge = -10; // Initialize so it can deal damage immediately
    }

    destroy() {
        if (this.source.laser) this.source.laser = null;
    }

    move() {
        this.x = this.source.x + 0;     // configure offset
        this.y = this.source.y + 0;

        this.age++;
    }

    draw() {
        if (this.age < this.lifespan) {
            this.ctx.strokeStyle = 'orange';
            this.ctx.lineWidth = this.width;

            this.ctx.beginPath();
            this.ctx.moveTo(this.x + this.width / 2, this.y);
            this.ctx.lineTo(this.x + this.width / 2, this.y + this.height);
            this.ctx.stroke();
        }
    }

    isExpired(): boolean {
        return this.age >= this.lifespan;
    }

    canDealDamage(): boolean {
        return this.age - this.lastDamageDealtAge >= 10;
    }

    markDamageDealt() {
        this.lastDamageDealtAge = this.age;
    }
}
