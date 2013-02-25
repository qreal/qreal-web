define(["require", "exports", "./Application"], function(require, exports, __main__) {
    var main = __main__;

    require([], function () {
        var appMain = new main.Application();
        appMain.onCreate();
    });
})
