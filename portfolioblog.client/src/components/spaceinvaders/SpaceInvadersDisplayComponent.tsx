import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { MainInterface } from '../../models/main-interface/MainInterface';
import { PlayerShip } from './child-components/PlayerShip';
import { Drawable } from './child-components/Drawable';
import { LevelHandler } from './child-components/LevelHandler';
import { CollisionHandler } from './child-components/CollisionHandler';
import { Bullet } from './child-components/bullets/Bullet';
import { Enemy } from './child-components/enemy/Enemy';
import { EnemyBullet } from './child-components/bullets/EnemyBullet';

// @ts-ignore: TS6133
const SpaceInvadersDisplayComponent = ({
    mainInterface,
    setMainInterface,
}: {
    mainInterface: MainInterface;
    setMainInterface: React.Dispatch<React.SetStateAction<MainInterface>>;
}) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [playerShip, setPlayerShip] = useState<PlayerShip | null>(null);
    const [bullets, setBullets] = useState<Bullet[]>([]); // Bullets state
    const [enemyBullets, setEnemyBullets] = useState<EnemyBullet[]>([]);
    const [enemies, setEnemies] = useState<Enemy[]>([]); // Enemies state
    const [level, setLevel] = useState<number>(1); // Level state
    const [levelTriggered, setLevelTriggered] = useState<boolean>(false); // Level state
    const [levelHandler, setLevelHandler] = useState<LevelHandler | null>(null); // LevelHandler state
    const [collisionHandler, setCollisionHandler] = useState<CollisionHandler | null>(null); // CollisionHandler state

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Initialize PlayerShip
        const ship = new PlayerShip(180, 760, ctx, bullets);
        setPlayerShip(ship);

        // Initialize LevelHandler and start Level 1
        const handler = new LevelHandler(ctx, enemies, enemyBullets, setLevel, setLevelTriggered, ship);
        handler.StartLevel1();
        setLevelHandler(handler);

        // Initialize CollisionHandler
        const collHandler = new CollisionHandler(bullets, enemies, enemyBullets, ship as PlayerShip);
        setCollisionHandler(collHandler);

        const handleKeyDown = (e: KeyboardEvent) => {
            ship.keyPressed[e.key] = true;
        };

        const handleKeyUp = (e: KeyboardEvent) => {
            ship.keyPressed[e.key] = false;
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []); // Run this effect only once, on mount

    useEffect(() => {
        if (!playerShip || !levelHandler || !collisionHandler) return;

        let animationFrameId: number;

        const animate = () => {
            const canvas = canvasRef.current;
            if (!canvas) return;

            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas

            if (playerShip.health > 0) {

                playerShip.move();
                playerShip.draw();

                bullets.forEach(bullet => {
                    bullet.move();
                    bullet.draw();
                });

                enemies.forEach(enemy => {
                    enemy.move();
                    enemy.draw();
                    enemy.checkShoot();
                });

                enemyBullets.forEach(enemyBullet => {
                    enemyBullet.move();
                    enemyBullet.draw();
                });

                // Collision detection
                collisionHandler.CalculateCollisions();

                // Level progression check
                levelHandler.checkLevelProgress(level, levelTriggered, enemies);
            }
            else {
                ctx.fillStyle = 'white';
                ctx.font = '30px sans-serif';
                ctx.textAlign = 'center';
                ctx.fillText('Game Over', canvas.width / 2, canvas.height / 2);
            }


            animationFrameId = requestAnimationFrame(animate);
        };

        animationFrameId = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, [level, levelTriggered, playerShip, bullets, enemies, levelHandler, collisionHandler]); // Include collisionHandler

    return (
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start' }}>
            <canvas
                ref={canvasRef}
                width={400}
                height={800}
                style={{ border: '2px solid white', backgroundColor: 'black' }}
            />
            <div style={{ color: 'black', marginLeft: 16 }}>
                <div>Level: {level}</div>
            </div>
        </div>
    );
};

export default SpaceInvadersDisplayComponent;
