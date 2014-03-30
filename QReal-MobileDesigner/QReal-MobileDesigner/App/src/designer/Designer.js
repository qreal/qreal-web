define(["require", "exports", "src/util/log/Log", "src/util/DialogManager", "src/Application", "src/util/events/EventManager", "src/designer/ToolsView", "src/designer/PropertiesView"], function(require, exports, Log, DialogManager, App, EventManager, ToolsView, PropertiesView) {
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
                //self.PostOpen('POST', '/Projects/Emulator', JSON.stringify({ project_name: projectName, appHtml: appHtml }), '_blank')
            });
        };

        Designer.prototype.Download = function (filename, text) {
            var pom = document.createElement('a');
            pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
            pom.setAttribute('download', filename);
            pom.click();
        };

        Designer.prototype.PostOpen = function (verb, url, data, target) {
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
