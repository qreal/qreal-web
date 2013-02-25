var Log = require("./utils/log/log")
alert("test1");
window.onload = function () {
    var logger = new Log.LogManager("App");
    logger.log("loaded");
    alert("test2");
};
