var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "src/model/properties/Property", "src/model/Enums"], function(require, exports, Property, Enums) {
    var InputProperty = (function (_super) {
        __extends(InputProperty, _super);
        function InputProperty(id) {
            _super.call(this, 3 /* Input */, id);
            this.Title = "Title";
            this.Inline = false;
            this.Corners = true;
            this.Mini = false;
            this.Theme = 'c';
            this.Placeholder = '';
            this.Name = '';
        }
        Object.defineProperty(InputProperty.prototype, "Title", {
            get: function () {
                return this.title;
            },
            set: function (value) {
                this.title = value;
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(InputProperty.prototype, "Inline", {
            get: function () {
                return this.inline;
            },
            set: function (value) {
                this.inline = value;
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(InputProperty.prototype, "Corners", {
            get: function () {
                return this.corners;
            },
            set: function (value) {
                this.corners = value;
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(InputProperty.prototype, "Mini", {
            get: function () {
                return this.mini;
            },
            set: function (value) {
                this.mini = value;
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(InputProperty.prototype, "Theme", {
            get: function () {
                return this.theme;
            },
            set: function (value) {
                this.theme = value;
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(InputProperty.prototype, "Placeholder", {
            get: function () {
                return this.placeholder;
            },
            set: function (value) {
                this.placeholder = value;
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(InputProperty.prototype, "Name", {
            get: function () {
                return this.name;
            },
            set: function (value) {
                this.name = value;
            },
            enumerable: true,
            configurable: true
        });

        return InputProperty;
    })(Property);

    
    return InputProperty;
});
//# sourceMappingURL=InputProperty.js.map
