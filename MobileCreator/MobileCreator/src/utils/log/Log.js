define(["require", "exports"], function(require, exports) {
    var Logger = (function () {
        function Logger(tag) {
            this.tag = tag;
        }
        Logger.prototype.log = function (message) {
            var date = new Date();
            console.log("[" + date.toLocaleTimeString() + "." + date.getMilliseconds() + "] (" + this.tag + "): " + message);
        };
        return Logger;
    })();
    exports.Logger = Logger;    
})
