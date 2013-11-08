/// <reference path="src/modules/require.d.ts" />

import DeviceMain = require('src/device/DeviceMain');

require([], function () {
    //alert("config");
    DeviceMain.Main();
});