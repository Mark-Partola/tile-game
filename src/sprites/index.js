import loadResource from '../system/load-resource.js';
import characterSprite from './character.js';
import grassSprite from './grass.js';
import groundSprite from './ground.js';
import treeSprite from './tree.js';
import waterSprite from './water.js';

export default {
    init: () => Promise.all([
        loadResource('assets/images/sprite.png'),
        loadResource('assets/images/characters.png')
    ]).then(([spriteResource, charactersResource]) => ({
        character: characterSprite(charactersResource),
        grass: grassSprite(spriteResource),
        ground: groundSprite(spriteResource),
        tree: treeSprite(spriteResource),
        water: waterSprite(spriteResource),
    }))
};
