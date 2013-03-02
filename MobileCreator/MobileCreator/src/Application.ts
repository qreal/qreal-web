/// <reference path="../lib/jquery.d.ts" />
import mLog = module("utils/log/Log");
import mEmulator = module("emulator/model/Emulator")


export class Application {
    private logger = new mLog.Logger("Application");

    private static Designer: number = 1;
    private static Emulator: number = 2;
    private static state: number = Application.Designer;

    public onCreate() {
        this.logger.log("onCreate");       
        $("#designer").show();
        $("#btChange").click(function () {
            Application.state = Application.state == Application.Designer ? Application.Emulator : Application.Designer;
            if (Application.state == Application.Designer) {
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
    }
}