define(["require", "exports", "app/classes/Greeter"], function(require, exports, __gt__) {
    var gt = __gt__;

    var App = (function () {
        function App() {
        }
        App.Main = function () {
            // code from window.onload
            var el = document.getElementById('content');
            var greeter = new gt.Greeter(el);
            greeter.start();
        };
        return App;
    })();
    exports.App = App;
});
//# sourceMappingURL=AppMain.js.map
