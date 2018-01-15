export default class Entity {

    constructor() {
        this.components = [];
    }

    update() {
        throw new Error('Unimplemented exception');
    }

    render() {
        throw new Error('Unimplemented exception');
    }

    run(ctx) {
        this.update();
        this.render(ctx);
        this.components.forEach(component => component.run(ctx));
    }
}
