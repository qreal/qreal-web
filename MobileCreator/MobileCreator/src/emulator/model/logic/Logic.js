define(["require", "exports", "emulator/model/Emulator"], function(require, exports, __mEmulator__) {
    var mEmulator = __mEmulator__;

    var FunctionFactory = (function () {
        function FunctionFactory() { }
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
        };
        return FunctionFactory;
    })();
    exports.FunctionFactory = FunctionFactory;    
})
