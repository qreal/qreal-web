define(["require", "exports", "src/util/log/Log", "src/util/DialogManager", "src/util/events/EventManager", "src/designer/ToolsView", "src/designer/PropertiesView"], function(require, exports, Log, DialogManager, EventManager, ToolsView, PropertiesView) {
    var Designer = (function () {
        function Designer() {
            this.log = new Log("Designer");
            this.dm = new DialogManager();
            this.log.Debug("constructor");
            this.toolsView = new ToolsView();
            this.propertiesView = new PropertiesView();
            this.eventManager = new EventManager($('body'));
        }
        Designer.prototype.Init = function () {
            this.log.Debug("Init");
            this.toolsView.Init();
            this.propertiesView.Init();

            var dialog = this.dm;
            $('#generate-apk').on('click', function (e) {
                var content = $('#templateNewProject').tmpl({});
                content.find('button[type=submit]').on('click', function (e) {
                    content.modal('hide');
                    dialog.ShowProgress("Generating apk...");
                });
                content.find('#ProjectForm').ajaxForm(function () {
                    dialog.HideProgress();
                    window.location.href = "/Projects/DownloadApk?projectName=hello";
                });
                content.modal();
            });
        };

        Object.defineProperty(Designer.prototype, "EventManager", {
            get: function () {
                return this.eventManager;
            },
            enumerable: true,
            configurable: true
        });

        Designer.prototype.AddPage = function (pageName) {
            this.toolsView.AddNewPage(pageName);
        };

        Designer.prototype.ShowProperty = function (data) {
            this.propertiesView.ShowProperty(data);
        };
        return Designer;
    })();

    
    return Designer;
});
//# sourceMappingURL=Designer.js.map
