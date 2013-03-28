define(["require", "exports", "emulator/model/Emulator", "emulator/model/managers/EventManager", "utils/log/Log"], function(require, exports, __mEmulator__, __mEventManager__, __mLog__) {
    var mEmulator = __mEmulator__;

    var mEventManager = __mEventManager__;

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
            var _this = this;
            return function () {
                var login = mEmulator.Emulator.instance.EmulatorViewModel.getInputText(login_id);
                var password = mEmulator.Emulator.instance.EmulatorViewModel.getInputText(password_id);
                _this.sendLoginRequest(url, login, password);
            };
        };
        FunctionFactory.prototype.saveSessionFunc = function () {
            this.logger.log("saveSessionFunc");
            return function () {
            };
        };
        FunctionFactory.prototype.patientsRequestFunc = function (url) {
            this.logger.log("saveSessionFunc");
            var _this = this;
            return function () {
                _this.sendPatientsRequest(url);
            };
        };
        FunctionFactory.prototype.showMapFunc = function (id) {
            this.logger.log("saveSessionFunc");
            var _this = this;
            return function () {
                _this.logger.log("show map. id=" + id);
            };
        };
        FunctionFactory.prototype.sendLoginRequest = function (url, login, password) {
            this.logger.log("sendLoginRequest: url=" + url + " login=" + login + " password=" + password);
            var parameters = "login?" + jQuery.param({
                login: login,
                password: password
            });
            $.ajax({
                type: "POST",
                url: url,
                data: parameters,
                success: function (data) {
                    mEmulator.Emulator.instance.EventManager.trigger(mEmulator.Emulator.instance.NavigationManager.CurrentPage.Name, mEventManager.EventManager.OnLoginResponse, data);
                },
                dataType: "text"
            });
        };
        FunctionFactory.prototype.sendPatientsRequest = function (url) {
            this.logger.log("sendPatientsRequest: url=" + url);
            $.ajax({
                type: "POST",
                url: url,
                data: "coordinates",
                success: function (data) {
                    mEmulator.Emulator.instance.EventManager.trigger(mEmulator.Emulator.instance.NavigationManager.CurrentPage.Name, mEventManager.EventManager.OnPatientsResponse, data);
                },
                dataType: "text"
            });
        };
        return FunctionFactory;
    })();
    exports.FunctionFactory = FunctionFactory;    
})
//@ sourceMappingURL=Logic.js.map
