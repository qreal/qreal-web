define(["require", "exports", "utils/log/Log", "emulator/model/ui/Button", "emulator/model/ui/LinearLayout", "emulator/model/attributes/ButtonTag", "emulator/model/attributes/LinearLayoutTag"], function(require, exports, __mLog__, __mButton__, __mLinearLayout__, __mButtonTag__, __mLinearLayoutTag__) {
    var mLog = __mLog__;

    var mButton = __mButton__;

    
    var mLinearLayout = __mLinearLayout__;

    var mButtonTag = __mButtonTag__;

    var mLinearLayoutTag = __mLinearLayoutTag__;

    
    var Emulator = (function () {
        function Emulator() {
            this.logger = new mLog.Logger("Emulator");
        }
        Emulator.instance = new Emulator();
        Emulator.prototype.createView = function () {
            this.logger.log("createView");
            var content = $("#emulator");
            content.children().remove();
            var tag1 = new mButtonTag.ButtonTag();
            tag1.Id = "button1";
            tag1.Text = "button1";
            var button1 = new mButton.Button(tag1);
            var tag2 = new mButtonTag.ButtonTag();
            tag2.Id = "button2";
            tag2.Text = "button2";
            var button2 = new mButton.Button(tag2);
            var tag3 = new mButtonTag.ButtonTag();
            tag3.Id = "button3";
            tag3.Text = "button3";
            var button3 = new mButton.Button(tag3);
            var tag4 = new mLinearLayoutTag.LinearLayoutTag();
            tag4.Id = "linear1";
            tag4.Orientation = mLinearLayoutTag.LinearLayoutTag.Vertical;
            tag4.Background = "#0f0";
            var layout = new mLinearLayout.LinearLayout(tag4);
            layout.addChild(button1);
            layout.addChild(button2);
            layout.addChild(button3);
            var $layout = layout.$Control;
            content.append($layout);
            layout.create();
        };
        return Emulator;
    })();
    exports.Emulator = Emulator;    
})
