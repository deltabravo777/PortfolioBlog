import { Drawable } from './Drawable';
import { Bullet } from './Bullet';

export class PlayerShip extends Drawable {
    keyPressed: { [key: string]: boolean } = {};
    bullets: Bullet[] = [];
    autofireInterval: NodeJS.Timeout | null = null;
    health: number; // Add health field
    maxHealth: number;
    width: number; // ⬅️ NEW: Add width
    constructor(x: number, y: number, ctx: CanvasRenderingContext2D, bullets: Bullet[]) {
        super(x, y, ctx);
        this.bullets = bullets; // Pass the bullets array to the player ship
        this.maxHealth = 100;
        this.health = 50; // Initialize health to 50
        this.width = 30; // ⬅️ NEW: Initialize width
        this.startAutoFire(); // Automatically start autofiring on creation
    }

    // Move the player ship based on key presses
    move(): void {
        const speed = 10;
        const canvasWidth = this.ctx.canvas.width;
        const canvasHeight = this.ctx.canvas.height;
        const halfSize = 15;

        if ((this.keyPressed['ArrowLeft'] || this.keyPressed['a']) && this.x - halfSize > 0) {
            this.x -= speed;
        }
        if ((this.keyPressed['ArrowRight'] || this.keyPressed['d']) && this.x + halfSize < canvasWidth) {
            this.x += speed;
        }
        if ((this.keyPressed['ArrowUp'] || this.keyPressed['w']) && this.y - halfSize > 0) {
            this.y -= speed;
        }
        if ((this.keyPressed['ArrowDown'] || this.keyPressed['s']) && this.y + halfSize < canvasHeight) {
            this.y += speed;
        }
    }

    // Draw the player ship
    draw(): void {
        const size = 30;
        const half = size / 2;

        this.ctx.fillStyle = 'gray';
        this.ctx.beginPath();
        this.ctx.moveTo(this.x, this.y - half);
        this.ctx.lineTo(this.x - half, this.y + half);
        this.ctx.lineTo(this.x + half, this.y + half);
        this.ctx.closePath();
        this.ctx.fill();

        this.DrawHealthBar();
    }

    DrawHealthBar(): void {
        const barWidth = 100;
        const barHeight = 10;
        const healthRatio = this.health / this.maxHealth;

        // Fixed position near bottom-right
        const padding = 10;
        const canvasWidth = this.ctx.canvas.width;
        const canvasHeight = this.ctx.canvas.height;
        const barX = canvasWidth - barWidth - padding;
        const barY = canvasHeight - barHeight - padding;

        // Gray background for missing health
        this.ctx.fillStyle = 'gray';
        this.ctx.fillRect(barX, barY, barWidth, barHeight);

        // Green foreground for current health
        this.ctx.fillStyle = 'lime';
        this.ctx.fillRect(barX, barY, barWidth * healthRatio, barHeight);
    }


    // Start autofiring of bullets (called during the ship's creation)
    startAutoFire(): void {
        if (this.autofireInterval) {
            clearInterval(this.autofireInterval); // Stop autofiring if already happening
        }

        this.autofireInterval = setInterval(() => {
            this.fireBullet(); // Fire a bullet every 200ms
        }, 200);
    }

    // Fire a single bullet
    fireBullet(): void {
        const bullet = new Bullet(this.x, this.y - 30, this.ctx); // Bullet starts above the ship
        this.bullets.push(bullet); // Add bullet to the shared bullets array
    }

    takeDamage(amount: number): void {
        this.health -= amount;
        if (this.health < 0) {
            this.health = 0;
        }
    }



}
