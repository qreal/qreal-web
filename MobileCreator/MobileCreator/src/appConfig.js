define(["require", "exports", "./Application"], function(require, exports, __main__) {
    var main = __main__;

    require([
        "../lib/jquery-1.8.2.min.js"
    ], function (jquery) {
        console.log("in require");
        var appMain = new main.Application();
        appMain.onCreate();
    });
})
