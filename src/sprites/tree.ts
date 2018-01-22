import Sprite from '../system/sprite';
import config from '../config';

export default (resource) => new Sprite({
    resource,
    dimensions: {
        width: config.TILE_SIZE,
        height: config.TILE_SIZE
    },
    crop: {
        x: config.TILE_SIZE * 14,
        y: config.TILE_SIZE * 13
    }
});
