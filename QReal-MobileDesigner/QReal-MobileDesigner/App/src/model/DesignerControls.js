var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "src/Application", "src/util/log/Log"], function(require, exports, App, Log) {
    var DesignerControls;
    (function (DesignerControls) {
        var BaseControl = (function () {
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

            Object.defineProperty(BaseControl.prototype, "Element", {
                get: function () {
                    return this.element;
                },
                set: function (value) {
                    this.element = value;
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

            BaseContainer.prototype.Create = function () {
                this.log.Error("This method should not be used");
                return $("");
            };

            BaseContainer.prototype.CreateForDesigner = function () {
                this.log.Error("This method should not be used");
                return $("");
            };
            return BaseContainer;
        })(BaseControl);
        DesignerControls.BaseContainer = BaseContainer;

        var Page = (function (_super) {
            __extends(Page, _super);
            function Page(properties) {
                _super.call(this, properties);
                this.log = new Log("Page");
            }
            Page.prototype.OnDrop = function (event) {
                this.log.Debug("OnDrop, event: ", event);
                event.preventDefault();
                var controlId = event.originalEvent.dataTransfer.getData("Text");
                var control = App.Instance.Device.ControlManager.CreateControl(controlId);
                this.Childrens.push(control);
                this.Element.append(control.Element);
            };

            Page.prototype.OnDragOver = function (e) {
                e.preventDefault();
            };
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
