/// <reference path="src/modules/require.d.ts" />
define(["require", "exports", 'src/designer/Main'], function(require, exports, __Main__) {
    var Main = __Main__;

    require([], function () {
        //alert("config");
        Main.Main();
    });
});
//# sourceMappingURL=RequireJsConfigDesigner.js.map
