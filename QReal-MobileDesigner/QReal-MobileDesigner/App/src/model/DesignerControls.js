var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "src/util/log/Log"], function(require, exports, Log) {
    var DesignerControls;
    (function (DesignerControls) {
        var BaseControl = (function () {
            /*
            private element: JQuery;
            public get Element(): JQuery {
            return this.element;
            }
            
            public set Element(value: JQuery) {
            this.element = value;
            }
            */
            function BaseControl(properties) {
                this.log = new Log("BaseControl");
                this.properties = properties;
            }
            Object.defineProperty(BaseControl.prototype, "Properties", {
                get: function () {
                    return this.properties;
                },
                enumerable: true,
                configurable: true
            });
            return BaseControl;
        })();
        DesignerControls.BaseControl = BaseControl;

        var BaseContainer = (function (_super) {
            __extends(BaseContainer, _super);
            function BaseContainer(properties) {
                _super.call(this, properties);
                this.childrens = [];
                this.log = new Log("BaseContainer");
            }
            Object.defineProperty(BaseContainer.prototype, "Childrens", {
                get: function () {
                    return this.childrens;
                },
                enumerable: true,
                configurable: true
            });
            return BaseContainer;
        })(BaseControl);
        DesignerControls.BaseContainer = BaseContainer;

        var Page = (function (_super) {
            __extends(Page, _super);
            function Page(properties) {
                _super.call(this, properties);
                this.log = new Log("Page");
            }
            Object.defineProperty(Page.prototype, "Header", {
                //private footer: BaseContainer<ControlProperty.HeaderProperty>;
                get: function () {
                    return this.header;
                },
                set: function (value) {
                    this.header = value;
                },
                enumerable: true,
                configurable: true
            });

            return Page;
        })(BaseContainer);
        DesignerControls.Page = Page;

        var Header = (function (_super) {
            __extends(Header, _super);
            function Header(properties) {
                _super.call(this, properties);
                this.log = new Log("Header");
            }
            return Header;
        })(BaseContainer);
        DesignerControls.Header = Header;

        var Button = (function (_super) {
            __extends(Button, _super);
            function Button(properties) {
                _super.call(this, properties);
                this.log = new Log("Button");
            }
            return Button;
        })(BaseControl);
        DesignerControls.Button = Button;

        var Input = (function (_super) {
            __extends(Input, _super);
            function Input(properties) {
                _super.call(this, properties);
                this.log = new Log("Input");
            }
            return Input;
        })(BaseControl);
        DesignerControls.Input = Input;
    })(DesignerControls || (DesignerControls = {}));

    
    return DesignerControls;
});
//# sourceMappingURL=DesignerControls.js.map
