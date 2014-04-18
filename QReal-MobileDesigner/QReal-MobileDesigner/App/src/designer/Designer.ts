import Log = require("src/util/log/Log");
import DialogHelper = require("src/util/DialogHelper");
import App = require("src/Application");
import EventManager = require("src/util/events/EventManager");
import ToolsView = require("src/designer/ToolsView");
import PropertiesView = require("src/designer/PropertiesView");
import ControlProperty = require("src/model/ControlProperty");

declare var bootbox;
declare var projectName;
declare var ace;

class Designer {

    private log = new Log("Designer");
    private dh: DialogHelper = new DialogHelper();

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

        var dialog = this.dh;
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
            self.Download('app.json', App.Instance.Device.ControlManager.Serialize());
        });

        $('#run').on('click', function (e) {
            var appHtml = App.Instance.Device.ControlManager.GenerateAppHtml();
            var dataToSend = JSON.stringify({
                project_name: projectName,
                appHtml: appHtml,
                appJs: "",
                appCss: ""
            }, null, 4);
            $.ajax({
                type: "POST",
                url: "/Projects/EmulatorData",
                contentType: "application/json; charset=utf-8",
                dataType: "text",
                data: dataToSend,
                success: function (result) {
                    self.log.Debug('post result:', result);
                    // $('#emulatorIframe').modal();
                    // $('#emulatorIframe').find('iframe').attr('src', "/Projects/Emulator")
                    window.open("/Projects/Emulator", "_blank", "location=yes,height=480,width=320,scrollbars=yes,status=yes");
                }
            });
        });

        var editor = ace.edit("html_editor");
        editor.setTheme("ace/theme/Chrome");
        editor.getSession().setMode("ace/mode/html");

        var csseditor = ace.edit("css_editor");
        editor.setTheme("ace/theme/Chrome");
        editor.getSession().setMode("ace/mode/html");

        $('#code').on('click', e => {
            $('#codeEditor').modal();
            $('#editorsTabs a').click(function (e) {
                e.preventDefault();
                $(this).tab('show');
            });
            var code = App.Instance.Device.ControlManager.GenerateAppHtml();
            var formatCode = (<any>jQuery).htmlClean(code, {
                format: true
            });
            editor.setValue(code);
        });

        $('#codeEditor').on('show.bs.modal', function () {
            $('.modal-content .modal-body').css('height', $(window).height() * 0.8);
        });

        $(document).ready(function () {
            /**
             * Maximize the real estate available to the portal contents
             */
            self.ResizeContent();
            $(window).resize(self.ResizeContent);
        });
    }

    private ResizeContent() {
        var propertyHeight = $(window).height() - 100;
        $(".properties-panel").height(propertyHeight);
        var controlsHeight = $(window).height() - 155;
        $(".dleft .panel").height(controlsHeight);
        $(".dcenter").height(propertyHeight + 20);
    }

    public Download(filename, text) {
        var pom = document.createElement('a');
        pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        pom.setAttribute('download', filename);
        pom.click();
    }

    public PostOpen(verb, url, data, target) {
        var form = document.createElement("form");
        form.action = url;
        form.method = verb;
        form.target = target || "_self";
        if (data) {
            for (var key in data) {
                var input = document.createElement("textarea");
                input.name = key;
                input.value = typeof data[key] === "object" ? JSON.stringify(data[key]) : data[key];
                form.appendChild(input);
            }
        }
        form.style.display = 'none';
        document.body.appendChild(form);
        form.submit();
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