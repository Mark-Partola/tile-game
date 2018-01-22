export default class Entity {

    protected components;

    constructor() {
        this.components = [];
    }

    update() {
        throw new Error('Unimplemented exception');
    }

    render(ctx) {
        throw new Error('Unimplemented exception');
    }

    run(ctx: CanvasRenderingContext2D) {
        this.update();
        this.render(ctx);

        this.components.forEach(component => component.run(ctx));
    }
}
