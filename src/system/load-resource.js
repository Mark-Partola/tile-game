export default (path) => {
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
};
