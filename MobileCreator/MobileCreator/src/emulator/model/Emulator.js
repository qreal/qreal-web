define(["require", "exports"], function(require, exports) {
    var Emulator = (function () {
        function Emulator() {
        }
        Emulator.instance = new Emulator();
        Emulator.prototype.createView = function () {
        };
        return Emulator;
    })();
    exports.Emulator = Emulator;    
})
