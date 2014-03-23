import Log = require("src/util/log/Log");
import DialogManager = require("src/util/DialogManager");
import App = require("src/Application");
import EventManager = require("src/util/events/EventManager");
import ToolsView = require("src/designer/ToolsView");
import PropertiesView = require("src/designer/PropertiesView");
import Property = require("src/model/properties/Property");

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
            //dialog.ShowProgress("Generating apk...");
            //jQuery.ajax('/Projects/NewProject?project_name=hello&project_package=com.example.hello').done(function () {
            //    window.location.href = "/Projects/DownloadApk?projectName=hello";
            //    dialog.HideProgress();
            //  });

            var content = $('#templateNewProject').tmpl({});   
            content.find('input[type=submit]').on('click', function (e) {
                content.modal('hide');
                dialog.ShowProgress("Generating apk...");
            });   
            content.find('#ProjectForm').ajaxForm( function () {
                dialog.HideProgress();       
                window.location.href = "/Projects/DownloadApk?projectName=hello";        
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

    public ShowProperty(data: Property) {
        this.propertiesView.ShowProperty(data);
    }
}

export = Designer;