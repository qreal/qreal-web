define(["require", "exports", "utils/log/Log", "emulator/model/ui/LinearLayout", "emulator/model/attributes/LinearLayoutTag", "emulator/model/attributes/ControlTag"], function(require, exports, __mLog__, __mLinearLayout__, __mLinearLayoutTag__, __mControlTag__) {
    var mLog = __mLog__;

    
    
    var mLinearLayout = __mLinearLayout__;

    var mLinearLayoutTag = __mLinearLayoutTag__;

    var mControlTag = __mControlTag__;

    var XmlManager = (function () {
        function XmlManager() {
            this.logger = new mLog.Logger("XmlManager");
            this.logger.log("in constructor");
        }
        XmlManager.LinearLayout = "LinearLayout";
        XmlManager.prototype.parsePage = function () {
            this.logger.log("parse page");
            var xmlHTTP = new XMLHttpRequest();
            var xmlDoc;
            try  {
                xmlHTTP.open("GET", "res/main.xml", false);
                xmlHTTP.send(null);
                xmlDoc = xmlHTTP.responseXML;
            } catch (e) {
                window.alert("Unable to load the requested file.");
                return;
            }
            this.parseNode(xmlDoc.firstChild);
        };
        XmlManager.prototype.parseNode = function (node) {
            this.logger.log("parse node: " + node.nodeName);
            switch(node.nodeName) {
                case XmlManager.LinearLayout:
                    this.parseLinearLayout(node);
                    break;
            }
        };
        XmlManager.prototype.parseLinearLayout = function (node) {
            var tag = new mLinearLayoutTag.LinearLayoutTag();
            var orientation = node.attributes['orientation'];
            if(orientation) {
                tag.Orientation = orientation == 'vertical' ? mLinearLayoutTag.LinearLayoutTag.Vertical : mLinearLayoutTag.LinearLayoutTag.Horizontal;
            } else {
                tag.Orientation = mLinearLayoutTag.LinearLayoutTag.Vertical;
            }
            var layout_width = node.attributes['layout_width'];
            if(layout_width) {
                tag.Width = layout_width == 'wrap_content' ? mControlTag.ControlTag.WrapContent : mControlTag.ControlTag.MatchParrent;
            } else {
                tag.Width = mControlTag.ControlTag.MatchParrent;
            }
            var layout_height = node.attributes['layout_height'];
            if(layout_height) {
                tag.Height = layout_height == 'wrap_content' ? mControlTag.ControlTag.WrapContent : mControlTag.ControlTag.MatchParrent;
            } else {
                tag.Height = mControlTag.ControlTag.MatchParrent;
            }
            var background = node.attributes['background'];
            if(background) {
                tag.Background = background;
            }
            return new mLinearLayout.LinearLayout(tag);
        };
        return XmlManager;
    })();
    exports.XmlManager = XmlManager;    
})
