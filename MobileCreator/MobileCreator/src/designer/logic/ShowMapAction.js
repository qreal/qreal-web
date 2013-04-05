var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "designer/logic/Action", "designer/Designer", "designer/widgets/WidgetTypes", "designer/logic/ActionTypes"], function(require, exports, __mAction__, __mDesigner__, __mWidgetTypes__, __mActionTypes__) {
    var mAction = __mAction__;

    var mDesigner = __mDesigner__;

    
    var mWidgetTypes = __mWidgetTypes__;

    
    
    var mActionTypes = __mActionTypes__;

    var ShowMapAction = (function (_super) {
        __extends(ShowMapAction, _super);
        function ShowMapAction(controlId) {
                _super.call(this);
            this.ActionType = mActionTypes.ActionTypes.ShowMap;
            this.controlId = controlId;
            var maps = this.findMaps();
            if(maps.length > 0) {
                this.controlId = maps[0];
            }
        }
        ShowMapAction.prototype.findMaps = function () {
            var baseLayout = mDesigner.Designer.activeForm.Content[0];
            var children = baseLayout.Children;
            var maps = [];
            for(var i = 0; i < children.length; i++) {
                if(children[i].Preferences.WidgetType == mWidgetTypes.WidgetTypes.Map) {
                    maps.push((children[i]).Preferences.MapId);
                }
            }
            return maps;
        };
        ShowMapAction.prototype.show = function (domElement) {
            var _this = this;
            var showMapBlock = $("<a href='#' data-role='button' data-corners='false' data-inline='true' data-mini='true'>Show map on </a>");
            showMapBlock.css("margin-right", "6px");
            var maps = this.findMaps();
            var select = $("<select data-mini='true' data-inline='true'></select>");
            for(var i = 0; i < maps.length; i++) {
                var option = $("<option value='" + maps[i] + "'>" + maps[i] + "</option>");
                if(maps[i] == this.controlId) {
                    option.attr("selected", "selected");
                }
                select.append(option);
            }
            domElement.append(showMapBlock);
            domElement.append(select);
            showMapBlock.button();
            select.selectmenu();
            var _select = select;
            select.mouseover(function () {
                _select.empty();
                var maps = _this.findMaps();
                for(var i = 0; i < maps.length; i++) {
                    var option = $("<option value='" + maps[i] + "'>" + maps[i] + "</option>");
                    if(maps[i] == _this.controlId) {
                        option.attr("selected", "selected");
                    }
                    _select.append(option);
                }
                _select.selectmenu("refresh", true);
            });
            select.change(function () {
                _this.controlId = _select.val();
            });
        };
        Object.defineProperty(ShowMapAction.prototype, "ControlId", {
            get: function () {
                return this.controlId;
            },
            set: function (controlId) {
                this.controlId = controlId;
            },
            enumerable: true,
            configurable: true
        });
        ShowMapAction.prototype.toXML = function () {
            var xml = "<showmap id='" + this.controlId + "' />\n";
            return xml;
        };
        return ShowMapAction;
    })(mAction.Action);
    exports.ShowMapAction = ShowMapAction;    
})
//@ sourceMappingURL=ShowMapAction.js.map
