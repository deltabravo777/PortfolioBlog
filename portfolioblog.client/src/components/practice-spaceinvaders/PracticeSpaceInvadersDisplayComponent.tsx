import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { MainInterface } from '../../models/main-interface/MainInterface';

// @ts-ignore
const PracticeSpaceInvacdersDisplayComponent = ({
    mainInterface,
    setMainInterface,
}: {
    mainInterface: MainInterface;
    setMainInterface: React.Dispatch<React.SetStateAction<MainInterface>>;
}) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const playerShipRef = useRef({ x: 180, y: 760 });
    const keyPressedRef = useRef<{ [key: string]: boolean }>({
        ArrowLeft: false,
        ArrowRight: false,
        ArrowUp: false,
        ArrowDown: false,
        a: false,
        d: false,
        w: false,
        s: false,
        Space: false,
    });

    const bulletsRef = useRef<Array<{ x: number; y: number }>>([]);
    const enemyBulletsRef = useRef<Array<{ x: number; y: number }>>([]);
    const greenEnemyRef = useRef<{ x: number; health: number; direction: number }>({
        x: 0,
        health: 50,
        direction: 1,
    });

    const purpleEnemiesRef = useRef<Array<{ x: number; y: number; health: number; direction: number }>>([]);
    const redTrianglesRef = useRef<Array<{ x: number; y: number; direction: number }>>([]);

    const [level, setLevel] = useState(1);

    // @ts-ignore: TS6133
    const [bulletSpeed, setBulletSpeed] = useState(20);

    const maxLevelTransitionRef = useRef(1);
    const redFireWavesRef = useRef(0);
    const redFireIntervalRef = useRef<NodeJS.Timeout | null>(null);

    const startLevel2 = () => {
        purpleEnemiesRef.current = [
            { x: -50, y: 60, health: 50, direction: 1 },
            { x: -120, y: 60, health: 50, direction: 1 },
        ];
        console.log('Level 2 started! Purple enemies:', purpleEnemiesRef.current);
    };

    const startLevel3 = () => {
        purpleEnemiesRef.current = [
            { x: -50, y: 60, health: 50, direction: 1 },
            { x: -120, y: 60, health: 50, direction: 1 },
            { x: -190, y: 60, health: 50, direction: 1 },
            { x: -260, y: 60, health: 50, direction: 1 },
            { x: -330, y: 60, health: 50, direction: 1 },
        ];
        console.log('Level 3 started! Purple enemies:', purpleEnemiesRef.current);
    };

    const startLevel4 = () => {
        redTrianglesRef.current = [
            { x: 10, y: -40, direction: 1 },
            { x: 60, y: -40, direction: 1 },
            { x: 110, y: -40, direction: 1 },
        ];
        redFireWavesRef.current = 0;

        redFireIntervalRef.current = setInterval(() => {
            if (redFireWavesRef.current >= 5) {
                if (redFireIntervalRef.current) {
                    clearInterval(redFireIntervalRef.current);
                }
                return;
            }

            redTrianglesRef.current.forEach((triangle) => {
                enemyBulletsRef.current.push({ x: triangle.x + 20, y: triangle.y + 40 });
            });

            redFireWavesRef.current += 1;
        }, 1000);

        console.log('Level 4 started! Red triangles:', redTrianglesRef.current);
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            if (level === 1) {
                drawGreenEnemy(ctx);
                if (greenEnemyRef.current.health <= 0 && maxLevelTransitionRef.current === 1) {
                    setLevel(2);
                    maxLevelTransitionRef.current = 2;
                    startLevel2();
                }
            } else if (level === 2) {
                drawPurpleEnemies(ctx);
                if (purpleEnemiesRef.current.length === 0 && maxLevelTransitionRef.current === 2) {
                    setLevel(3);
                    maxLevelTransitionRef.current = 3;
                    startLevel3();
                }
            } else if (level === 3) {
                drawPurpleEnemies(ctx);
                if (purpleEnemiesRef.current.length === 0 && maxLevelTransitionRef.current === 3) {
                    setLevel(4);
                    maxLevelTransitionRef.current = 4;
                    startLevel4();
                }
            } else if (level === 4) {
                drawRedTriangles(ctx);
            }

            drawPlayerShip(ctx);
            moveBullets(ctx);
            moveEnemyBullets(ctx);
            moveShip();

            animationFrameId = requestAnimationFrame(animate);
        };

        animationFrameId = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, [level]);

    const drawGreenEnemy = (ctx: CanvasRenderingContext2D) => {
        const size = 40;
        const speed = 2;
        const enemy = greenEnemyRef.current;

        enemy.x += speed * enemy.direction;
        if (enemy.x <= 0 || enemy.x >= canvasRef.current!.width - size) {
            enemy.direction *= -1;
        }

        ctx.fillStyle = 'lime';
        ctx.fillRect(enemy.x + 5, 5, size - 10, size - 10);

        const hpPercent = enemy.health / 50;
        ctx.fillStyle = 'red';
        ctx.fillRect(enemy.x + 5, 0, size - 10, 5);
        ctx.fillStyle = 'lime';
        ctx.fillRect(enemy.x + 5, 0, (size - 10) * hpPercent, 5);
    };

    const drawPurpleEnemies = (ctx: CanvasRenderingContext2D) => {
        const size = 40;
        const speed = 2;

        purpleEnemiesRef.current.forEach((enemy) => {
            if (enemy.x <= 0) {
                enemy.direction = 1;
            }

            enemy.x += speed * enemy.direction;

            if (enemy.x <= 0 || enemy.x >= canvasRef.current!.width - size) {
                enemy.direction *= -1;
            }

            ctx.fillStyle = 'plum';
            ctx.fillRect(enemy.x + 5, enemy.y, size - 10, size - 10);

            const hpPercent = enemy.health / 50;
            ctx.fillStyle = 'red';
            ctx.fillRect(enemy.x + 5, enemy.y - 10, size - 10, 5);
            ctx.fillStyle = 'lime';
            ctx.fillRect(enemy.x + 5, enemy.y - 10, (size - 10) * hpPercent, 5);
        });
    };

    const drawRedTriangles = (ctx: CanvasRenderingContext2D) => {
        const size = 40;
        const speed = 2;

        redTrianglesRef.current.forEach((triangle) => {
            if (triangle.y < 100) {
                triangle.y += speed * triangle.direction;
            } else {
                triangle.direction = 0;
            }

            ctx.fillStyle = 'red';
            ctx.beginPath();
            ctx.moveTo(triangle.x, triangle.y);
            ctx.lineTo(triangle.x + size, triangle.y);
            ctx.lineTo(triangle.x + size / 2, triangle.y + size);
            ctx.closePath();
            ctx.fill();
        });
    };

    const drawPlayerShip = (ctx: CanvasRenderingContext2D) => {
        const size = 30;
        const half = size / 2;
        const { x, y } = playerShipRef.current;

        ctx.fillStyle = 'gray';
        ctx.beginPath();
        ctx.moveTo(x, y - half);
        ctx.lineTo(x - half, y + half);
        ctx.lineTo(x + half, y + half);
        ctx.closePath();
        ctx.fill();
    };

    const moveShip = () => {
        const size = 30;
        const half = size / 2;
        const width = canvasRef.current!.width;
        const height = canvasRef.current!.height;

        if (keyPressedRef.current.ArrowLeft || keyPressedRef.current.a) {
            if (playerShipRef.current.x - half > 0) {
                playerShipRef.current.x -= 10;
            }
        }
        if (keyPressedRef.current.ArrowRight || keyPressedRef.current.d) {
            if (playerShipRef.current.x + half < width) {
                playerShipRef.current.x += 10;
            }
        }
        if (keyPressedRef.current.ArrowUp || keyPressedRef.current.w) {
            if (playerShipRef.current.y - half > 0) {
                playerShipRef.current.y -= 10;
            }
        }
        if (keyPressedRef.current.ArrowDown || keyPressedRef.current.s) {
            if (playerShipRef.current.y + half < height) {
                playerShipRef.current.y += 10;
            }
        }
    };

    const moveBullets = (ctx: CanvasRenderingContext2D) => {
        bulletsRef.current = bulletsRef.current.filter((b) => b.y > 0);

        bulletsRef.current.forEach((bullet) => {
            bullet.y -= bulletSpeed;
            ctx.fillStyle = 'white';
            ctx.fillRect(bullet.x, bullet.y, 5, 10);

            if (level === 1) {
                const enemy = greenEnemyRef.current;
                if (
                    bullet.x >= enemy.x + 5 &&
                    bullet.x <= enemy.x + 35 &&
                    bullet.y <= 45
                ) {
                    enemy.health -= 10;
                    bullet.y = -999;
                }
            }

            if (level === 2 || level === 3) {
                purpleEnemiesRef.current.forEach((enemy) => {
                    if (
                        bullet.x >= enemy.x + 5 &&
                        bullet.x <= enemy.x + 35 &&
                        bullet.y >= enemy.y &&
                        bullet.y <= enemy.y + 30
                    ) {
                        enemy.health -= 10;
                        bullet.y = -999;
                    }
                });
                purpleEnemiesRef.current = purpleEnemiesRef.current.filter((e) => e.health > 0);
            }
        });
    };

    const moveEnemyBullets = (ctx: CanvasRenderingContext2D) => {
        enemyBulletsRef.current = enemyBulletsRef.current.filter((b) => b.y < canvasRef.current!.height);

        enemyBulletsRef.current.forEach((bullet) => {
            bullet.y += 5;
            ctx.fillStyle = 'red';
            ctx.fillRect(bullet.x, bullet.y, 5, 10);
        });
    };

    const fireBullet = () => {
        const { x, y } = playerShipRef.current;
        bulletsRef.current.push({ x: x - 2.5, y: y - 20 });
    };

    //-- Autofire Bullets
    useEffect(() => {
        const autoFireInterval = setInterval(() => {
            fireBullet();
        }, 200);

        return () => clearInterval(autoFireInterval);
    }, []);

    //-- keyboard event listener
    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            keyPressedRef.current[e.key] = true;
            if (e.key === ' ' && !keyPressedRef.current.Space) {
                fireBullet();
                keyPressedRef.current.Space = true;
            }
        };

        const up = (e: KeyboardEvent) => {
            keyPressedRef.current[e.key] = false;
            if (e.key === ' ') keyPressedRef.current.Space = false;
        };

        window.addEventListener('keydown', down);
        window.addEventListener('keyup', up);
        return () => {
            window.removeEventListener('keydown', down);
            window.removeEventListener('keyup', up);
        };
    }, []);

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
                <div>Bullet Speed: {bulletSpeed}</div>
            </div>
        </div>
    );
};

export default PracticeSpaceInvacdersDisplayComponent;
