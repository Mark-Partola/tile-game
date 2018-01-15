import config from './config.js';
import loop from './system/loop.js';
import loadResource from './system/load-resource.js';
import spritesLoader from './sprites/index.js';

const canvas = document.createElement('canvas');
canvas.width = config.APP_WIDTH;
canvas.height = config.APP_HEIGHT;
canvas.classList.add('game');

document.body.appendChild(canvas);

const ctx = canvas.getContext('2d');

Promise.all([
    spritesLoader.init(),
    loadResource('assets/levels/1.json')
])
    .then(init)
    .catch((e) => console.log('Error ocurred!', e));

function init([sprites, level]) {
    const spriteMap = new Map();
    spriteMap.set(0, sprites.ground);
    spriteMap.set(1, sprites.grass);
    spriteMap.set(2, sprites.water);
    spriteMap.set(3, sprites.tree);

    class MouseController {

        constructor() {
            this.isMouseDown = false;
            this.mousemove = null;

            document.addEventListener('mousedown', (e) => this.isMouseDown = true);
            document.addEventListener('mouseup', (e) => this.isMouseDown = false);
            document.addEventListener('mousemove', (e) => this.mousemove = e);
        }
        
        getIsMouseDown() {
            return this.isMouseDown;
        }
    
        getPosition() {
            const box = ctx.canvas.getBoundingClientRect();
            return {
                x: this.mousemove.pageX - box.left,
                y: this.mousemove.pageY - box.top
            };
        }
    }

    const KeyboardKeys = {
        W: 87,
        A: 31,
        S: 33,
        D: 30
    };

    class KeyboardController {

        constructor() {
            this.activeKey = null;

            document.addEventListener('keydown', (e) => this.activeKey = e);
            document.addEventListener('keyup', (e) => this.activeKey = null);
        }

        isPressedKey(key) {
            return (this.activeKey && this.activeKey.keyCode === key) || false;
        }
    }

    const mouseController = new MouseController();
    const keyboardController = new KeyboardController();

    const game = {

        offset: {
            x: 0,
            y: 0
        },

        prevPosition: null,

        update() {
            const isMouseDown = mouseController.getIsMouseDown();

            if (isMouseDown) {
                const position = mouseController.getPosition();

                if (this.prevPosition) {
                    this.offset = {
                        x: this.offset.x + (position.x - this.prevPosition.x),
                        y: this.offset.y + (position.y - this.prevPosition.y)
                    };
                }

                this.prevPosition = position;
            } else {
                this.prevPosition = null;
            }
        },

        render(ctx) {
            ctx.resetTransform();
            ctx.clearRect(
                0,
                0,
                config.APP_WIDTH,
                config.APP_HEIGHT
            );
            ctx.translate(this.offset.x, this.offset.y);

            function renderTile(cell, pos) {
                if (Array.isArray(cell)) {
                    cell.forEach(tile => renderTile(tile, pos));
                } else {
                    const tile = spriteMap.get(cell);
                    tile.position = {
                        x: pos.x * config.TILE_SIZE,
                        y: pos.y * config.TILE_SIZE
                    };
            
                    tile.render(ctx);
                }
            }
    
            level.forEach((row, rowIdx) => row.forEach((cell, cellIdx) =>
                renderTile(cell, {x: cellIdx, y: rowIdx})
            ));

            const isGoUp = keyboardController.isPressedKey(KeyboardKeys.W);
        
            sprites.character.position = {
                x: config.TILE_SIZE * 5,
                y: config.TILE_SIZE * 5 + (isGoUp ? -5 : 0)
            };
            sprites.character.render(ctx);
        },

        run() {
            loop(() => {
                this.update();
                this.render(ctx);
            });
        }
    };

    game.run();
}
