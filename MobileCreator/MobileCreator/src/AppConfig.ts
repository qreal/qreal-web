/// <reference path="../lib/require.d.ts" />

import main = module("./Application");

require([], () => {

    /*
    if (!window.console) window.console = new Console();
    var methods = ["log", "debug", "warn", "info"];
    for (var i = 0; i < methods.length; i++) {
        console[methods[i]] = function () { };
    }
    */

    var appMain = new main.Application();
    appMain.onCreate();
});