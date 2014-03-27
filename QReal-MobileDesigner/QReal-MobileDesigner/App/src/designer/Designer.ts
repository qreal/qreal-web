import Log = require("src/util/log/Log");
import DialogManager = require("src/util/DialogManager");
import App = require("src/Application");
import EventManager = require("src/util/events/EventManager");
import ToolsView = require("src/designer/ToolsView");
import PropertiesView = require("src/designer/PropertiesView");
import ControlProperty = require("src/model/ControlProperty");

declare var bootbox;

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
            var content = $('#templateNewProject').tmpl({});
            var appHtml = App.Instance.Device.ControlManager.GenerateAppHtml();
            self.log.Debug("appHtml", appHtml);
            content.find('form').on('submit', function (e) {
                content.modal('hide');
                dialog.ShowProgress("Generating apk...");
            });
            content.find('form').ajaxForm({
                success: function (response) {
                    var projectName = JSON.parse(response).project_name;
                    var dataToSend = JSON.stringify({
                        project_name: projectName,
                        appHtml: appHtml,
                        appJs: "",
                        appCss: ""
                    });
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
                    
                }
            });
            content.modal();
        });
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