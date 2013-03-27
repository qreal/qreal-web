import mAction = module("designer/logic/Action");
import mLinearLayout = module("designer/widgets/LinearLayout");
import mWidgetTypes = module("designer/widgets/WidgetTypes");
import mEditText = module("designer/widgets/EditText");
import mDesigner = module("designer/Designer");
import mActionTypes = module("designer/logic/ActionTypes");

export class LoginRequestAction extends mAction.Action {
    private url: string;
    private loginId: string;
    private passwordId: string;

    constructor(url: string) {
        super();
        this.ActionType = mActionTypes.ActionTypes.LoginRequest;
        this.url = url;
        var editTexts: string[] = this.findEditTexts();
        if (editTexts.length > 0) {
            this.loginId = editTexts[0];
            this.passwordId = editTexts[0];
        }
    }

    private findEditTexts(): string[] {
        var baseLayout: mLinearLayout.LinearLayout = <mLinearLayout.LinearLayout> mDesigner.Designer.activeForm.Content[0];
        var children = baseLayout.Children;
        var maps = []
        for (var i = 0; i < children.length; i++) {
            if (children[i].Preferences.WidgetType == mWidgetTypes.WidgetTypes.EditText) {
                maps.push((<mEditText.EditText> children[i]).Preferences.EditTextId);
            }
        }
        return maps;
    }

    public show(domElement) {
        var _this = this;
        var loginBlock = $("<a href='#' data-role='button' data-inline='true' data-mini='true'>Login: </a>");
        var editTexts: string[] = this.findEditTexts();
        var loginSelect = $("<select data-mini='true' data-inline='true'></select>");
        for (var i = 0; i < editTexts.length; i++) {
            var option = $("<option value='" + editTexts[i] + "'>" + editTexts[i] + "</option>");
            if (editTexts[i] == this.loginId) {
                option.attr("selected", "selected");
            }
            loginSelect.append(option);
        }
        domElement.append(loginBlock);
        domElement.append(loginSelect);
        loginBlock.button();
        loginSelect.selectmenu();
        var _loginSelect = loginSelect;
        loginSelect.mouseover(function () {
            _loginSelect.empty();
            var editTexts: string[] = _this.findEditTexts();
            for (var i = 0; i < editTexts.length; i++) {
                var option = $("<option value='" + editTexts[i] + "'>" + editTexts[i] + "</option>");
                if (editTexts[i] == _this.loginId) {
                    option.attr("selected", "selected");
                }
                _loginSelect.append(option);
            }
            _loginSelect.selectmenu("refresh", true);
        });
        loginSelect.change(function () {
            _this.loginId = _loginSelect.val();
        });

        var passwdBlock = $("<a href='#' data-role='button' data-inline='true' data-mini='true'>Passwd: </a>");
        editTexts = this.findEditTexts();
        var passSelect = $("<select data-mini='true' data-inline='true'></select>");
        for (var i = 0; i < editTexts.length; i++) {
            var option = $("<option value='" + editTexts[i] + "'>" + editTexts[i] + "</option>");
            if (editTexts[i] == this.passwordId) {
                option.attr("selected", "selected");
            }
            passSelect.append(option);
        }
        domElement.append(passwdBlock);
        domElement.append(passSelect);
        passwdBlock.button();
        passSelect.selectmenu();
        var _passSelect = passSelect;
        passSelect.mouseover(function () {
            _passSelect.empty();
            var editTexts: string[] = _this.findEditTexts();
            for (var i = 0; i < editTexts.length; i++) {
                var option = $("<option value='" + editTexts[i] + "'>" + editTexts[i] + "</option>");
                if (editTexts[i] == _this.passwordId) {
                    option.attr("selected", "selected");
                }
                _passSelect.append(option);
            }
            _passSelect.selectmenu("refresh", true);
        });
        passSelect.change(function () {
            _this.passwordId = _passSelect.val();
        });
    }

    get Url() {
        return this.url;
    }
    set Url(url: string) {
        this.url = url;
    }
    get LoginId() {
        return this.loginId;
    }
    set LoginId(loginId: string) {
        this.loginId = loginId;
    }
    get PasswordId() {
        return this.passwordId;
    }
    set PasswordId(passwordId: string) {
        this.passwordId = passwordId;
    }
    public toXML() {
        var xml = "<transition url='" + this.url + "' login-id='" + this.loginId + "' password-id='" + this.passwordId + "' />\n";
        return xml;
    }
}