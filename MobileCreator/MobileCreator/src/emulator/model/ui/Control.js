define(["require", "exports", "emulator/model/attributes/ControlTag"], function(require, exports, __mControlTag__) {
    var mControlTag = __mControlTag__;

    var Control = (function () {
        function Control(tag, $control) {
            this.$Control = $control;
            this.Tag = tag;
            this.$Control.attr('id', tag.Id);
            this.$Control.css({
                'text-align': tag.Gravity
            });
        }
        Object.defineProperty(Control.prototype, "$Control", {
            get: function () {
                return this.$control;
            },
            set: function (value) {
                this.$control = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Control.prototype, "Tag", {
            get: function () {
                return this.tag;
            },
            set: function (value) {
                this.tag = value;
            },
            enumerable: true,
            configurable: true
        });
        Control.prototype.create = function () {
        };
        Control.prototype.setDimensions = function ($element) {
            if (typeof $element === "undefined") { $element = this.$Control; }
            switch(this.Tag.Width) {
                case mControlTag.ControlTag.WrapContent:
                    break;
                case mControlTag.ControlTag.MatchParrent:
                    $element.css("width", "inherit");
                    break;
                default:
                    $element.css("width", this.Tag.Width + "px");
                    break;
            }
            switch(this.Tag.Height) {
                case mControlTag.ControlTag.WrapContent:
                    break;
                case mControlTag.ControlTag.MatchParrent:
                    $element.css("height", "inherit");
                    break;
                default:
                    $element.css("height", this.Tag.Height + "px");
                    break;
            }
        };
        return Control;
    })();
    exports.Control = Control;    
})
