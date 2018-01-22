import loadResource from '../system/load-resource';
import characterSprite from './character';
import grassSprite from './grass';
import groundSprite from './ground';
import treeSprite from './tree';
import waterSprite from './water';

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
