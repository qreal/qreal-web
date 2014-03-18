define(["require", "exports"], function(require, exports) {
    var Log = (function () {
        function Log(tag) {
            this.logLevel = 1;
            this.tag = tag;
        }
        Log.prototype.Debug = function (message, obj) {
            if (typeof obj === "undefined") { obj = null; }
            if (obj) {
                this.DebugObj(obj, message);
            } else {
                this.Log(message, 'log');
            }
        };

        Log.prototype.DebugObj = function (obj, tag) {
            if (typeof tag === "undefined") { tag = "Object: "; }
            if (this.logLevel < 1) {
                return;
            }
            this.Debug(tag + String.fromCharCode(9660));
            console.log(obj);
        };

        Log.prototype.Error = function (message) {
            this.Log(message, 'error');
        };

        Log.prototype.Warn = function (message) {
            this.Log(message, 'warn');
        };

        Log.prototype.Log = function (message, method) {
            if (this.logLevel < 1) {
                return;
            }
            var date = new Date();
            console[method]("[" + date.toLocaleTimeString() + "." + date.getMilliseconds() + "] (" + this.tag + "): " + message);
        };
        return Log;
    })();

    
    return Log;
});
//# sourceMappingURL=Log.js.map
