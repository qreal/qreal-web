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
//@ sourceMappingURL=Log.js.map
