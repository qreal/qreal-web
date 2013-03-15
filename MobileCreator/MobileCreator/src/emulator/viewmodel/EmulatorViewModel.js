define(["require", "exports", "utils/log/Log"], function(require, exports, __mLog__) {
    var mLog = __mLog__;

    
    var EmulatorViewModel = (function () {
        function EmulatorViewModel() {
            this.logger = new mLog.Logger("EmulatorViewModel");
            this.logger.log("in constructor");
            this.$screen = $("#screen");
        }
        EmulatorViewModel.prototype.showViewAndCreate = function (view) {
            this.logger.log("showViewAndCreate");
            this.$screen.children().hide();
            this.$screen.append(view.$Control);
            this.$screen.trigger('create');
        };
        EmulatorViewModel.prototype.showView = function (view) {
            this.logger.log("showView");
            this.$screen.children().hide();
            view.$Control.show();
        };
        return EmulatorViewModel;
    })();
    exports.EmulatorViewModel = EmulatorViewModel;    
})
