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
        $('#generate-apk').on('click', function (e) {
            var content = $('#templateNewProject').tmpl({});
            content.find('form').on('submit', function (e) {
                content.modal('hide');
                dialog.ShowProgress("Generating apk...");
            });
            content.find('form').ajaxForm(function (response) {
                dialog.HideProgress();
                console.log(response);
                console.log(JSON.parse(response));
                window.location.href = "/Projects/DownloadApk?projectName=" + JSON.parse(response).project_name;
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