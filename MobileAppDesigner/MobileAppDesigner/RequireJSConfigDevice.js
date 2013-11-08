/// <reference path="src/modules/require.d.ts" />
define(["require", "exports", 'src/device/DeviceMain'], function(require, exports, __DeviceMain__) {
    var DeviceMain = __DeviceMain__;

    require([], function () {
        //alert("config");
        DeviceMain.Main();
    });
});
//# sourceMappingURL=RequireJSConfigDevice.js.map
