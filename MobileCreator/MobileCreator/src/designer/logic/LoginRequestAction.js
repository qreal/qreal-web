var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "designer/logic/Action"], function(require, exports, __mAction__) {
    var mAction = __mAction__;

    var LoginRequestAction = (function (_super) {
        __extends(LoginRequestAction, _super);
        function LoginRequestAction(url, loginId, passwordId) {
                _super.call(this);
            this.url = url;
            this.loginId = loginId;
            this.passwordId = passwordId;
        }
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
            var xml = "<transition url='" + this.url + "' login-id='" + this.loginId + "' password-id='" + this.passwordId + "' />\n";
            return xml;
        };
        return LoginRequestAction;
    })(mAction.Action);
    exports.LoginRequestAction = LoginRequestAction;    
})
