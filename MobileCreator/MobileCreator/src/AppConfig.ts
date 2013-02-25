/// <reference path="../lib/require.d.ts" />

import main = module("./Application");

require(["../lib/jquery-1.8.2.min.js"], (jquery) => {
    console.log("in require");
    var appMain = new main.Application();
    appMain.onCreate();
});