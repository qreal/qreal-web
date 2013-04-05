var mLog = require("./utils/log/Log")
var mEmulator = require("./emulator/model/Emulator")
var mDesigner = require("./designer/Designer")
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
//@ sourceMappingURL=Application.js.map
