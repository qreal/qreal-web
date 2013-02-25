import Log = module("utils/log/Log");
/// <reference path="../lib/jquery.d.ts" />
/// <reference path="../lib/jquerymobile.d.ts" />

export class Application {
    private logger = new Log.Logger("Application");
    
    private static Designer: number = 1;
    private static Emulator: number = 2;
    private static state: number = Application.Designer;

    public onCreate() {
        this.logger.log("onCreate");
        $("#btChange").text("Designer");
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
            }
        });                    
    }
}