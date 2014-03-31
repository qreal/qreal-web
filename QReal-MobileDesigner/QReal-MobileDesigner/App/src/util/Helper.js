define(["require", "exports"], function(require, exports) {
    function ArrayMove(array, from, to) {
        array.splice(to, 0, array.splice(from, 1)[0]);
    }
    exports.ArrayMove = ArrayMove;
});
//# sourceMappingURL=Helper.js.map
