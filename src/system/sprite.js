export default class Sprite {

    constructor({
        resource,
        dimensions,
        crop = {
            x: 0,
            y: 0
        },
        position
    }) {
        this.resource = resource; 
        this.dimensions = dimensions;
        this.crop = crop;
        this.position = position;
    }

    render(ctx) {
        ctx.drawImage(
            this.resource,
            this.crop.x, this.crop.y,
            this.dimensions.width, this.dimensions.heigth,
            this.position.x, this.position.y,
            this.dimensions.width, this.dimensions.heigth
        );
    } 
}