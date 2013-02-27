/// <reference path="../../../lib/jquery.d.ts" />
/// <reference path="../../../lib/jlayout.d.ts" />
import mLog = module("utils/log/Log");
import mButton = module("emulator/model/ui/Button");
import mTextView = module("emulator/model/ui/TextView");
import mLinearLayout = module("emulator/model/ui/LinearLayout");
import mButtonTag = module("emulator/model/attributes/ButtonTag");
import mLinearLayoutTag = module("emulator/model/attributes/LinearLayoutTag");
import mTextViewTag = module("emulator/model/attributes/TextViewTag");


export class Emulator {
    private logger = new mLog.Logger("Emulator");

    public static instance = new Emulator();

    constructor() {
    }

    public createView() {
        this.logger.log("createView");

        //TODO: stuff
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
        tag4.Background = "#0f0"
        var layout = new mLinearLayout.LinearLayout(tag4);

        var tag5 = new mTextViewTag.TextViewTag();
        tag5.Id = "text1";
        tag5.Text = "text1";
        var label1 = new mTextView.TextView(tag5);

        var tag6 = new mLinearLayoutTag.LinearLayoutTag();
        tag6.Id = "linear2";
        tag6.Orientation = mLinearLayoutTag.LinearLayoutTag.Horizontal;
        tag6.Background = "#00f"
        var layout2 = new mLinearLayout.LinearLayout(tag6);

        var tag7 = new mTextViewTag.TextViewTag();
        tag7.Id = "text2";
        tag7.Text = "text2";
        var label2 = new mTextView.TextView(tag7);

        var tag8 = new mTextViewTag.TextViewTag();
        tag8.Id = "text2";
        tag8.Text = "text2";
        var label3 = new mTextView.TextView(tag8);

        layout2.addChild(label2);
        layout2.addChild(label3);

        layout.addChild(button1);
        layout.addChild(button2);
        layout.addChild(label1);
        layout.addChild(layout2);
        layout.addChild(button3);
        var layoutElement = layout.ElementJQuery;
        content.append(layoutElement);
        layout.create();
        //end stuff
    }
}