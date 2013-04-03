var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "designer/logic/Action", "designer/widgets/WidgetTypes", "designer/Designer", "designer/logic/ActionTypes"], function(require, exports, __mAction__, __mWidgetTypes__, __mDesigner__, __mActionTypes__) {
    var mAction = __mAction__;

    
    var mWidgetTypes = __mWidgetTypes__;

    
    var mDesigner = __mDesigner__;

    var mActionTypes = __mActionTypes__;

    var LoginRequestAction = (function (_super) {
        __extends(LoginRequestAction, _super);
        function LoginRequestAction(url) {
                _super.call(this);
            this.ActionType = mActionTypes.ActionTypes.LoginRequest;
            this.url = url;
            var editTexts = this.findEditTexts();
            if(editTexts.length > 0) {
                this.loginId = editTexts[0];
                this.passwordId = editTexts[0];
            }
        }
        LoginRequestAction.prototype.showLogin = function (domElement, removeButton, marginLeft) {
            var _this = this;
            var loginDiv = $("<div data-role='controlgroup' data-type='horizontal' data-mini='true'></div>");
            loginDiv.css("margin-left", marginLeft + "px");
            var loginBlock = $("<a href='#' data-role='button' data-corners='false' data-inline='true' data-mini='true'>Login: </a>");
            var editTexts = this.findEditTexts();
            var loginSelect = $("<select data-mini='true' data-inline='true'></select>");
            for(var i = 0; i < editTexts.length; i++) {
                var option = $("<option value='" + editTexts[i] + "'>" + editTexts[i] + "</option>");
                if(editTexts[i] == this.loginId) {
                    option.attr("selected", "selected");
                }
                loginSelect.append(option);
            }
            loginDiv.append(loginBlock);
            loginDiv.append(loginSelect);
            loginBlock.button();
            loginSelect.selectmenu();
            var _loginSelect = loginSelect;
            loginSelect.mouseover(function () {
                _loginSelect.empty();
                var editTexts = _this.findEditTexts();
                for(var i = 0; i < editTexts.length; i++) {
                    var option = $("<option value='" + editTexts[i] + "'>" + editTexts[i] + "</option>");
                    if(editTexts[i] == _this.loginId) {
                        option.attr("selected", "selected");
                    }
                    _loginSelect.append(option);
                }
                _loginSelect.selectmenu("refresh", true);
            });
            loginSelect.change(function () {
                _this.loginId = _loginSelect.val();
            });
            removeButton.button();
            loginDiv.append(removeButton);
            domElement.append(loginDiv);
            var passwordDiv = $("<div data-role='controlgroup' data-type='horizontal' data-mini='true'></div>");
            passwordDiv.css("margin-left", marginLeft + "px");
            var passwdBlock = $("<a href='#' data-role='button' data-corners='false' data-inline='true' data-mini='true'>Passwd: </a>");
            editTexts = this.findEditTexts();
            var passSelect = $("<select data-mini='true' data-inline='true'></select>");
            for(var i = 0; i < editTexts.length; i++) {
                var option = $("<option value='" + editTexts[i] + "'>" + editTexts[i] + "</option>");
                if(editTexts[i] == this.passwordId) {
                    option.attr("selected", "selected");
                }
                passSelect.append(option);
            }
            passwordDiv.append(passwdBlock);
            passwordDiv.append(passSelect);
            passwdBlock.button();
            passSelect.selectmenu();
            var _passSelect = passSelect;
            passSelect.mouseover(function () {
                _passSelect.empty();
                var editTexts = _this.findEditTexts();
                for(var i = 0; i < editTexts.length; i++) {
                    var option = $("<option value='" + editTexts[i] + "'>" + editTexts[i] + "</option>");
                    if(editTexts[i] == _this.passwordId) {
                        option.attr("selected", "selected");
                    }
                    _passSelect.append(option);
                }
                _passSelect.selectmenu("refresh", true);
            });
            passSelect.change(function () {
                _this.passwordId = _passSelect.val();
            });
            domElement.append(passwordDiv);
        };
        LoginRequestAction.prototype.findEditTexts = function () {
            var baseLayout = mDesigner.Designer.activeForm.Content[0];
            var children = baseLayout.Children;
            var maps = [];
            for(var i = 0; i < children.length; i++) {
                if(children[i].Preferences.WidgetType == mWidgetTypes.WidgetTypes.EditText) {
                    maps.push((children[i]).Preferences.EditTextId);
                }
            }
            return maps;
        };
        LoginRequestAction.prototype.show = function (domElement) {
            var _this = this;
            var loginBlock = $("<a href='#' data-role='button' data-corners='false' data-inline='true' data-mini='true'>Login: </a>");
            var editTexts = this.findEditTexts();
            var loginSelect = $("<select data-mini='true' data-inline='true'></select>");
            for(var i = 0; i < editTexts.length; i++) {
                var option = $("<option value='" + editTexts[i] + "'>" + editTexts[i] + "</option>");
                if(editTexts[i] == this.loginId) {
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
                var editTexts = _this.findEditTexts();
                for(var i = 0; i < editTexts.length; i++) {
                    var option = $("<option value='" + editTexts[i] + "'>" + editTexts[i] + "</option>");
                    if(editTexts[i] == _this.loginId) {
                        option.attr("selected", "selected");
                    }
                    _loginSelect.append(option);
                }
                _loginSelect.selectmenu("refresh", true);
            });
            loginSelect.change(function () {
                _this.loginId = _loginSelect.val();
            });
            var passwdBlock = $("<a href='#' data-role='button' data-corners='false' data-inline='true' data-mini='true'>Passwd: </a>");
            editTexts = this.findEditTexts();
            var passSelect = $("<select data-mini='true' data-inline='true'></select>");
            for(var i = 0; i < editTexts.length; i++) {
                var option = $("<option value='" + editTexts[i] + "'>" + editTexts[i] + "</option>");
                if(editTexts[i] == this.passwordId) {
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
                var editTexts = _this.findEditTexts();
                for(var i = 0; i < editTexts.length; i++) {
                    var option = $("<option value='" + editTexts[i] + "'>" + editTexts[i] + "</option>");
                    if(editTexts[i] == _this.passwordId) {
                        option.attr("selected", "selected");
                    }
                    _passSelect.append(option);
                }
                _passSelect.selectmenu("refresh", true);
            });
            passSelect.change(function () {
                _this.passwordId = _passSelect.val();
            });
        };
        Object.defineProperty(LoginRequestAction.prototype, "Url", {
            get: function () {
                return this.url;
            },
            set: function (url) {
                this.url = url;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LoginRequestAction.prototype, "LoginId", {
            get: function () {
                return this.loginId;
            },
            set: function (loginId) {
                this.loginId = loginId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LoginRequestAction.prototype, "PasswordId", {
            get: function () {
                return this.passwordId;
            },
            set: function (passwordId) {
                this.passwordId = passwordId;
            },
            enumerable: true,
            configurable: true
        });
        LoginRequestAction.prototype.toXML = function () {
            var xml = "<login-request url='" + this.url + "' login-id='" + this.loginId + "' password-id='" + this.passwordId + "' />\n";
            return xml;
        };
        return LoginRequestAction;
    })(mAction.Action);
    exports.LoginRequestAction = LoginRequestAction;    
})
//@ sourceMappingURL=LoginRequestAction.js.map
