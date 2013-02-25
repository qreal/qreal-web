define(["require", "exports"], function(require, exports) {
    var LogManager = (function () {
        function LogManager(tag) {
            this.tag = tag;
        }
        LogManager.prototype.log = function (message) {
            console.log("(" + this.tag + ") " + message);
        };
        return LogManager;
    })();
    exports.LogManager = LogManager;    
})
