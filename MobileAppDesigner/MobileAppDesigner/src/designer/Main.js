///<reference path="../modules/jquery.d.ts" />
///<reference path="../modules/jquery.tmpl.d.ts" />
define(["require", "exports", "src/designer/Controller", "src/util/log/Log"], function(require, exports, __Controller__, __Log__) {
    var Controller = __Controller__;
    var Log = __Log__;

    var Main = (function () {
        function Main() {
        }
        Main.Main = function () {
            Main.log.Debug("Main");
            Controller.Instance.Init();
        };
        Main.log = new Log("DesignerMain");
        return Main;
    })();

    
    return Main;
});
//# sourceMappingURL=Main.js.map
