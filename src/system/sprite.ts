import {DimensionsType, PointType} from './types';

export type SpriteArgumentsType = {
    resource: any,
    dimensions: DimensionsType,
    crop?: PointType,
    position?: PointType
}

export default class Sprite {

    private states;

    private resource;

    private dimensions;

    private crop;

    private position;

    constructor({
        resource,
        dimensions,
        crop = {
            x: 0,
            y: 0
        },
        position = {
            x: 0,
            y: 0
        }
    }: SpriteArgumentsType, states = {}) {
        this.states = states;
        this.resource = resource; 
        this.dimensions = dimensions;
        this.crop = crop;
        this.position = position;
    }

    getStates() {
        return this.states;
    }

    setState(state) {
        this.crop = state.crop;
    }

    setPosition(position) {
        this.position = position;
    }

    render(ctx) {
        ctx.drawImage(
            this.resource,
            this.crop.x, this.crop.y,
            this.dimensions.width, this.dimensions.height,
            this.position.x, this.position.y,
            this.dimensions.width, this.dimensions.height
        );
    } 
}
