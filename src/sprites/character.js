import Sprite from '../system/sprite.js';
import config from '../config.js';

export const states = {
    UP: {
        crop: {
            x: 0,
            y: config.TILE_SIZE * 7
        }
    },
    DOWN: {
        crop: {
            x: 0,
            y: config.TILE_SIZE * 4
        }
    },
    LEFT: {
        crop: {
            x: 0,
            y: config.TILE_SIZE * 5
        }
    },
    RIGHT: {
        crop: {
            x: 0,
            y: config.TILE_SIZE * 6
        }
    }
};

export default (resource) => new Sprite({
    resource,
    dimensions: {
        width: config.TILE_SIZE,
        heigth: config.TILE_SIZE
    },
    crop: states.UP.crop
})