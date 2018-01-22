export const KeyboardKeys = {
    W: 87,
    A: 65,
    S: 83,
    D: 68,
    UP: 38,
    DOWN: 40,
    RIGHT: 39,
    LEFT: 37
};

export default class KeyboardController {

    private activeKeys;

    constructor() {
        this.activeKeys = new Map();

        document.addEventListener('keydown', this.addActiveKey.bind(this));
        document.addEventListener('keyup', this.removeActiveKey.bind(this));
    }

    addActiveKey(e) {
        this.activeKeys.set(e.keyCode, e);
    }

    removeActiveKey(e) {
        this.activeKeys.delete(e.keyCode);
    }

    checkKeyPressed(keyCode) {
        return this.activeKeys.has(keyCode);
    }

    checkOneOfKeysPressed(keyCodes) {
        return keyCodes.some(keyCode => this.checkKeyPressed(keyCode));
    }
}