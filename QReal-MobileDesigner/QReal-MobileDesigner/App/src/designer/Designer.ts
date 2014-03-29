import Log = require("src/util/log/Log");
import DialogManager = require("src/util/DialogManager");
import App = require("src/Application");
import EventManager = require("src/util/events/EventManager");
import ToolsView = require("src/designer/ToolsView");
import PropertiesView = require("src/designer/PropertiesView");
import ControlProperty = require("src/model/ControlProperty");

declare var bootbox;
declare var projectName;

class Designer {

    private log = new Log("Designer");
    private dm: DialogManager = new DialogManager();

    private toolsView: ToolsView;
    private eventManager: EventManager;
    private propertiesView: PropertiesView;

    constructor() {
        this.log.Debug("constructor");
        this.toolsView = new ToolsView();
        this.propertiesView = new PropertiesView();
        this.eventManager = new EventManager($('body'));
    }

    public Init(): void {
        this.log.Debug("Init");
        this.toolsView.Init();
        this.propertiesView.Init();

        var dialog = this.dm;
        var self = this;
        $('#generate-apk').on('click', function (e) {
            self.log.Debug("My project name: " + projectName);
            var appHtml = App.Instance.Device.ControlManager.GenerateAppHtml();
            dialog.ShowProgress("Generating apk...");
            var dataToSend = JSON.stringify({
                project_name: projectName,
                appHtml: appHtml,
                appJs: "",
                appCss: ""
            }, null, 2);
            self.log.Debug("dataToSend:", dataToSend);
            $.ajax({
                type: "POST",
                url: "/Projects/BuildProject",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: dataToSend,
                success: function (result) {
                    window.location.href = "/Projects/DownloadApk?projectName=" + projectName;
                    dialog.HideProgress();
                }
            });
        });

        $('#serialize').on('click', function (e) {
            self.Download('test.txt', App.Instance.Device.ControlManager.Serialize());
        });
    }

    public Download(filename, text) {
        var pom = document.createElement('a');
        pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        pom.setAttribute('download', filename);
        pom.click();
    }

    public get EventManager(): EventManager {
        return this.eventManager;
    }

    public AddPage(pageName: string) {
        this.toolsView.AddNewPage(pageName);
    }

    public ShowProperty(data: ControlProperty.Property) {
        this.propertiesView.ShowProperty(data);
    }
}

export = Designer;