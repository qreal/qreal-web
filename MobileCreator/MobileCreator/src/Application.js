define(["require", "exports", "utils/log/Log", "emulator/model/Emulator"], function(require, exports, __mLog__, __mEmulator__) {
    var mLog = __mLog__;

    var mEmulator = __mEmulator__;

    var Application = (function () {
        function Application() {
            this.logger = new mLog.Logger("Application");
        }
        Application.Designer = 1;
        Application.Emulator = 2;
        Application.state = Application.Designer;
        Application.prototype.onCreate = function () {
            this.logger.log("onCreate");
            $("#designer").show();
            $("#btChange").click(function () {
                Application.state = Application.state == Application.Designer ? Application.Emulator : Application.Designer;
                if(Application.state == Application.Designer) {
                    $("#btChange").text("Designer");
                    $("#emulator").hide();
                    $("#designer").show();
                } else {
                    $("#btChange").text("Emulator");
                    $("#emulator").show();
                    $("#designer").hide();
                    mEmulator.Emulator.instance.createView();
                }
            });
        };
        return Application;
    })();
    exports.Application = Application;    
})
