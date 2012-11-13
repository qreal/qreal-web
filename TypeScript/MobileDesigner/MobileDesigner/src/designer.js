jQuery(function ($) {
    $('.toolbox').layout();
    $('.border').layout();
});
window.onload = function () {
    new Designer.PalleteController();
};
var Log;
(function (Log) {
    var LogManager = (function () {
        function LogManager(tag) {
            this.tag = tag;
        }
        LogManager.prototype.log = function (message) {
            console.log("(" + this.tag + ") " + message);
        };
        return LogManager;
    })();
    Log.LogManager = LogManager;    
})(Log || (Log = {}));

var Designer;
(function (Designer) {
    var PalleteController = (function () {
        function PalleteController() {
            var _this = this;
            var paletteButton = document.getElementById('paletteButton');
            var designer = document.getElementById('designer');
            paletteButton.onclick = function () {
                alert("Hello!");
            };
            paletteButton.ondragstart = function (ev) {
                return _this.drag(ev);
            };
            designer.ondrop = function (ev) {
                return _this.drop(ev);
            };
            designer.ondragover = function (ev) {
                return _this.allowDrop(ev);
            };
            PalleteController.log.log("in constructor");
        }
        PalleteController.log = new Log.LogManager("PalleteController");
        PalleteController.prototype.allowDrop = function (ev) {
            PalleteController.log.log("allowDrop");
            ev.preventDefault();
        };
        PalleteController.prototype.drag = function (ev) {
            PalleteController.log.log("drag");
        };
        PalleteController.prototype.drop = function (ev) {
            PalleteController.log.log("drop");
            ev.preventDefault();
            var button = $("<a>Button</a>");
            $('#designer').append(button);
            button.button();
        };
        return PalleteController;
    })();
    Designer.PalleteController = PalleteController;    
})(Designer || (Designer = {}));

