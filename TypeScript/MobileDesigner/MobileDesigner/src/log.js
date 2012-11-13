(function (Log) {
    var LogManager = (function () {
        function LogManager(tag) {
            this.tag = tag;
        }
        LogManager.prototype.log = function (message) {
            console.log("(" + this.tag + ") " + message);
        };
        return LogManager;
    })();
    Log.LogManager = LogManager;    
})(exports.Log || (exports.Log = {}));


