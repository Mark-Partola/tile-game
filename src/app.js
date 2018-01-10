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

    let x = 0;
    loop(() => {
        ctx.resetTransform();
        ctx.clearRect(x, 0, WIDTH - x, HEIGHT);
        ctx.translate(x -= 2, 0);

        level.forEach((row, rowIdx) => row.forEach((cell, cellIdx) => {
            const tile = spriteMap.get(cell);
    
            tile.position = {
                x: cellIdx * TILE_SIZE,
                y: rowIdx * TILE_SIZE
            };
    
            tile.render(ctx);
        }));
    });
}

function loop(fn) {
    function run() {
        fn();
        requestAnimationFrame(run);
    }

    requestAnimationFrame(run);
}