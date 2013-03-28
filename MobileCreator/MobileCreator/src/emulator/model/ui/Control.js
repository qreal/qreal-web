define(["require", "exports", "emulator/model/attributes/ControlTag"], function(require, exports, __mControlTag__) {
    var mControlTag = __mControlTag__;

    var Control = (function () {
        function Control(tag, $control) {
            this.$Control = $control;
            this.Tag = tag;
            this.$Control.attr('id', tag.Id);
            this.setMargins();
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
        Control.prototype.setDimensions = function ($element) {
            if (typeof $element === "undefined") { $element = this.$Control; }
            switch(this.Tag.Width) {
                case mControlTag.ControlTag.WrapContent:
                    $element.css("width", "auto");
                    break;
                case mControlTag.ControlTag.MatchParrent:
                    $element.css("width", "100%");
                    break;
                default:
                    $element.css("width", this.Tag.Width + "px");
                    break;
            }
            switch(this.Tag.Height) {
                case mControlTag.ControlTag.WrapContent:
                    $element.css("height", "auto");
                    break;
                case mControlTag.ControlTag.MatchParrent:
                    $element.css("height", "100%");
                    break;
                default:
                    $element.css("height", this.Tag.Height + "px");
                    break;
            }
        };
        Control.prototype.setMargins = function ($element) {
            if (typeof $element === "undefined") { $element = this.$Control; }
            $element.css({
                'margin-left': this.Tag.MarginLeft + 'px',
                'margin-right': this.Tag.MarginRight + 'px',
                'margin-top': this.Tag.MarginTop + 'px',
                'margin-bottom': this.Tag.MarginBottom + 'px'
            });
        };
        return Control;
    })();
    exports.Control = Control;    
})
