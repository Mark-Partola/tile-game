export default (fn) => {
    function run() {
        fn();
        requestAnimationFrame(run);
    }

    requestAnimationFrame(run);
};
