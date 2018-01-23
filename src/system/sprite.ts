import {DimensionsType, PointType} from './types';

export type SpriteConfigType = {
    resource: ImageData,
    dimensions: DimensionsType,
    crop?: PointType,
    position?: PointType
    flip?: boolean,
    flop?: boolean
}

export default class Sprite {

    private config: SpriteConfigType;

    private states;

    constructor(config: SpriteConfigType, states = {}) {
        this.config = {
            ...config,
            position: {
                x: 0,
                y: 0,
                ...config.position
            },
            crop: {
                x: 0,
                y: 0,
                ...config.crop
            }
        };

        this.states = states;
    }

    getStates() {
        return this.states;
    }

    setState(config: SpriteConfigType) {
        this.config = {
            ...this.config,
            ...config
        };
    }

    setPosition(position: PointType) {
        this.config.position = position;
    }

    render(ctx) {
        ctx.save();

        const {position, dimensions, crop} = this.config;

        const flipScale = this.config.flip ? -1 : 1;
        const flopScale = this.config.flop ? -1 : 1;

        ctx.translate(
            position.x + dimensions.width,
            position.y + dimensions.height
        );

        ctx.scale(flipScale, flopScale);

        ctx.drawImage(
            this.config.resource,
            crop.x, crop.y,
            dimensions.width, dimensions.height,
            0, 0,
            dimensions.width, dimensions.height
        );

        ctx.restore();
    } 
}
