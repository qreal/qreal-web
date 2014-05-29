var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "src/model/Enums"], function(require, exports, Enums) {
    var ControlProperty;
    (function (ControlProperty) {
        var Property = (function () {
            function Property(type, id) {
                this.Type = type;
                this.Id = id;
            }
            Object.defineProperty(Property.prototype, "Type", {
                get: function () {
                    return Enums.ControlType[this.type];
                },
                set: function (value) {
                    this.type = Enums.ControlType[value];
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(Property.prototype, "Id", {
                get: function () {
                    return this.id;
                },
                set: function (value) {
                    this.id = value;
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(Property.prototype, "$Id", {
                get: function () {
                    return '#' + this.Id;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Property.prototype, "Class", {
                get: function () {
                    return this.cssClass;
                },
                set: function (value) {
                    this.cssClass = value;
                },
                enumerable: true,
                configurable: true
            });

            return Property;
        })();
        ControlProperty.Property = Property;

        var AppProperty = (function (_super) {
            __extends(AppProperty, _super);
            function AppProperty(name, projectPackage) {
                _super.call(this, 0 /* App */, "");
                this.Name = name;
                this.ProjectPackage = projectPackage;
            }
            Object.defineProperty(AppProperty.prototype, "Name", {
                get: function () {
                    return this.name;
                },
                set: function (value) {
                    this.name = value;
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(AppProperty.prototype, "ProjectPackage", {
                get: function () {
                    return this.projectPackage;
                },
                set: function (value) {
                    this.projectPackage = value;
                },
                enumerable: true,
                configurable: true
            });

            return AppProperty;
        })(Property);
        ControlProperty.AppProperty = AppProperty;

        var PageProperty = (function (_super) {
            __extends(PageProperty, _super);
            function PageProperty(id) {
                _super.call(this, 1 /* Page */, id);
                this.header = false;
                this.theme = 'default';
                this.padding = '10px';
            }
            Object.defineProperty(PageProperty.prototype, "Padding", {
                get: function () {
                    return this.padding;
                },
                set: function (value) {
                    this.padding = value;
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(PageProperty.prototype, "Header", {
                get: function () {
                    return this.header;
                },
                set: function (value) {
                    this.header = value;
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(PageProperty.prototype, "Theme", {
                get: function () {
                    return this.theme;
                },
                set: function (value) {
                    this.theme = value;
                },
                enumerable: true,
                configurable: true
            });

            return PageProperty;
        })(Property);
        ControlProperty.PageProperty = PageProperty;

        var HeaderProperty = (function (_super) {
            __extends(HeaderProperty, _super);
            function HeaderProperty(id) {
                _super.call(this, 2 /* Header */, id);
                this.Title = 'Header';
            }
            Object.defineProperty(HeaderProperty.prototype, "Title", {
                get: function () {
                    return this.title;
                },
                set: function (value) {
                    this.title = value;
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(HeaderProperty.prototype, "Theme", {
                get: function () {
                    return this.theme;
                },
                set: function (value) {
                    this.theme = value;
                },
                enumerable: true,
                configurable: true
            });

            return HeaderProperty;
        })(Property);
        ControlProperty.HeaderProperty = HeaderProperty;

        var ButtonProperty = (function (_super) {
            __extends(ButtonProperty, _super);
            function ButtonProperty(id) {
                _super.call(this, 3 /* Button */, id);
                this.Text = "Button";
                this.Inline = false;
                this.Corners = true;
                this.Mini = false;
                this.Theme = 'default';
            }
            Object.defineProperty(ButtonProperty.prototype, "Text", {
                get: function () {
                    return this.text;
                },
                set: function (value) {
                    this.text = value;
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(ButtonProperty.prototype, "Inline", {
                get: function () {
                    return this.inline;
                },
                set: function (value) {
                    this.inline = value;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(ButtonProperty.prototype, "InlineString", {
                get: function () {
                    return this.inline ? "true" : "false";
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(ButtonProperty.prototype, "Corners", {
                get: function () {
                    return this.corners;
                },
                set: function (value) {
                    this.corners = value;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(ButtonProperty.prototype, "CornersString", {
                get: function () {
                    return this.corners ? "true" : "false";
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(ButtonProperty.prototype, "Mini", {
                get: function () {
                    return this.mini;
                },
                set: function (value) {
                    this.mini = value;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(ButtonProperty.prototype, "MiniString", {
                get: function () {
                    return this.mini ? "true" : "false";
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(ButtonProperty.prototype, "Theme", {
                get: function () {
                    return this.theme;
                },
                set: function (value) {
                    this.theme = value;
                },
                enumerable: true,
                configurable: true
            });

            return ButtonProperty;
        })(Property);
        ControlProperty.ButtonProperty = ButtonProperty;

        var InputProperty = (function (_super) {
            __extends(InputProperty, _super);
            function InputProperty(id) {
                _super.call(this, 4 /* Input */, id);
                this.Title = "Title";
                this.Inline = false;
                this.Corners = true;
                this.Mini = false;
                this.Theme = 'default';
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
        ControlProperty.InputProperty = InputProperty;

        var LabelProperty = (function (_super) {
            __extends(LabelProperty, _super);
            function LabelProperty(id) {
                _super.call(this, 6 /* Label */, id);
                this.Text = "Label";
                this.TextSize = '150%';
            }
            Object.defineProperty(LabelProperty.prototype, "Text", {
                get: function () {
                    return this.text;
                },
                set: function (value) {
                    this.text = value;
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(LabelProperty.prototype, "TextSize", {
                get: function () {
                    return this.textSize;
                },
                set: function (value) {
                    this.textSize = value;
                },
                enumerable: true,
                configurable: true
            });

            return LabelProperty;
        })(Property);
        ControlProperty.LabelProperty = LabelProperty;

        var ImageProperty = (function (_super) {
            __extends(ImageProperty, _super);
            function ImageProperty(id) {
                _super.call(this, 7 /* Image */, id);
                this.Url = "/Content/noimage.png";
                this.Width = '200px';
                this.Height = '200px';
            }
            Object.defineProperty(ImageProperty.prototype, "Url", {
                get: function () {
                    return this.url;
                },
                set: function (value) {
                    this.url = value;
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(ImageProperty.prototype, "Width", {
                get: function () {
                    return this.width;
                },
                set: function (value) {
                    this.width = value;
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(ImageProperty.prototype, "Height", {
                get: function () {
                    return this.height;
                },
                set: function (value) {
                    this.height = value;
                },
                enumerable: true,
                configurable: true
            });

            return ImageProperty;
        })(Property);
        ControlProperty.ImageProperty = ImageProperty;

        var MapProperty = (function (_super) {
            __extends(MapProperty, _super);
            function MapProperty(id) {
                _super.call(this, 5 /* Map */, id);
                this.Width = '100%';
                this.Height = '300px';
            }
            Object.defineProperty(MapProperty.prototype, "Width", {
                get: function () {
                    return this.width;
                },
                set: function (value) {
                    this.width = value;
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(MapProperty.prototype, "Height", {
                get: function () {
                    return this.height;
                },
                set: function (value) {
                    this.height = value;
                },
                enumerable: true,
                configurable: true
            });

            return MapProperty;
        })(Property);
        ControlProperty.MapProperty = MapProperty;

        var WebViewProperty = (function (_super) {
            __extends(WebViewProperty, _super);
            function WebViewProperty(id) {
                _super.call(this, 8 /* WebView */, id);
                this.Url = "http://qreal.ru/";
                this.Width = '100%';
                this.Height = '300px';
            }
            Object.defineProperty(WebViewProperty.prototype, "Url", {
                get: function () {
                    return this.url;
                },
                set: function (value) {
                    this.url = value;
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(WebViewProperty.prototype, "Width", {
                get: function () {
                    return this.width;
                },
                set: function (value) {
                    this.width = value;
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(WebViewProperty.prototype, "Height", {
                get: function () {
                    return this.height;
                },
                set: function (value) {
                    this.height = value;
                },
                enumerable: true,
                configurable: true
            });

            return WebViewProperty;
        })(Property);
        ControlProperty.WebViewProperty = WebViewProperty;
    })(ControlProperty || (ControlProperty = {}));

    
    return ControlProperty;
});
//# sourceMappingURL=ControlProperty.js.map
