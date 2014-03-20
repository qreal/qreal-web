var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "src/util/log/Log", "src/model/Enums", "src/model/properties/InputProperty", "src/model/controls/BaseControl"], function(require, exports, Log, Enums, InputProperty, BaseControl) {
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

    
    return Input;
});
//# sourceMappingURL=Input.js.map
