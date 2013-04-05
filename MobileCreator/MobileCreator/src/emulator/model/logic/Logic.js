var mEmulator = require("./emulator/model/Emulator")
var mEventManager = require("./emulator/model/managers/EventManager")
var mLog = require("./utils/log/Log")
var mMap = require("./emulator/model/ui/Map")
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
    FunctionFactory.prototype.ifFunc = function (condition, thenFunc, elseFunc) {
        return function (data) {
            var ifCondition;
            switch(condition) {
                case "loginSuccess":
                    ifCondition = data == "success";
                    break;
            }
            if(ifCondition) {
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
        this.logger.log("showMapFunc");
        var _this = this;
        return function (responseData) {
            _this.logger.log("showMapFunc responseData: " + responseData);
            var points = [];
            if(responseData) {
                var data = responseData.split(';');
                for(var i = 0; i < data.length; i += 3) {
                    points.push(new mMap.Point(parseFloat(data[i]), parseFloat(data[i + 1]), data[i + 2]));
                }
            }
            var map = mEmulator.Emulator.instance.NavigationManager.findControlById(id);
            map.addPushpins(points);
        };
    };
    FunctionFactory.prototype.sendLoginRequest = function (url, login, password) {
        this.logger.log("sendLoginRequest: url=" + url + " login=" + login + " password=" + password);
        var parameters = "login?" + jQuery.param({
            login: login,
            password: password
        });
        var _this = this;
        $.ajax({
            type: "POST",
            url: url,
            data: parameters,
            success: function (data) {
                _this.logger.log("sendLoginRequest POST success");
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
//@ sourceMappingURL=Logic.js.map
