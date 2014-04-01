define(["require", "exports", "src/util/log/Log", "src/Application", "src/model/Enums"], function(require, exports, Log, App, Enums) {
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
        };

        PropertiesView.prototype.ShowProperty = function (property) {
            this.log.Debug('ShowProperty ' + property.Type);

            if (this.currentPropertyDiv) {
                this.currentPropertyDiv.hide();
            }

            var propertyPanel = $('#propertyFor' + property.Id);
            if (propertyPanel.exists()) {
                this.currentPropertyDiv = propertyPanel;
                this.currentPropertyDiv.show();
                return;
            }

            switch (property.Type) {
                case 3 /* Button */:
                    this.ShowProperty_Button(property);
                    break;
                case 4 /* Input */:
                    this.ShowProperty_Input(property);
                    break;
                case 1 /* Page */:
                    this.ShowProperty_Page(property);
                    break;
            }
        };

        PropertiesView.prototype.ShowProperty_Button = function (property) {
            this.log.Debug("ShowProperty_Button");
            var self = this;
            var controlManager = App.Instance.Device.ControlManager;

            var propertyPanel = $('#propertiesTmpl').tmpl({});
            var dialogContent = propertyPanel.children("#property-table");

            var idProperty = $('#propertyTextTmpl').tmpl({
                name: 'Id:',
                value: property.Id
            });
            idProperty.find('input').change(function () {
                controlManager.ChangeProperty(property.Id, 0 /* Id */, 3 /* Button */, $(this).val());
            });

            var textProperty = $('#propertyTextTmpl').tmpl({
                name: 'Text:',
                value: property.Text
            });

            textProperty.find('input').change(function () {
                controlManager.ChangeProperty(property.Id, 1 /* Text */, 3 /* Button */, $(this).val());
            });

            var inlineProperty = $('#propertySelectTmpl').tmpl({
                name: 'Inline:'
            });

            var inlineSelect = inlineProperty.find('select');
            $("#templateOptionItem").tmpl(this.trueFalseOptions).appendTo(inlineSelect);

            inlineSelect.val(String(property.Inline));
            inlineSelect.change(function () {
                controlManager.ChangeProperty(property.Id, 2 /* Inline */, 3 /* Button */, $(this).val());
            });
            var cornersProperty = $('#propertySelectTmpl').tmpl({
                name: 'Rounded corners:'
            });
            var cornersSelect = cornersProperty.find('select');
            $("#templateOptionItem").tmpl(this.trueFalseOptions).appendTo(cornersSelect);

            cornersSelect.val(String(property.Corners));
            cornersSelect.change(function () {
                controlManager.ChangeProperty(property.Id, 3 /* Corners */, 3 /* Button */, $(this).val());
            });

            var miniProperty = $('#propertySelectTmpl').tmpl({
                name: 'Mini:'
            });
            var miniSelect = miniProperty.find('select');
            $("#templateOptionItem").tmpl(this.trueFalseOptions).appendTo(miniSelect);

            miniSelect.val(String(property.Mini));
            miniSelect.change(function () {
                controlManager.ChangeProperty(property.Id, 4 /* Mini */, 3 /* Button */, $(this).val());
            });

            var themeProperty = $('#propertySelectTmpl').tmpl({
                name: 'Theme:'
            });

            var themeSelect = themeProperty.find('select');
            $("#templateOptionItem").tmpl(this.themes).appendTo(themeSelect);

            themeSelect.val(property.Theme);
            themeSelect.change(function () {
                controlManager.ChangeProperty(property.Id, 5 /* Theme */, 3 /* Button */, $(this).val());
            });

            dialogContent.append(idProperty);
            dialogContent.append(textProperty);
            dialogContent.append(inlineProperty);
            dialogContent.append(cornersProperty);
            dialogContent.append(miniProperty);
            dialogContent.append(themeProperty);

            propertyPanel.appendTo('#properties-widget');
            propertyPanel.attr('id', 'propertyFor' + property.Id);
            this.currentPropertyDiv = propertyPanel;
        };

        PropertiesView.prototype.ShowProperty_Input = function (property) {
            this.log.Debug("ShowProperty_Input");
            var self = this;
            var controlManager = App.Instance.Device.ControlManager;

            var propertyPanel = $('#propertiesTmpl').tmpl({});
            var dialogContent = propertyPanel.children("#property-table");

            var idProperty = $('#propertyTextTmpl').tmpl({
                name: 'Id:',
                value: property.Id
            });
            idProperty.find('input').change(function () {
                controlManager.ChangeProperty(property.Id, 0 /* Id */, 4 /* Input */, $(this).val());
            });

            var titleProperty = $('#propertyTextTmpl').tmpl({
                name: 'Title:',
                value: property.Title
            });

            titleProperty.find('input').change(function () {
                controlManager.ChangeProperty(property.Id, 6 /* Title */, 4 /* Input */, $(this).val());
            });

            var miniProperty = $('#propertySelectTmpl').tmpl({
                name: 'Mini:'
            });
            var miniSelect = miniProperty.find('select');
            $("#templateOptionItem").tmpl(this.trueFalseOptions).appendTo(miniSelect);

            miniSelect.val(String(property.Mini));
            miniSelect.change(function () {
                controlManager.ChangeProperty(property.Id, 4 /* Mini */, 4 /* Input */, $(this).val());
            });

            var themeProperty = $('#propertySelectTmpl').tmpl({
                name: 'Theme:'
            });

            var themeSelect = themeProperty.find('select');
            $("#templateOptionItem").tmpl(this.themes).appendTo(themeSelect);

            themeSelect.val(property.Theme);
            themeSelect.change(function () {
                controlManager.ChangeProperty(property.Id, 5 /* Theme */, 4 /* Input */, $(this).val());
            });

            dialogContent.append(idProperty);
            dialogContent.append(titleProperty);
            dialogContent.append(miniProperty);
            dialogContent.append(themeProperty);

            propertyPanel.appendTo('#properties-widget');
            propertyPanel.attr('id', 'propertyFor' + property.Id);
            this.currentPropertyDiv = propertyPanel;
        };

        PropertiesView.prototype.ShowProperty_Page = function (property) {
            this.log.Debug("ShowProperty_Page");
            var self = this;
            var controlManager = App.Instance.Device.ControlManager;

            var propertyPanel = $('#propertiesTmpl').tmpl({});
            var content = propertyPanel.children("#property-table");

            var idProperty = $('#propertyTextTmpl').tmpl({
                name: 'Id:',
                value: property.Id
            });
            idProperty.find('input').change(function () {
                controlManager.ChangeProperty(property.Id, 0 /* Id */, 1 /* Page */, $(this).val());
            });

            var headerProperty = $('#propertyCheckboxTmpl').tmpl({
                name: 'Header:',
                value: property.Id
            });
            headerProperty.find('input').change(function () {
                controlManager.ChangeProperty(property.Id, 7 /* Header */, 1 /* Page */, $(this).is(":checked") ? 'yes' : 'no');
            });

            content.append(idProperty);
            content.append(headerProperty);
            propertyPanel.appendTo('#properties-widget');
            propertyPanel.attr('id', 'propertyFor' + property.Id);
            this.currentPropertyDiv = propertyPanel;
        };

        PropertiesView.prototype.ShowProperty_Header = function (property) {
            this.log.Debug("ShowProperty_Page");
            var self = this;
            var controlManager = App.Instance.Device.ControlManager;

            var propertyPanel = $('#propertiesTmpl').tmpl({});
            var content = propertyPanel.children("#property-table");

            var titleProperty = $('#propertyTextTmpl').tmpl({
                name: 'Title:',
                value: property.Title
            });
            titleProperty.find('input').change(function () {
                controlManager.ChangeProperty(property.Id, 6 /* Title */, 1 /* Page */, $(this).val());
            });

            content.append(titleProperty);
            propertyPanel.appendTo('#properties-widget');
            propertyPanel.attr('id', 'propertyFor' + property.Id);
            this.currentPropertyDiv = propertyPanel;
        };
        return PropertiesView;
    })();

    
    return PropertiesView;
});
//# sourceMappingURL=PropertiesView.js.map
