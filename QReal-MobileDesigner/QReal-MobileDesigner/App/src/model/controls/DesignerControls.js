var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "src/Application", "src/util/log/Log", "src/model/Enums", "src/model/properties/ButtonProperty", "src/model/properties/InputProperty", "src/model/properties/PageProperty"], function(require, exports, App, Log, Enums, ButtonProperty, InputProperty, PageProperty) {
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


            BaseControl.prototype.ChangeProperty = function (propertyId, propertyType, newValue) {
            };
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
            function Page(id) {
                _super.call(this, new PageProperty(id));
                this.log = new Log("Page");
            }
            Page.prototype.OnDrop = function (event) {
                this.log.Debug("OnDrop, event: ", event);
                event.preventDefault();
                var controlId = event.originalEvent.dataTransfer.getData("Text");
                var control = App.Instance.Device.ControlManager.CreateControl(controlId);
                this.Childrens.push(control);
                this.Element.append(control.Element);
                //control.Element.trigger('create');
                //$('#' + this.Properties.Id).trigger('create');
            };

            Page.prototype.OnDragOver = function (e) {
                //this.log.Debug("OnDragOver");
                e.preventDefault();
            };
            return Page;
        })(BaseContainer);
        DesignerControls.Page = Page;

        var Button = (function (_super) {
            __extends(Button, _super);
            function Button(id) {
                _super.call(this, new ButtonProperty(id));
                this.log = new Log("Button");
            }
            Button.prototype.ChangeProperty = function (propertyId, propertyType, newValue) {
                switch (propertyType) {
                    case 1 /* Id */:
                        this.Properties.Id = newValue;
                        this.Element.attr('id', newValue);
                        break;
                    case 0 /* Text */:
                        this.log.Debug("Enums.PropertyType.Text:", this.Element);
                        this.Element.find('.ui-btn-text').text(newValue);
                        break;
                    case 2 /* Inline */:
                        var cond = newValue == "true";
                        this.Element.buttonMarkup({ inline: cond });
                        break;
                    case 3 /* Corners */:
                        var cond = newValue == "true";
                        this.Element.buttonMarkup({ corners: cond });
                        break;
                    case 4 /* Mini */:
                        var cond = newValue == "true";
                        this.Element.buttonMarkup({ mini: cond });
                        break;
                    case 5 /* Theme */:
                        this.Element.buttonMarkup({ theme: newValue });
                        break;
                }
            };
            return Button;
        })(BaseControl);
        DesignerControls.Button = Button;

        var Input = (function (_super) {
            __extends(Input, _super);
            function Input(id) {
                _super.call(this, new InputProperty(id));
                this.log = new Log("Input");
            }
            Input.prototype.ChangeProperty = function (propertyId, propertyType, newValue) {
                switch (propertyType) {
                    case 1 /* Id */:
                        this.Properties.Id = newValue;
                        this.Element.find('input').attr('id', newValue);
                        break;
                    case 6 /* Title */:
                        this.Element.find('label').text(newValue);
                        break;
                    case 4 /* Mini */:
                        var cond = newValue == "true";

                        break;
                    case 5 /* Theme */:
                        break;
                }
            };
            return Input;
        })(BaseControl);
        DesignerControls.Input = Input;
    })(DesignerControls || (DesignerControls = {}));

    
    return DesignerControls;
});
//# sourceMappingURL=DesignerControls.js.map
