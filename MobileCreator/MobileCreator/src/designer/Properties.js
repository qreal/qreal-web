define(["require", "exports"], function(require, exports) {
    var PropertiesEditor = (function () {
        function PropertiesEditor(domElement) {
            if (typeof domElement === "undefined") { domElement = $("<div></div>"); }
            this.domElement = domElement;
            this.init();
        }
        Object.defineProperty(PropertiesEditor.prototype, "DomElement", {
            get: function () {
                return this.domElement;
            },
            set: function (domElement) {
                this.domElement = domElement;
            },
            enumerable: true,
            configurable: true
        });
        PropertiesEditor.prototype.init = function () {
            var header = $("<div data-role='header'></div>");
        };
        return PropertiesEditor;
    })();
    exports.PropertiesEditor = PropertiesEditor;    
})
