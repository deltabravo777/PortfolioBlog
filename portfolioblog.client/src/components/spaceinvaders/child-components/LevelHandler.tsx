import { EnemyBullet } from './bullets/EnemyBullet';
import { Drawable } from './Drawable';
import { BrownBoxEnemy } from './enemy/BrownBoxEnemy';
import { GreenBoxEnemy } from './enemy/GreenBoxEnemy';
import { OrangeTriangleEnemyMk1 } from './enemy/OrangeTriangleEnemyMk1';
import { OrangeTriangleEnemyMk2 } from './enemy/OrangeTriangleEnemyMk2';
import { PinkTriangleEnemy } from './enemy/PinkTriangleEnemy';
import { PinkTriangleEnemyMk2 } from './enemy/PinkTriangleEnemyMk2';
import { YellowBoxEnemyMk1 } from './enemy/YellowBoxEnemyMk1';
//import { EnemyBullet } from './EnemyBullet';
//import { EnemyBulletMk1 } from './EnemyBulletMk1';
import { PlayerShip } from './PlayerShip';
//import { GreenBoxEnemy } from './GreenBoxEnemy';
//import { PinkTriangleEnemy } from './PinkTriangleEnemy';

export class LevelHandler {
    ctx: CanvasRenderingContext2D;
    enemies: Drawable[];
    enemyBullets: EnemyBullet[];
    setLevel: React.Dispatch<React.SetStateAction<number>>;
    setLevelTriggered: React.Dispatch<React.SetStateAction<boolean>>;
    playerShip: PlayerShip;

    constructor(
        ctx: CanvasRenderingContext2D,
        enemies: Drawable[],
        enemyBullets: EnemyBullet[],
        setLevel: React.Dispatch<React.SetStateAction<number>>,
        setLevelTriggered: React.Dispatch<React.SetStateAction<boolean>>,
        playerShip: PlayerShip
    ) {
        this.ctx = ctx;
        this.enemies = enemies;
        this.enemyBullets = enemyBullets;
        this.setLevel = setLevel;
        this.setLevelTriggered = setLevelTriggered;
        this.playerShip = playerShip
    }

    StartLevel1() {
        const enemy = new GreenBoxEnemy(0, 100, this.ctx);
        this.enemies.push(enemy);
    }

    //promisedSetState = (newState: any) =>
    //    new Promise((resolve) => this.setLevel(newState, resolve));


