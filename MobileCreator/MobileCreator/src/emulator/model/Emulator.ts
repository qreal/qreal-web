/// <reference path="../../../lib/jquery.d.ts" />
/// <reference path="../../../lib/jlayout.d.ts" />
import mLog = module("utils/log/Log");
import mButton = module("emulator/model/ui/Button");
import mLinearLayout = module("emulator/model/ui/LinearLayout");
import mButtonTag = module("emulator/model/attributes/ButtonTag");
import mLinearLayoutTag = module("emulator/model/attributes/LinearLayoutTag");


export class Emulator {
    private logger = new mLog.Logger("Emulator");

    public static instance = new Emulator();

    constructor() {
    }

    public createView() {
        this.logger.log("createView");

        //TODO: staff
        var content = $("#emulator");

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
        var layout = new mLinearLayout.LinearLayout(tag4);

        layout.addChild(button1);
        layout.addChild(button2);
        layout.addChild(button3);
        var layoutElement = layout.ElementJQuery;
        content.append(layoutElement);
        layout.create();
    }
}