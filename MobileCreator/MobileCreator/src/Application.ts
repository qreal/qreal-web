/// <reference path="../lib/jquery.d.ts" />
import mLog = module("utils/log/Log");
import mEmulator = module("emulator/model/Emulator");
import mDesigner = module("designer/Designer");


export class Application {
    private logger = new mLog.Logger("Application");

    private static Designer: number = 1;
    private static Emulator: number = 2;
    private static state: number = Application.Designer;

    public onCreate() {
        this.logger.log("onCreate");       
        $("#designer").show();
        mDesigner.Designer.instance.initDesigner();
        $("#btChange").click(function () {
            Application.state = Application.state == Application.Designer ? Application.Emulator : Application.Designer;
            if (Application.state == Application.Designer) {
                $("#btChange").children('span').children('span').text("Designer");
                $("#emulator").hide();
                $("#designer").show();
                $("#menu").show();
            } else {
                $("#btChange").children('span').children('span').text("Emulator");
                $("#emulator").show();
                $("#designer").hide();
                $("#menu").hide();
                mEmulator.Emulator.instance.createView();
            }
        });
    }
}