    fastforwardLevels: boolean = false;

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
                if (!this.fastforwardLevels) this.StartLevel2();
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
                if (!this.fastforwardLevels) this.StartLevel3();
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
                if (!this.fastforwardLevels) this.StartLevel4();
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
                if (!this.fastforwardLevels) this.StartLevel5();
                this.setLevelTriggered(false);
            }
            else if (enemies.length == 0) {
                this.setLevel(6);
                this.setLevelTriggered(true);
            }
        }
        else if (currentLevel == 6) {
            if (currentLevelTriggered == true) {
                console.log(`Level 6 enemies dispatching`);
                if (!this.fastforwardLevels) this.StartLevel6();
                this.setLevelTriggered(false);
            }
            else if (enemies.length == 0) {
                this.setLevel(7);
                this.setLevelTriggered(true);
            }
        }
        else if (currentLevel == 7) {
            if (currentLevelTriggered == true) {
                console.log(`Level 7 enemies dispatching`);
                this.StartLevel7();
                this.setLevelTriggered(false);
            }
            else if (enemies.length == 0) {
                this.setLevel(8);
                this.setLevelTriggered(true);
            }
        }
        else if (currentLevel == 8) {
            if (currentLevelTriggered == true) {
                console.log(`Level 8 enemies dispatching`);
                this.StartLevel8();
                this.setLevelTriggered(false);
            }
            else if (enemies.length == 0) {
                this.setLevel(9);
                this.setLevelTriggered(true);
            }
        }
        else if (currentLevel == 9) {
            if (currentLevelTriggered == true) {
                console.log(`Level 9 enemies dispatching`);
                this.StartLevel9();
                this.setLevelTriggered(false);
            }
            else if (enemies.length == 0) {
                this.setLevel(10);
                this.setLevelTriggered(true);
            }
        }
        else if (currentLevel == 10) {
            if (currentLevelTriggered == true) {
                console.log(`Level 10 enemies dispatching`);
                this.StartLevel10();
                this.setLevelTriggered(false);
            }
            else if (enemies.length == 0) {
                this.setLevel(11);
                this.setLevelTriggered(true);
            }
        }
        else if (currentLevel == 11) {
            if (currentLevelTriggered == true) {
                console.log(`Level 11 enemies dispatching`);
                this.StartLevel11();
                this.setLevelTriggered(false);
            }
            else if (enemies.length == 0) {
                this.setLevel(12);
                this.setLevelTriggered(true);
            }
        }
    }

    StartLevel2() {
        this.enemies.length = 0;

        const spacing = 60;
        const startX = -spacing * 5;
        const y = 100;

        for (let i = 0; i < 5; i++) {
            const x = startX + i * spacing;
            const enemy = new GreenBoxEnemy(x, y, this.ctx);
            this.enemies.push(enemy);
        }
    }

    StartLevel3() {
        this.enemies.length = 0;

        const spacing = 40;
        const startY = -30;
        const startX = 10;

        for (let i = 0; i < 3; i++) {
            const x = startX + i * spacing;
            const y = startY;
            const enemy = new PinkTriangleEnemy(x, y, this.ctx, this.enemyBullets);
            this.enemies.push(enemy);
        }
    }

    StartLevel4() {
        this.enemies.length = 0;

        const spacing = 40;
        const startY = -30;
        const canvasWidth = 400;
        const enemyWidth = 30;
        const offset = 15;

        for (let i = 0; i < 3; i++) {
            const x = canvasWidth - (enemyWidth + i * spacing) - offset;
            const y = startY;
            const enemy = new PinkTriangleEnemy(x, y, this.ctx, this.enemyBullets);
            this.enemies.push(enemy);
        }
    }

    StartLevel5() {
        this.enemies.length = 0;

        const startX = -120;
        const y = 60;

        OrangeTriangleEnemyMk1.uniformDirection = 1;

        for (let i = 0; i < 3; i++) {
            const x = startX + i * 40;
            const enemy = new OrangeTriangleEnemyMk1(
                x, y, this.ctx, this.enemyBullets, 130, 100
            );
            this.enemies.push(enemy);
        }

        this.setLevel(5);
        this.setLevelTriggered(true);
    }

    StartLevel6() {
        this.enemies.length = 0;

        const startX1 = -120;
        const y1 = 60;

        OrangeTriangleEnemyMk2.waveDirections[1] = 1;
        OrangeTriangleEnemyMk2.waveGroups[1] = [];

        for (let i = 0; i < 3; i++) {
            const x = startX1 + i * 40;
            const enemy = new OrangeTriangleEnemyMk2(
                x, y1, this.ctx, this.enemyBullets, 130, 100, 1
            );
            OrangeTriangleEnemyMk2.waveGroups[1].push(enemy);
            this.enemies.push(enemy);
        }

        const startX2 = -200;
        const y2 = 120;

        OrangeTriangleEnemyMk2.waveDirections[2] = 1;
        OrangeTriangleEnemyMk2.waveGroups[2] = [];

        for (let i = 0; i < 3; i++) {
            const x = startX2 + i * 40;
            const enemy = new OrangeTriangleEnemyMk2(
                x, y2, this.ctx, this.enemyBullets, 130, 100, 2
            );
            OrangeTriangleEnemyMk2.waveGroups[2].push(enemy);
            this.enemies.push(enemy);
        }

        this.setLevel(6);
        this.setLevelTriggered(true);
    }

    StartLevel7() {
        this.enemies.length = 0;

        const x = -50;
        const y = 80;

        const enemy = new BrownBoxEnemy(x, y, this.ctx, this.playerShip, this.enemyBullets);
        this.enemies.push(enemy);
    }

    StartLevel8() {
        this.enemies.length = 0;

        const canvasWidth = this.ctx.canvas.width;
        const canvasHeight = this.ctx.canvas.height;

        for (let i = 0; i < 3; i++) {
            const startX = -40;
            const x = startX - (i * 50);
            const y = 50 + (i * 50);
            const enemy = new BrownBoxEnemy(x, y, this.ctx, this.playerShip, this.enemyBullets);
            this.enemies.push(enemy);
        }
    }

    StartLevel9() {
        this.enemies.length = 0;

        const canvasWidth = this.ctx.canvas.width;
        const startX = canvasWidth / 2 - 15;
        const startY = -40;

        const boss = new PinkTriangleEnemyMk2(startX, startY, this.ctx, this.playerShip, this.enemyBullets, 100);
        this.enemies.push(boss);
    }

    StartLevel10() {
        const yellowEnemy = new YellowBoxEnemyMk1(
            -50, // x center coordinate
            100, // y center coordinate
            this.ctx,
            this.playerShip,
            this.enemyBullets
        );

        this.enemies.length = 0;
        this.enemies.push(yellowEnemy);
    }
    
    StartLevel11() {
        const canvasWidth = this.ctx.canvas.width;
        const startX = canvasWidth / 2 - 15; // center each triangle (30px width assumed)

        this.enemies.length = 0; // clear previous enemies

        for (let i = 0; i < 3; i++) {
            const yOffset = -60 * (i + 1); // position enemies above screen, spaced vertically
            const triangle = new PinkTriangleEnemyMk2(
                startX,
                yOffset,
                this.ctx,
                this.playerShip,
                this.enemyBullets,
                200
            );
            this.enemies.push(triangle);
        }

    }


}
