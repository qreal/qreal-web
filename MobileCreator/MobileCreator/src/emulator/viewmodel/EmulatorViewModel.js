define(["require", "exports", "utils/log/Log"], function(require, exports, __mLog__) {
    var mLog = __mLog__;

    
    var EmulatorViewModel = (function () {
        function EmulatorViewModel() {
            this.logger = new mLog.Logger("EmulatorViewModel");
            this.logger.log("in constructor");
            this.$screen = $("#screen");
        }
        EmulatorViewModel.prototype.showView = function (view) {
            this.$screen.children().remove();
            this.$screen.append(view.$Control);
            view.create();
        };
        return EmulatorViewModel;
    })();
    exports.EmulatorViewModel = EmulatorViewModel;    
})
