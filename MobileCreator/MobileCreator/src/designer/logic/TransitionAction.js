var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "designer/logic/Action", "designer/Designer", "designer/logic/ActionTypes"], function(require, exports, __mAction__, __mDesigner__, __mActionTypes__) {
    var mAction = __mAction__;

    var mDesigner = __mDesigner__;

    var mActionTypes = __mActionTypes__;

    var TransitionAction = (function (_super) {
        __extends(TransitionAction, _super);
        function TransitionAction(formId) {
                _super.call(this);
            this.ActionType = mActionTypes.ActionTypes.Transition;
            this.formId = formId;
        }
        Object.defineProperty(TransitionAction.prototype, "FormId", {
            get: function () {
                return this.formId;
            },
            set: function (formId) {
                this.formId = formId;
            },
            enumerable: true,
            configurable: true
        });
        TransitionAction.prototype.toXML = function () {
            var xml = "<transition form-id='" + this.formId + "' />\n";
            return xml;
        };
        TransitionAction.prototype.show = function (domElement) {
            var _this = this;
            var saveSessionBlock = $("<a href='#' data-role='button' data-corners='false' data-inline='true' data-mini='true'>Go to form </a>");
            saveSessionBlock.css("margin-right", "6px");
            var formNames = mDesigner.Designer.formNames;
            var select = $("<select data-mini='true' data-inline='true'></select>");
            var selectedOption = $("<option value='" + this.formId + "' selected='selected'>" + this.formId + "</option>");
            select.append(selectedOption);
            domElement.append(saveSessionBlock);
            domElement.append(select);
            saveSessionBlock.button();
            select.selectmenu();
            var _select = select;
            select.mouseover(function () {
                _select.empty();
                for(var i = 0; i < formNames.length; i++) {
                    var option = $("<option value='" + formNames[i] + "'>" + formNames[i] + "</option>");
                    if(_this.formId == formNames[i]) {
                        option.attr("selected", "selected");
                    }
                    _select.append(option);
                }
                _select.selectmenu("refresh", true);
            });
            select.change(function () {
                _this.formId = _select.val();
            });
        };
        return TransitionAction;
    })(mAction.Action);
    exports.TransitionAction = TransitionAction;    
})
//@ sourceMappingURL=TransitionAction.js.map
