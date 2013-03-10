import mLog = module("utils/log/Log");
import mControl = module("emulator/model/ui/Control");

export class XmlManager {
    private logger = new mLog.Logger("XmlManager");

    constructor() {
        this.logger.log("in constructor");
    }

    public parsePage() {
        var xmlHTTP = new XMLHttpRequest();
        var xmlDoc;
        try {
            xmlHTTP.open("GET", "res/main.xml", false);
            xmlHTTP.send(null);
            xmlDoc = xmlHTTP.responseXML;
        }
        catch (e) {
            window.alert("Unable to load the requested file.");
            return;
        }

        this.logger.log(xmlDoc);

    }

}