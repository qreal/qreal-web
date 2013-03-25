define(["require", "exports", "utils/log/Log"], function(require, exports, __mLog__) {
    var mLog = __mLog__;

    
    var EmulatorViewModel = (function () {
        function EmulatorViewModel() {
            this.logger = new mLog.Logger("EmulatorViewModel");
            this.logger.log("in constructor");
            this.$screen = $("#screen");
        }
        EmulatorViewModel.prototype.addView = function (view) {
            this.logger.log("addView \n" + view.$Control.html());
            this.$screen.append(view.$Control);
            this.$screen.trigger('create');
            this.$screen.children().hide();
        };
        EmulatorViewModel.prototype.showView = function (view) {
            this.logger.log("showView");
            this.$screen.children().hide();
            view.$Control.show();
        };
        EmulatorViewModel.prototype.clear = function () {
            this.$screen.children().remove();
        };
        EmulatorViewModel.prototype.getInputText = function (inputId) {
            return this.$screen.find("#" + inputId).val();
        };
        return EmulatorViewModel;
    })();
    exports.EmulatorViewModel = EmulatorViewModel;    
})
