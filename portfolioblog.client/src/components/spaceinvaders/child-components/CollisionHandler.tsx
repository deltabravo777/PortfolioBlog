import { Bullet } from './Bullet';
import { Enemy } from './enemy/Enemy';
//import { Enemy } from './Enemy';
import { GreenBoxEnemy } from './enemy/GreenBoxEnemy';
import { OrangeTriangleEnemyMk1 } from './enemy/OrangeTriangleEnemyMk1';
import { PinkTriangleEnemy } from './enemy/PinkTriangleEnemy';
import { EnemyBullet } from './EnemyBullet';
//import { GreenBoxEnemy } from './GreenBoxEnemy';
//import { PinkTriangleEnemy } from './PinkTriangleEnemy';
import { PlayerShip } from './PlayerShip';

export class CollisionHandler {
    bullets: Bullet[];
    enemies: Enemy[];
    enemyBullets: EnemyBullet[];
    player: PlayerShip;

    constructor(
        bullets: Bullet[],
        enemies: Enemy[],
        enemyBullets: EnemyBullet[],
        player: PlayerShip
    ) {
        this.bullets = bullets;
        this.enemies = enemies;
        this.enemyBullets = enemyBullets;
        this.player = player;
    }

    CalculateCollisions() {
        // Player bullets vs enemies (your existing code)
        for (let i = this.bullets.length - 1; i >= 0; i--) {
            const bullet = this.bullets[i];
            for (let j = this.enemies.length - 1; j >= 0; j--) {
                const enemy = this.enemies[j];

                if (enemy instanceof GreenBoxEnemy || enemy instanceof PinkTriangleEnemy || enemy instanceof OrangeTriangleEnemyMk1) {
                    // Shared logic for both types
                    if (
                        bullet.x < enemy.x + 30 &&
                        bullet.x + 4 > enemy.x && // bullet width assumed to be 4
                        bullet.y < enemy.y + 30 &&
                        bullet.y + 10 > enemy.y // bullet height assumed to be 10
                    ) {
                        enemy.health -= 10;

                        if (enemy.health <= 0) {
                            if (enemy instanceof OrangeTriangleEnemyMk1) {
                                enemy.destroy();
                            }
                            this.enemies.splice(j, 1);
                        }

                        this.bullets.splice(i, 1);
                        break; // Exit inner loop once bullet hits
                    }

                }
            }
        }

        // Enemy bullets vs player ship (new code)
        for (let i = this.enemyBullets.length - 1; i >= 0; i--) {
            const bullet = this.enemyBullets[i];
            const player = this.player;

            // Assuming player ship size roughly 30x30 (adjust if needed)
            if (
                bullet.x < player.x + 15 &&
                bullet.x + 4 > player.x - 15 &&
                bullet.y < player.y + 15 &&
                bullet.y + 10 > player.y - 15
            ) {
                player.takeDamage(bullet.damage); // reduce player's health by bullet.damage

                this.enemyBullets.splice(i, 1); // remove bullet on hit
            }
        }
    }
}
