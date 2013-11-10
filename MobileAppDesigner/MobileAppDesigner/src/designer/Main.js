///<reference path="../modules/jquery.d.ts" />
///<reference path="../modules/jquery.tmpl.d.ts" />
define(["require", "exports", "src/util/log/Log"], function(require, exports, __Log__) {
    
    var Log = "src/util/log/Log";

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
