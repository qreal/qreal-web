//import gt = require("app/classes/Greeter");
define(["require", "exports"], function(require, exports) {
    var App = (function () {
        function App() {
        }
        App.Main = function () {
            // code from window.onload
            //var el = document.getElementById('content');
            //var greeter = new gt.Greeter(el);
            //greeter.start();
            alert("Main");
        };
        return App;
    })();

    
    return App;
});
//# sourceMappingURL=AppMain.js.map
