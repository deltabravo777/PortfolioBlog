import { Enemy } from './Enemy';
import { EnemyBullet } from '../EnemyBullet';
import { EnemyBulletMk1 } from '../EnemyBulletMk1';

export class OrangeTriangleEnemyMk1 extends Enemy {
    static uniformDirection: number = 1;
    static mostLeft: number = Infinity;
    static mostRight: number = -Infinity;
    static friends: OrangeTriangleEnemyMk1[] = [];

    enemyBullets: EnemyBullet[];
    bulletShootDelay: number;
    bulletShootInterval: number;

    constructor(
        x: number,
        y: number,
        ctx: CanvasRenderingContext2D,
        enemyBullets: EnemyBullet[],
        bulletShootDelay: number,
        bulletShootInterval: number
    ) {
        super(x, y, ctx, 50, 2);
        this.enemyBullets = enemyBullets;
        this.bulletShootDelay = bulletShootDelay;
        this.bulletShootInterval = bulletShootInterval;
        OrangeTriangleEnemyMk1.friends.push(this);
    }

    destroy() {
        OrangeTriangleEnemyMk1.friends = OrangeTriangleEnemyMk1.friends.filter(friend => friend !== this);
    }


    move() {
        const canvasWidth = this.ctx.canvas.width;

        // Check if any friend is touching the left boundary
        if (this == OrangeTriangleEnemyMk1.friends[0]) {

            OrangeTriangleEnemyMk1.friends.forEach(friend => {
                if (friend.x <= 0) {
                    OrangeTriangleEnemyMk1.uniformDirection = 1;
                }
            });

            // Check if any friend is touching the right boundary
            OrangeTriangleEnemyMk1.friends.forEach(friend => {
                if (friend.x + 30 >= canvasWidth) {
                    OrangeTriangleEnemyMk1.uniformDirection = -1;
                }
            });
        }

        if (this.x <= 0) {
            OrangeTriangleEnemyMk1.uniformDirection = 1;
        }

        this.x += OrangeTriangleEnemyMk1.uniformDirection * this.moveSpeed;

        const leftEdge = this.x;
        const rightEdge = this.x + 30;

        if (leftEdge < OrangeTriangleEnemyMk1.mostLeft) {
            OrangeTriangleEnemyMk1.mostLeft = leftEdge;
        } else if (Math.abs(leftEdge - OrangeTriangleEnemyMk1.mostLeft) <= 15) {
            OrangeTriangleEnemyMk1.mostLeft = leftEdge;
        }

        if (rightEdge > OrangeTriangleEnemyMk1.mostRight) {
            OrangeTriangleEnemyMk1.mostRight = rightEdge;
        } else if (Math.abs(rightEdge - OrangeTriangleEnemyMk1.mostRight) <= 15) {
            OrangeTriangleEnemyMk1.mostRight = rightEdge;
        }

        this.age++;
        // AI Resume Keywords
    }


    draw() {
        const baseWidth = 30;
        const height = 30;

        const xCenter = this.x + baseWidth / 2;
        const yBottom = this.y + height;

        this.ctx.fillStyle = 'orange';
        this.ctx.beginPath();
        this.ctx.moveTo(this.x, this.y);             // top-left
        this.ctx.lineTo(this.x + baseWidth, this.y); // top-right
        this.ctx.lineTo(xCenter, yBottom);           // bottom-center
        this.ctx.closePath();
        this.ctx.fill();

        // Health bar
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
        // Wait until after the initial delay
        if (this.age < this.bulletShootDelay) return;

        const timeSinceFirstShot = this.age - this.bulletShootDelay;

        // Shoot every interval after delay
        if (timeSinceFirstShot % this.bulletShootInterval === 0) {
            this.enemyBullets.push(
                new EnemyBulletMk1(this.x + 13, this.y + 30, this.ctx) // Adjust position as needed
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
