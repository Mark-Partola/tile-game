import config from './config.js';
import KeyboardController, {KeyboardKeys} from './system/keyboard-controller.js';

const keyboardController = new KeyboardController();

export default class Character {

    constructor(sprite) {
        this.sprite = sprite;
        this.position = {
            x: 10 * config.TILE_SIZE,
            y: 15 * config.TILE_SIZE
        };
        this.speed = 0.5;
    }

    update() {
        const isGoUp = keyboardController.checkOneOfKeysPressed([KeyboardKeys.W, KeyboardKeys.UP]);
        const isGoDown = keyboardController.checkOneOfKeysPressed([KeyboardKeys.S, KeyboardKeys.DOWN]);
        const isGoLeft = keyboardController.checkOneOfKeysPressed([KeyboardKeys.A, KeyboardKeys.LEFT]);
        const isGoRight = keyboardController.checkOneOfKeysPressed([KeyboardKeys.D, KeyboardKeys.RIGHT]);

        const offset = {
            x: isGoLeft ? -this.speed : (isGoRight ? this.speed : 0),
            y: isGoUp ? -this.speed : (isGoDown ? this.speed : 0)
        };

        console.log(isGoUp, isGoRight);

        this.position = {
            x: this.position.x + offset.x,
            y: this.position.y + offset.y
        };

        this.sprite.position = this.position;
    }

    render(ctx) {
        this.sprite.render(ctx);
    }
}
