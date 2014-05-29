define(["require", "exports", "src/util/log/Log", "src/Application", "src/model/Enums"], function(require, exports, Log, App, Enums) {
    var PropertiesView = (function () {
        function PropertiesView() {
            this.log = new Log("PropertiesView");
            this.trueFalseOptions = [
                { Text: "No", Value: false },
                { Text: "Yes", Value: true }
            ];
            this.themes = [
                { Text: "Default", Value: "default" },
                { Text: "Light", Value: "a" },
                { Text: "Dark", Value: "b" }
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
                case 2 /* Header */:
                    this.ShowProperty_Header(property);
                    break;
                case 6 /* Label */:
                    this.ShowProperty_Label(property);
                    break;
                case 7 /* Image */:
                    this.ShowProperty_Image(property);
                    break;
                case 5 /* Map */:
                    this.ShowProperty_Map(property);
                    break;
                case 8 /* WebView */:
                    this.ShowProperty_WebView(property);
                    break;
            }
        };

        PropertiesView.prototype.ShowProperty_Button = function (property) {
            this.log.Debug("ShowProperty_Button");
            var self = this;
            var controlManager = App.Instance.Device.ControlManager;

            var propertyPanel = $('#propertiesTmpl').tmpl({});
            var dialogContent = propertyPanel.children("#property-table");

            var $idProperty = this.CreateIdRow(property);
            var $textProperty = this.CreateInnerTextRow(property);
            var $inlineProperty = this.CreateInlineRow(property);
            var $cornersProperty = this.CreateRoundCornersRow(property);
            var $miniProperty = this.CreateMiniRow(property);
            var $themeProperty = this.CreateThemeRow(property);

            dialogContent.append($idProperty);
            dialogContent.append($textProperty);
            dialogContent.append($inlineProperty);
            dialogContent.append($cornersProperty);
            dialogContent.append($miniProperty);
            dialogContent.append($themeProperty);

            propertyPanel.appendTo('#properties-widget');
            propertyPanel.attr('id', 'propertyFor' + property.Id);
            this.currentPropertyDiv = propertyPanel;
        };

        PropertiesView.prototype.ShowProperty_Input = function (property) {
            this.log.Debug("ShowProperty_Input");
            var self = this;
            var controlManager = App.Instance.Device.ControlManager;

            var $propertyPanel = $('#propertiesTmpl').tmpl({});
            var $dialogContent = $propertyPanel.children("#property-table");

            var $idProperty = this.CreateIdRow(property);
            var $titleProperty = this.CreateTitleRow(property);
            var $placeholderProperty = this.CreatePlaceholderRow(property);
            var $miniProperty = this.CreateMiniRow(property);
            var $themeProperty = this.CreateThemeRow(property);

            $dialogContent.append($idProperty);
            $dialogContent.append($titleProperty);
            $dialogContent.append($miniProperty);
            $dialogContent.append($themeProperty);

            $propertyPanel.appendTo('#properties-widget');
            $propertyPanel.attr('id', 'propertyFor' + property.Id);
            this.currentPropertyDiv = $propertyPanel;
        };

        PropertiesView.prototype.ShowProperty_Page = function (property) {
            this.log.Debug("ShowProperty_Page");
            var self = this;
            var controlManager = App.Instance.Device.ControlManager;

            var propertyPanel = $('#propertiesTmpl').tmpl({});
            var content = propertyPanel.children("#property-table");

            var $idProperty = this.CreateIdRow(property);
            var $themeProperty = this.CreateThemeRow(property);
            var $headerProperty = this.CreateHeaderRow(property);

            content.append($idProperty);
            content.append($themeProperty);
            content.append($headerProperty);
            propertyPanel.appendTo('#properties-widget');
            propertyPanel.attr('id', 'propertyFor' + property.Id);
            this.currentPropertyDiv = propertyPanel;
        };

        PropertiesView.prototype.ShowProperty_Header = function (property) {
            this.log.Debug("ShowProperty_Header");
            var self = this;
            var controlManager = App.Instance.Device.ControlManager;

            var propertyPanel = $('#propertiesTmpl').tmpl({});
            var content = propertyPanel.children("#property-table");

            var $titleProperty = this.CreateTitleRow(property);
            var $themeProperty = this.CreateThemeRow(property);

            content.append($titleProperty);
            content.append($themeProperty);
            propertyPanel.appendTo('#properties-widget');
            propertyPanel.attr('id', 'propertyFor' + property.Id);
            this.currentPropertyDiv = propertyPanel;
        };

        PropertiesView.prototype.ShowProperty_Label = function (property) {
            this.log.Debug("ShowProperty_Label");
            var self = this;
            var controlManager = App.Instance.Device.ControlManager;

            var propertyPanel = $('#propertiesTmpl').tmpl({});
            var content = propertyPanel.children("#property-table");

            var $idProperty = this.CreateIdRow(property);
            var $textSizeProperty = this.CreateTextSizeRow(property);
            var $textProperty = this.CreateTextTextRow(property);

            content.append($idProperty);
            content.append($textSizeProperty);
            content.append($textProperty);
            propertyPanel.appendTo('#properties-widget');
            propertyPanel.attr('id', 'propertyFor' + property.Id);
            this.currentPropertyDiv = propertyPanel;
        };

        PropertiesView.prototype.ShowProperty_Image = function (property) {
            this.log.Debug("ShowProperty_Image");
            var self = this;
            var controlManager = App.Instance.Device.ControlManager;

            var propertyPanel = $('#propertiesTmpl').tmpl({});
            var content = propertyPanel.children("#property-table");

            var $idProperty = this.CreateIdRow(property);
            var $urlProperty = this.CreateUrlRow(property);
            var $widthProperty = this.CreateWidthRow(property);
            var $heightProperty = this.CreateHeightRow(property);

            content.append($idProperty);
            content.append($urlProperty);
            content.append($widthProperty);
            content.append($heightProperty);
            propertyPanel.appendTo('#properties-widget');
            propertyPanel.attr('id', 'propertyFor' + property.Id);
            this.currentPropertyDiv = propertyPanel;
        };

        PropertiesView.prototype.ShowProperty_Map = function (property) {
            this.log.Debug("ShowProperty_Map");
            var self = this;
            var controlManager = App.Instance.Device.ControlManager;

            var propertyPanel = $('#propertiesTmpl').tmpl({});
            var content = propertyPanel.children("#property-table");

            var $idProperty = this.CreateIdRow(property);
            var $widthProperty = this.CreateWidthRow(property);
            var $heightProperty = this.CreateHeightRow(property);

            content.append($idProperty);
            content.append($widthProperty);
            content.append($heightProperty);
            propertyPanel.appendTo('#properties-widget');
            propertyPanel.attr('id', 'propertyFor' + property.Id);
            this.currentPropertyDiv = propertyPanel;
        };

        PropertiesView.prototype.ShowProperty_WebView = function (property) {
            this.log.Debug("ShowProperty_WebView");
            var self = this;
            var controlManager = App.Instance.Device.ControlManager;

            var propertyPanel = $('#propertiesTmpl').tmpl({});
            var content = propertyPanel.children("#property-table");

            var $idProperty = this.CreateIdRow(property);
            var $urlProperty = this.CreateUrlRow(property);
            var $widthProperty = this.CreateWidthRow(property);
            var $heightProperty = this.CreateHeightRow(property);

            content.append($idProperty);
            content.append($urlProperty);
            content.append($widthProperty);
            content.append($heightProperty);
            propertyPanel.appendTo('#properties-widget');
            propertyPanel.attr('id', 'propertyFor' + property.Id);
            this.currentPropertyDiv = propertyPanel;
        };

        PropertiesView.prototype.CreateIdRow = function (property) {
            return this.CreateTextRow('Id:', property.Id, 0 /* Id */, property);
        };

        PropertiesView.prototype.CreateInnerTextRow = function (property) {
            return this.CreateTextRow('Text:', property.Text, 1 /* Text */, property);
        };

        PropertiesView.prototype.CreateThemeRow = function (property) {
            return this.CreateSelectRow('Theme:', property.Theme, 5 /* Theme */, this.themes, property);
        };

        PropertiesView.prototype.CreateTitleRow = function (property) {
            return this.CreateTextRow('Title:', property.Title, 6 /* Title */, property);
        };

        PropertiesView.prototype.CreateTextTextRow = function (property) {
            return this.CreateTextRow('Text:', property.Text, 1 /* Text */, property);
        };

        PropertiesView.prototype.CreateUrlRow = function (property) {
            return this.CreateTextRow('Url:', property.Url, 13 /* Url */, property);
        };

        PropertiesView.prototype.CreatePlaceholderRow = function (property) {
            return this.CreateTextRow('Placeholder:', property.Placeholder, 10 /* Placeholder */, property);
        };

        PropertiesView.prototype.CreateMiniRow = function (property) {
            return this.CreateTrueFalseSelectRow('Mini:', String(property.Mini), 4 /* Mini */, property);
        };

        PropertiesView.prototype.CreateRoundCornersRow = function (property) {
            return this.CreateTrueFalseSelectRow('Rounded corners:', String(property.Corners), 3 /* Corners */, property);
        };

        PropertiesView.prototype.CreateInlineRow = function (property) {
            return this.CreateTrueFalseSelectRow('Inline:', String(property.Inline), 2 /* Inline */, property);
        };

        PropertiesView.prototype.CreateHeaderRow = function (property) {
            return this.CreateTrueFalseSelectRow('Header:', String(property.Header), 7 /* Header */, property);
        };

        PropertiesView.prototype.CreatePaddingRow = function (property) {
            return this.CreateSizeInputRow('Padding:', String(property.Padding), 9 /* Padding */, property);
        };

        PropertiesView.prototype.CreateWidthRow = function (property) {
            return this.CreateSizeInputRow('Width:', String(property.Width), 11 /* Width */, property);
        };

        PropertiesView.prototype.CreateHeightRow = function (property) {
            return this.CreateSizeInputRow('Height:', String(property.Height), 12 /* Height */, property);
        };

        PropertiesView.prototype.CreateTextSizeRow = function (property) {
            return this.CreateSizeInputRow('Font Size:', String(property.TextSize), 14 /* TextSize */, property);
        };

        //private CreateHeaderRow(property: any): JQuery {
        //    return this.CreateTextRow('Header:', property.Header, Enums.PropertyType.Header, property);
        //}
        PropertiesView.prototype.CreateTextRow = function (name, value, propertyType, property) {
            var controlManager = App.Instance.Device.ControlManager;
            var $textProperty = $('#propertyTextTmpl').tmpl({
                name: name,
                value: value
            });
            $textProperty.find('input').change(function () {
                controlManager.ChangeProperty(property.Id, propertyType, property.Type, $(this).val());
            });
            return $textProperty;
        };

        //TODO: add check
        PropertiesView.prototype.CreateSizeInputRow = function (name, value, propertyType, property) {
            var controlManager = App.Instance.Device.ControlManager;
            var $textProperty = $('#propertyTextTmpl').tmpl({
                name: name,
                value: value
            });
            $textProperty.find('input').change(function () {
                controlManager.ChangeProperty(property.Id, propertyType, property.Type, $(this).val());
            });
            return $textProperty;
        };

        PropertiesView.prototype.CreateSelectRow = function (name, value, propertyType, options, property) {
            var controlManager = App.Instance.Device.ControlManager;
            var $themeProperty = $('#propertySelectTmpl').tmpl({
                name: name
            });

            var themeSelect = $themeProperty.find('select');
            $("#templateOptionItem").tmpl(options).appendTo(themeSelect);

            themeSelect.val(value);
            themeSelect.change(function () {
                controlManager.ChangeProperty(property.Id, propertyType, property.Type, $(this).val());
            });
            return $themeProperty;
        };

        PropertiesView.prototype.CreateTrueFalseSelectRow = function (name, value, propertyType, property) {
            var controlManager = App.Instance.Device.ControlManager;
            var $themeProperty = $('#propertySelectTmpl').tmpl({
                name: name
            });

            var themeSelect = $themeProperty.find('select');
            $("#templateOptionItem").tmpl(this.trueFalseOptions).appendTo(themeSelect);

            themeSelect.val(value);
            themeSelect.change(function () {
                controlManager.ChangeProperty(property.Id, propertyType, property.Type, $(this).val());
            });
            return $themeProperty;
        };
        return PropertiesView;
    })();

    
    return PropertiesView;
});
//# sourceMappingURL=PropertiesView.js.map
