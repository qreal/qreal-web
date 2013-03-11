define(["require", "exports", "utils/log/Log"], function(require, exports, __mLog__) {
    var mLog = __mLog__;

    
    var XmlManager = (function () {
        function XmlManager() {
            this.logger = new mLog.Logger("XmlManager");
            this.logger.log("in constructor");
        }
        XmlManager.LinearLayout = "LinearLayout";
        XmlManager.prototype.parsePage = function () {
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
            this.logger.log(xmlDoc.firstChild.nodeName);
        };
        return XmlManager;
    })();
    exports.XmlManager = XmlManager;    
})
