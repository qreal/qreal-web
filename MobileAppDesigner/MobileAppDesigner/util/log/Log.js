define(["require", "exports"], function(require, exports) {
    var Log = (function () {
        function Log(tag) {
            this.logLevel = 1;
            this.tag = tag;
        }
        Log.prototype.Debug = function (message) {
            if (this.logLevel < 1) {
                return;
            }
            var date = new Date();
            console.log("[" + date.toLocaleTimeString() + "." + date.getMilliseconds() + "] (" + this.tag + "): " + message);
        };
        return Log;
    })();

    
    return Log;
});
