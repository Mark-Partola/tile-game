import config from './config';
import KeyboardController, {KeyboardKeys} from './system/keyboard-controller';
import Entity from './system/entity';

const keyboardController = new KeyboardController();

export default class Character extends Entity {

    private sprite;

    private position;

    private speed;

    constructor(sprite) {
        super();

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

        /**
         * TODO: fix accelerating on hypotenuse
         */
        const offset = {
            x: isGoLeft ? -this.speed : (isGoRight ? this.speed : 0),
            y: isGoUp ? -this.speed : (isGoDown ? this.speed : 0)
        };

        this.position = {
            x: this.position.x + offset.x,
            y: this.position.y + offset.y
        };

        const states = this.sprite.getStates();

        if (isGoLeft) this.sprite.setState(states.LEFT);
        else if (isGoRight) this.sprite.setState(states.RIGHT);
        else if (isGoUp) this.sprite.setState(states.UP);
        else if (isGoDown) this.sprite.setState(states.DOWN);

        this.sprite.setPosition(this.position);
    }

    render(ctx) {
        this.sprite.render(ctx);
    }
}
