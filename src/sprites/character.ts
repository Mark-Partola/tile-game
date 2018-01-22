import {assocPath} from 'ramda';
import Sprite, {SpriteArgumentsType} from '../system/sprite';
import config from '../config';

export default (resource) => {
    const defaultSprite: SpriteArgumentsType = {
        resource,
        dimensions: {
            width: config.TILE_SIZE,
            height: config.TILE_SIZE
        },
        crop: {
            x: 0,
            y: 0
        }
    };

    const setCropY = y => assocPath(['crop', 'y'], y, defaultSprite);

    const states = {
        UP: setCropY(config.TILE_SIZE * 7),
        DOWN: setCropY(config.TILE_SIZE * 4),
        LEFT: setCropY(config.TILE_SIZE * 5),
        RIGHT: setCropY(config.TILE_SIZE * 6)
    };

    return new Sprite(states.UP, states);
}