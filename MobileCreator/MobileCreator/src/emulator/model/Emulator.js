define(["require", "exports", "utils/log/Log", "emulator/model/ui/Button", "emulator/model/ui/LinearLayout"], function(require, exports, __mLog__, __mButton__, __mLinearLayout__) {
    var mLog = __mLog__;

    var mButton = __mButton__;

    var mLinearLayout = __mLinearLayout__;

    var Emulator = (function () {
        function Emulator() {
            this.logger = new mLog.Logger("Emulator");
        }
        Emulator.instance = new Emulator();
        Emulator.prototype.createView = function () {
            this.logger.log("createView");
            var content = $("#emulator");
            var button1 = new mButton.Button("button1");
            var button2 = new mButton.Button("button2");
            var button3 = new mButton.Button("button3");
            var layout = new mLinearLayout.LinearLayout("linear1");
            layout.addChild(button1);
            layout.addChild(button2);
            layout.addChild(button3);
            var layoutElement = layout.getElement();
            content.append(layoutElement);
            layout.create();
        };
        return Emulator;
    })();
    exports.Emulator = Emulator;    
})
