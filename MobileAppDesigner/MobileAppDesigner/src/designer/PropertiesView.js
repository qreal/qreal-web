define(["require", "exports", "src/util/log/Log", "src/Application", "src/util/events/EventManager"], function(require, exports, Log, App, EventManager) {
    var PropertiesView = (function () {
        function PropertiesView() {
            this.log = new Log("PropertiesView");
            this.trueFalseOptions = [
                { Text: "No", Value: false },
                { Text: "Yes", Value: true }
            ];
            this.themes = [
                { Text: "Theme A", Value: "a" },
                { Text: "Theme B", Value: "b" },
                { Text: "Theme C", Value: "c" },
                { Text: "Theme D", Value: "d" },
                { Text: "Theme E", Value: "e" }
            ];
            this.log.Debug("constructor");
        }
        PropertiesView.prototype.Init = function () {
            this.log.Debug("Init");

            var self = this;
            App.Instance.Designer.EventManager.AddSubscriber(EventManager.EventShowProperties, {
                OnEvent: function (data) {
                    self.log.Debug("OnEvent: ", data);
                    self.ShowProperty(data);
                }
            });
        };

        PropertiesView.prototype.ShowProperty = function (property) {
            this.log.Debug('ShowProperty ' + property.Type);
            this["ShowProperty_" + property.Type](property);
        };

        PropertiesView.prototype.ShowProperty_Button = function (property) {
            this.log.Debug("ShowProperty_Button");
            var self = this;

            var dialog = $('#propertyDialogFor' + property.Id);
            if (dialog.exists()) {
                this.log.DebugObj(dialog);
                dialog.dialog("open");
                return;
            }

            dialog = $('#propertyDialogTmpl').tmpl({ title: property.Type });
            var dialogContent = dialog.children('.property');

            var idProperty = $('#propertyTextTmpl').tmpl({
                name: 'Id:',
                value: property.Id
            });
            idProperty.find('input').change(function () {
                self.log.Debug('change: ' + $(this).val());
                App.Instance.Designer.EventManager.Trigger(EventManager.EventPropertiesChanged, {
                    id: property.Id,
                    newId: $(this).val()
                });
            });

            var textProperty = $('#propertyTextTmpl').tmpl({
                name: 'Text:',
                value: property.Text
            });

            textProperty.find('input').change(function () {
                self.log.Debug('change: ' + $(this).val());
                App.Instance.Designer.EventManager.Trigger(EventManager.EventPropertiesChanged, {
                    id: property.Id,
                    text: $(this).val()
                });
            });

            var inlineProperty = $('#propertySelectTmpl').tmpl({
                name: 'Inline:'
            });

            var inlineSelect = inlineProperty.find('select');
            $("#templateOptionItem").tmpl(this.trueFalseOptions).appendTo(inlineSelect);

            inlineSelect.val(String(property.Inline));
            inlineSelect.change(function () {
                self.log.Debug('change: ' + $(this).val());
                App.Instance.Designer.EventManager.Trigger(EventManager.EventPropertiesChanged, {
                    id: property.Id,
                    inline: $(this).val()
                });
            });
            var cornersProperty = $('#propertySelectTmpl').tmpl({
                name: 'Rounded corners:'
            });
            var cornersSelect = cornersProperty.find('select');
            $("#templateOptionItem").tmpl(this.trueFalseOptions).appendTo(cornersSelect);

            cornersSelect.val(String(property.Corners));
            cornersSelect.change(function () {
                self.log.Debug('change: ' + $(this).val());
                App.Instance.Designer.EventManager.Trigger(EventManager.EventPropertiesChanged, {
                    id: property.Id,
                    corners: $(this).val()
                });
            });

            var miniProperty = $('#propertySelectTmpl').tmpl({
                name: 'Mini:'
            });
            var miniSelect = miniProperty.find('select');
            $("#templateOptionItem").tmpl(this.trueFalseOptions).appendTo(miniSelect);

            miniSelect.val(String(property.Mini));
            miniSelect.change(function () {
                self.log.Debug('change: ' + $(this).val());
                App.Instance.Designer.EventManager.Trigger(EventManager.EventPropertiesChanged, {
                    id: property.Id,
                    mini: $(this).val()
                });
            });

            var themeProperty = $('#propertySelectTmpl').tmpl({
                name: 'Theme:'
            });

            var themeSelect = themeProperty.find('select');
            $("#templateOptionItem").tmpl(this.themes).appendTo(themeSelect);

            themeSelect.val(property.Theme);
            themeSelect.change(function () {
                self.log.Debug('change: ' + $(this).val());
                App.Instance.Designer.EventManager.Trigger(EventManager.EventPropertiesChanged, {
                    id: property.Id,
                    theme: $(this).val()
                });
            });

            dialogContent.append(idProperty);
            dialogContent.append(textProperty);
            dialogContent.append(inlineProperty);
            dialogContent.append(cornersProperty);
            dialogContent.append(miniProperty);
            dialogContent.append(themeProperty);

            dialog.appendTo('body');
            dialog.attr('id', 'propertyDialogFor' + property.Id);
            $('#propertyDialogFor' + property.Id).dialog();
        };
        return PropertiesView;
    })();

    
    return PropertiesView;
});
//# sourceMappingURL=PropertiesView.js.map
