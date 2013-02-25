/// <reference path="../lib/require.d.ts" />

import main = module("./Application");

require([], () => {
    var appMain = new main.Application();
    appMain.onCreate();
});
