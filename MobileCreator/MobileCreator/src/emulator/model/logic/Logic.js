define(["require", "exports", "emulator/model/Emulator", "utils/log/Log"], function(require, exports, __mEmulator__, __mLog__) {
    var mEmulator = __mEmulator__;

    var mLog = __mLog__;

    var FunctionFactory = (function () {
        function FunctionFactory() {
            this.logger = new mLog.Logger("FunctionFactory");
        }
        FunctionFactory.prototype.seqFunc = function (func1, func2) {
            return function () {
                func1();
                func2();
            };
        };
        FunctionFactory.prototype.ifFunc = function (conditionFunc, thenFunc, elseFunc) {
            return function () {
                if(conditionFunc()) {
                    thenFunc();
                } else if(elseFunc) {
                    elseFunc();
                }
            };
        };
        FunctionFactory.prototype.transitionFunc = function (pageId) {
            return function () {
                mEmulator.Emulator.instance.NavigationManager.showPage(pageId);
            };
        };
        FunctionFactory.prototype.loginRequestFunc = function (url, login_id, password_id) {
            var login = mEmulator.Emulator.instance.EmulatorViewModel.getInputText(login_id);
            var password = mEmulator.Emulator.instance.EmulatorViewModel.getInputText(password_id);
            return function () {
                this.sendLoginRequest(url, login, password);
            };
        };
        FunctionFactory.prototype.sendLoginRequest = function (url, login, password) {
            this.logger.log("sendLoginRequest: url=" + url + " login=" + login + " password=" + password);
            var parameters = jQuery.param({
                login: login,
                password: password
            });
            $.ajax({
                type: "POST",
                url: url,
                data: parameters,
                success: function (data) {
                    mEmulator.Emulator.instance.trigger("LoginResponse", data);
                    alert("Response " + data);
                },
                dataType: "text"
            });
        };
        return FunctionFactory;
    })();
    exports.FunctionFactory = FunctionFactory;    
})
//@ sourceMappingURL=Logic.js.map
