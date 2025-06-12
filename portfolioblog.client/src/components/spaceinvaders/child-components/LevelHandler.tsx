import { Drawable } from './Drawable';
import { GreenBoxEnemy } from './enemy/GreenBoxEnemy';
import { OrangeTriangleEnemyMk1 } from './enemy/OrangeTriangleEnemyMk1';
import { PinkTriangleEnemy } from './enemy/PinkTriangleEnemy';
import { EnemyBullet } from './EnemyBullet';
import { EnemyBulletMk1 } from './EnemyBulletMk1';
//import { GreenBoxEnemy } from './GreenBoxEnemy';
//import { PinkTriangleEnemy } from './PinkTriangleEnemy';

export class LevelHandler {
    ctx: CanvasRenderingContext2D;
    enemies: Drawable[];
    enemyBullets: EnemyBullet[];
    setLevel: React.Dispatch<React.SetStateAction<number>>;
    setLevelTriggered: (newLevelTriggered: boolean) => void;

    constructor(
        ctx: CanvasRenderingContext2D,
        enemies: Drawable[],
        enemyBullets: EnemyBullet[],
        setLevel: React.Dispatch<React.SetStateAction<number>>,
        setLevelTriggered: (newLevelTriggered: boolean) => void
    ) {
        this.ctx = ctx;
        this.enemies = enemies;
        this.enemyBullets = enemyBullets;
        this.setLevel = setLevel;
        this.setLevelTriggered = setLevelTriggered;
    }

    StartLevel1() {
        const enemy = new GreenBoxEnemy(0, 100, this.ctx);
        this.enemies.push(enemy);
    }

    //promisedSetState = (newState: any) =>
    //    new Promise((resolve) => this.setLevel(newState, resolve));


    checkLevelProgress(currentLevel: number, currentLevelTriggered: boolean, enemies: Drawable[]) {
        //console.log(`current level is ${currentLevel}`)
        if (currentLevel === 1) {
            if (enemies.length === 0) {
                //console.warn(`the change is going to be made`);
                this.setLevel(prevState => prevState + 1);
                this.setLevelTriggered(true);
            }
        }
        else if (currentLevel === 2) {
            if (currentLevelTriggered === true) {
                console.log(`Level 2 enemies dispatched`);
                this.StartLevel2();
                this.setLevelTriggered(false);
            }
            else if (enemies.length == 0) {
                this.setLevel(3);
                this.setLevelTriggered(true);
            }
        }
        else if (currentLevel == 3) {
            if (currentLevelTriggered == true) {
                console.log(`Level 3 enemies dispatched`);
                this.StartLevel3();
                this.setLevelTriggered(false);
            }
            else if (enemies.length == 0) {
                this.setLevel(4);
                this.setLevelTriggered(true);
            }
        }
        else if (currentLevel == 4) {
            if (currentLevelTriggered == true) {
                console.log(`Level 4 enemies dispatching`);
                this.StartLevel4();
                this.setLevelTriggered(false);
            }
            else if (enemies.length == 0) {
                this.setLevel(5);
                this.setLevelTriggered(true);
            }
        }
        else if (currentLevel == 5) {
            if (currentLevelTriggered == true) {
                console.log(`Level 5 enemies dispatching`);
                this.StartLevel5();
                this.setLevelTriggered(false);
            }
            //else if (enemies.length == 0) {
            //    this.setLevel(6);
            //    this.setLevelTriggered(true);
            //}
        }
    }

    StartLevel2() {
        const spacing = 60; // space between enemies
        const startX = -spacing * 5; // start further left for offscreen entry
        const y = 100;

        for (let i = 0; i < 5; i++) {
            const x = startX + i * spacing;
            const enemy = new GreenBoxEnemy(x, y, this.ctx);
            this.enemies.push(enemy);
        }
    }

    StartLevel3() {
        const spacing = 40; // space between enemies
        const startY = -30; // start above the visible canvas
        const startX = 10;  // initial x offset from the left edge

        for (let i = 0; i < 3; i++) {
            const x = startX + i * spacing;
            const y = startY;
            const enemy = new PinkTriangleEnemy(x, y, this.ctx, this.enemyBullets);
            this.enemies.push(enemy);
        }
    }

    StartLevel4() {
        const spacing = 40; // space between enemies
        const startY = -30; // start above the visible canvas
        const canvasWidth = 400; // assuming canvas width is 400
        const enemyWidth = 30; // width of one PinkTriangleEnemy
        const offset = 15; // shift all enemies left by 30 units

        for (let i = 0; i < 3; i++) {
            const x = canvasWidth - (enemyWidth + i * spacing) - offset;
            const y = startY;
            const enemy = new PinkTriangleEnemy(x, y, this.ctx, this.enemyBullets);
            this.enemies.push(enemy);
        }
    }

    StartLevel5() {
        const startX = -120; // Small left offset
        const y = 60; // Vertical position on screen

        OrangeTriangleEnemyMk1.uniformDirection = 1;
        OrangeTriangleEnemyMk1.mostLeft = Number.MAX_SAFE_INTEGER;
        OrangeTriangleEnemyMk1.mostRight = Number.MIN_SAFE_INTEGER;

        for (let i = 0; i < 3; i++) {
            const x = startX + i * 40; // 30 width + 10 space
            const enemy = new OrangeTriangleEnemyMk1(
                x,
                y,
                this.ctx,
                this.enemyBullets,
                130,
                100
            );
            this.enemies.push(enemy);
        }

        this.setLevel(5);
        this.setLevelTriggered(true);
    }


}
