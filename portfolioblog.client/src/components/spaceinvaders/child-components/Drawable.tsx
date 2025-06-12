export abstract class Drawable {
    x: number;
    y: number;
    ctx: CanvasRenderingContext2D;
    age: number;


    constructor(x: number, y: number, ctx: CanvasRenderingContext2D) {
        this.x = x;
        this.y = y;
        this.ctx = ctx;
        this.age = 0;
    }

    abstract move(): void;
    abstract draw(): void;
}
