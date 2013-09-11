define(["require", "exports", "app/classes/Controller"], function(require, exports, __Controlller__) {
    var Controlller = __Controlller__;

    var App = (function () {
        function App() {
        }
        App.Main = function () {
            Controlller.Instance.Init();
        };
        return App;
    })();

    
    return App;
});
