define(["require", "exports", "utils/log/log"], function(require, exports, __Log__) {
    var Log = __Log__;

    var Application = (function () {
        function Application() {
            this.logger = new Log.Logger("Application");
        }
        Application.Designer = 1;
        Application.Emulator = 2;
        Application.state = Application.Designer;
        Application.prototype.onCreate = function () {
            this.logger.log("onCreate");
            $("#btChange").text("Designer");
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
                }
            });
        };
        return Application;
    })();
    exports.Application = Application;    
})
