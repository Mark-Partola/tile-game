import loop from './loop.js';

const WIDTH = 1024;
const HEIGHT = 724;

const canvas = document.createElement('canvas');
canvas.width = WIDTH;
canvas.height = HEIGHT;
canvas.classList.add('game');

document.body.appendChild(canvas);

const ctx = canvas.getContext('2d');

function loadResource (path) {
    const type = path.split('.').pop();
    
    if (type === 'json') {
        return fetch(path).then(response => response.json());
    }

    return new Promise((resolve, reject) => {
        const sprite = new Image();
        sprite.onload = () => resolve(sprite);
        sprite.onerror = reject;
        sprite.src = `../${path}`;
    });
}

const TILE_SIZE = 32;

class Sprite {

    constructor({
        resource,
        dimensions = {
            width: TILE_SIZE,
            heigth: TILE_SIZE
        },
        crop = {
            x: 0,
            y: 0
        },
        position
    }) {
        this.resource = resource; 
        this.dimensions = dimensions;
        this.crop = crop;
        this.position = position;
    }

    render(ctx) {
        ctx.drawImage(
            this.resource,
            this.crop.x, this.crop.y,
            this.dimensions.width, this.dimensions.heigth,
            this.position.x, this.position.y,
            this.dimensions.width, this.dimensions.heigth
        );
    } 
}

Promise.all([
    loadResource('assets/images/sprite.png'),
    loadResource('assets/levels/1.json')
])
    .then(init)
    .catch((e) => console.log('Error ocurred!', e));

function init([sprite, level]) {
    const ground = new Sprite({
        resource: sprite,
        crop: {
            x: TILE_SIZE * 41,
            y: TILE_SIZE * 2
        }
    });

    const grass = new Sprite({
        resource: sprite,
        crop: {
            x: TILE_SIZE * 29,
            y: TILE_SIZE * 8
        }
    });

    const water = new Sprite({
        resource: sprite,
        crop: {
            x: TILE_SIZE * 28,
            y: TILE_SIZE * 4
        }
    });
 
    const tree = new Sprite({
        resource: sprite,
        crop: {
            x: TILE_SIZE * 14,
            y: TILE_SIZE * 13
        }
    });

    const spriteMap = new Map();
    spriteMap.set(0, ground);
    spriteMap.set(1, grass);
    spriteMap.set(2, water);
    spriteMap.set(3, tree);

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

    const mouseController = new MouseController();

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
                WIDTH,
                HEIGHT
            );
            ctx.translate(this.offset.x, this.offset.y);

            function renderTile(cell, pos) {
                if (Array.isArray(cell)) {
                    cell.forEach(tile => renderTile(tile, pos));
                } else {
                    const tile = spriteMap.get(cell);
                    tile.position = {
                        x: pos.x * TILE_SIZE,
                        y: pos.y * TILE_SIZE
                    };
            
                    tile.render(ctx);
                }
            }
    
            level.forEach((row, rowIdx) => row.forEach((cell, cellIdx) =>
                renderTile(cell, {x: cellIdx, y: rowIdx})
            ));
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
