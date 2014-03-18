///<reference path="../modules/jquery.d.ts" />
///<reference path="../modules/jquery.tmpl.d.ts" />
define(["require", "exports", "src/designer/Controller", "src/util/log/Log"], function(require, exports, __Controller__, __Log__) {
    var Controller = __Controller__;
    var Log = __Log__;

    var App = (function () {
        function App() {
        }
        App.Main = function () {
            App.log.Debug("Main");
            Controller.Instance.Init();
        };

        App.prototype.test = function () {
            alert('test');
        };
        App.log = new Log("App");
        return App;
    })();

    
    return App;
});
//# sourceMappingURL=AppMain.js.map
