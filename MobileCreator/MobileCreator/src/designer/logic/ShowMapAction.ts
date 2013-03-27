import mAction = module("designer/logic/Action");
import mDesigner = module("designer/Designer");
import mElement = module("designer/widgets/Element");
import mWidgetTypes = module("designer/widgets/WidgetTypes");
import mMap = module("designer/widgets/Map");
import mLinearLayout = module("designer/widgets/LinearLayout");
import mActionTypes = module("designer/logic/ActionTypes");

export class ShowMapAction extends mAction.Action {
    private controlId: string;

    constructor(controlId: string) {
        super();
        this.ActionType = mActionTypes.ActionTypes.ShowMap;
        this.controlId = controlId;
        var maps: string[] = this.findMaps();
        if (maps.length > 0) {
            this.controlId = maps[0];
        }
    }

    private findMaps(): string[] {
        var baseLayout: mLinearLayout.LinearLayout = <mLinearLayout.LinearLayout> mDesigner.Designer.activeForm.Content[0];
        var children = baseLayout.Children;
        var maps = []
        for (var i = 0; i < children.length; i++) {
            if (children[i].Preferences.WidgetType == mWidgetTypes.WidgetTypes.Map) {
                maps.push((<mMap.Map> children[i]).Preferences.MapId);
            }
        }
        return maps;
    }

    public show(domElement) {
        var _this = this;
        var showMapBlock = $("<a href='#' data-role='button' data-inline='true' data-mini='true'>Show map on </a>");
        var maps: string[] = this.findMaps();
        var select = $("<select data-mini='true' data-inline='true'></select>");
        for (var i = 0; i < maps.length; i++) {
            var option = $("<option value='" + maps[i] + "'>" + maps[i] + "</option>");
            if (maps[i] == this.controlId) {
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
            var maps: string[] = _this.findMaps();
            for (var i = 0; i < maps.length; i++) {
                var option = $("<option value='" + maps[i] + "'>" + maps[i] + "</option>");
                if (maps[i] == _this.controlId) {
                    option.attr("selected", "selected");
                }
                _select.append(option);
            }
            _select.selectmenu("refresh", true);
        });
        select.change(function () {
            _this.controlId = _select.val();
        });
    }

    get ControlId() {
        return this.controlId;
    }
    set ControlId(controlId: string) {
        this.controlId = controlId;
    }
    public toXML() {
        var xml = "<showmap id='" + this.controlId + "' />\n";
        return xml;
    }
}