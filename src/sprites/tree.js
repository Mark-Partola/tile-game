import Sprite from '../system/sprite.js';
import config from '../config.js';

export default (resource) => new Sprite({
    resource,
    dimensions: {
        width: config.TILE_SIZE,
        heigth: config.TILE_SIZE
    },
    crop: {
        x: config.TILE_SIZE * 14,
        y: config.TILE_SIZE * 13
    }
});
