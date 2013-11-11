define(["require", "exports", "src/util/log/Log", "src/designer/Controller", "src/util/events/EventManager"], function(require, exports, __Log__, __Controller__, __EventManager__) {
    var Log = __Log__;
    var Controller = __Controller__;
    var EventManager = __EventManager__;

    var PropertiesView = (function () {
        function PropertiesView(controller) {
            this.log = new Log("PropertiesView");
            this.controller = controller;
        }
        PropertiesView.prototype.Init = function () {
            this.log.Debug("Init");

            var self = this;
            this.controller.EventManager.AddSubscriber(EventManager.EventShowProperties, {
                OnEvent: function (data) {
                    self.log.Debug("OnEvent");
                    self.log.DebugObj(data);
                    self.ShowProperty();
                }
            });
        };

        PropertiesView.prototype.ShowProperty = function () {
            this.log.Debug('ShowProperty');
            var dialog = $('#propertyDialogTmpl').tmpl({ title: 'My property' });
            var content = $('#propertyButtonTmpl').tmpl({});
            dialog.append(content);
            dialog.appendTo('body');
            $(".propertyDialog").dialog();
        };
        return PropertiesView;
    })();

    
    return PropertiesView;
});
//# sourceMappingURL=PropertiesView.js.map
