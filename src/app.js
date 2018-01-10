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

    const spriteMap = new Map();
    spriteMap.set(0, ground);
    spriteMap.set(1, grass);

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

    let offset = {
        x: 0,
        y: 0
    };

    let isPrevMouseDown = false;
    let prevPosition;

    const game = {

        update() {
            const isMouseDown = mouseController.getIsMouseDown();

            if (isMouseDown) {
                const position = mouseController.getPosition();

                console.log(prevPosition, position);
                if (isPrevMouseDown) {
                    offset = {
                        x: (position.x - offset.x) + prevPosition.x,
                        y: (position.y - offset.y) + prevPosition.y
                    };
                }

                isPrevMouseDown = true;
                prevPosition = offset;
            } else {
                isPrevMouseDown = false;
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
            ctx.translate(offset.x, offset.y);
    
            level.forEach((row, rowIdx) => row.forEach((cell, cellIdx) => {
                const tile = spriteMap.get(cell);
    
                tile.position = {
                    x: cellIdx * TILE_SIZE,
                    y: rowIdx * TILE_SIZE
                };
        
                tile.render(ctx);
            }));
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
