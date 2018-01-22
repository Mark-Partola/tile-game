import config from './config';
import loop from './system/loop';
import loadResource from './system/load-resource';
import MouseController from './system/mouse-controller';
import Entity from './system/entity';
import spritesLoader from './sprites/index';
import Character from './character';

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

    const mouseController = new MouseController();
    const character = new Character(sprites.character);

    class Game extends Entity {

        private offset;

        private prevPosition;

        constructor() {
            super();
 
            this.offset = {
                x: 0,
                y: 0
            };

            this.prevPosition = null;

            this.components = [character];
        }

        update() {
            const isMouseDown = mouseController.getIsMouseDown();

            if (isMouseDown) {
                const position = mouseController.getPosition(ctx.canvas);

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
        }

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
        }
    };

    /**
     * TODO: remove the Game class. Thing how to pass the ctx
     */
    const game = new Game();
    loop(game.run.bind(game, ctx));
}
