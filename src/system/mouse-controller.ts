export default class MouseController {

    private isMouseDown;

    private mousemove;

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

    getPosition(canvas) {
        const box = canvas.getBoundingClientRect();

        return {
            x: this.mousemove.pageX - box.left,
            y: this.mousemove.pageY - box.top
        };
    }
}
