define(["require", "exports", "src/designer/controller/Controller", "util/log/Log"], function(require, exports, __Controlller__, __Log__) {
    var Controlller = __Controlller__;
    var Log = __Log__;

    var App = (function () {
        function App() {
        }
        App.Main = function () {
            App.log.Debug("Main");
            Controlller.Instance.Init();
        };
        App.log = new Log("App");
        return App;
    })();

    
    return App;
});
