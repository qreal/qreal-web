define(["require", "exports"], function(require, exports) {
    var Control = (function () {
        function Control(id) {
            this.id = id;
        }
        Control.prototype.getElement = function () {
            return $("Control");
        };
        Control.prototype.create = function () {
        };
        return Control;
    })();
    exports.Control = Control;    
})
