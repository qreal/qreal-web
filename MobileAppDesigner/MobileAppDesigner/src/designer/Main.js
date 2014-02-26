///<reference path="../modules/jquery.d.ts" />
///<reference path="../modules/jquery.tmpl.d.ts" />
define(["require", "exports", "src/designer/Designer", "src/util/log/Log", "src/Application"], function(require, exports, Designer, Log, App) {
    var Main = (function () {
        function Main() {
        }
        Main.Main = function () {
            Main.log.Debug("Main");
            if (!window['app']) {
                window['app'] = App.Instance;
            } else {
                App.Instance = window['app'];
            }
            App.Instance.Designer = new Designer();
            App.Instance.Designer.Init();
        };
        Main.log = new Log("DesignerMain");
        return Main;
    })();

    
    return Main;
});
//# sourceMappingURL=Main.js.map
