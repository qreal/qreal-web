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
                    self.ShowProperty(data);
                }
            });
        };

        PropertiesView.prototype.ShowProperty = function (property) {
            this.log.Debug('ShowProperty ' + property.Type);
            this["ShowProperty_" + property.Type](property);
        };

        PropertiesView.prototype.ShowProperty_Button = function (data) {
            this.log.Debug("ShowProperty_Button");
            var dialog = $('#propertyDialogTmpl').tmpl({ title: data.Type });
            var dialogContent = dialog.children('.property');
            var idProperty = $('#propertyTextTmpl').tmpl({
                name: 'Id:',
                valId: 'id1',
                value: data.Id
            });
            var self = this;

            var textProperty = $('#propertyTextTmpl').tmpl({
                name: 'Text:',
                id: 'textProperty',
                value: data.Text
            });

            textProperty.find('#textProperty').change(function () {
                self.log.Debug('change: ' + $(this).val());
                self.controller.EventManager.Trigger(EventManager.EventPropertiesChanged, {
                    id: data.Id,
                    text: $(this).val()
                });
            });

            var inlineProperty = $('#propertySelectTmpl').tmpl({
                id: 'inlineProperty',
                name: 'Inline:'
            });

            $("#templateOptionItem").tmpl([
                { Text: "No", Value: "0" },
                { Text: "Yes", Value: "1" }
            ]).appendTo(inlineProperty.find('#inlineProperty'));

            inlineProperty.find('#inlineProperty').change(function () {
                self.log.Debug('change: ' + $(this).val());
                self.controller.EventManager.Trigger(EventManager.EventPropertiesChanged, {
                    id: data.Id,
                    inline: $(this).val()
                });
            });

            dialogContent.append(idProperty);
            dialogContent.append(textProperty);
            dialogContent.append(inlineProperty);

            dialog.appendTo('body');
            $(".propertyDialog").dialog();
        };
        return PropertiesView;
    })();

    
    return PropertiesView;
});
//# sourceMappingURL=PropertiesView.js.map
