/// <reference path="../../../lib/jquery.d.ts" />
import mLog = module("utils/log/Log");
import mButton = module("emulator/model/ui/Button");
import mLinearLayout = module("emulator/model/ui/LinearLayout");


export class Emulator {
    private logger = new mLog.Logger("Emulator");

    public static instance = new Emulator();

    constructor() {
    }

    public createView() {
        this.logger.log("createView")
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
    }
}