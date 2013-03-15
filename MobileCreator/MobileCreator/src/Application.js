define(["require", "exports", "utils/log/Log", "emulator/model/Emulator", "designer/Designer"], function(require, exports, __mLog__, __mEmulator__, __mDesigner__) {
    var mLog = __mLog__;

    var mEmulator = __mEmulator__;

    var mDesigner = __mDesigner__;

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
            mDesigner.Designer.instance.initDesigner();
            $("#btChange").click(function () {
                Application.state = Application.state == Application.Designer ? Application.Emulator : Application.Designer;
                if(Application.state == Application.Designer) {
                    $("#btChange").children('span').children('span').text("Designer");
                    $("#emulator").hide();
                    $("#designer").show();
                } else {
                    $("#btChange").children('span').children('span').text("Back");
                    $("#emulator").show();
                    $("#designer").hide();
                    mEmulator.Emulator.instance.showXmlStringView(mDesigner.Designer.instance.getXML());
                }
            });
        };
        return Application;
    })();
    exports.Application = Application;    
})
