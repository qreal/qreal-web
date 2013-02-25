define(["require", "exports"], function(require, exports) {
    var Logger = (function () {
        function Logger(tag) {
            this.tag = tag;
        }
        Logger.prototype.log = function (message) {
            console.log("(" + this.tag + ") " + message);
        };
        return Logger;
    })();
    exports.Logger = Logger;    
})
