define(["require", "exports", "src/Application", "src/util/log/Log", "src/model/controls/Button"], function(require, exports, App, Log, Button) {
    var DesignerControlFactory = (function () {
        function DesignerControlFactory() {
            this.log = new Log("DesignerControlFactory");
        }
        DesignerControlFactory.prototype.CreatePage = function (id) {
            return "";
        };

        DesignerControlFactory.prototype.CreateButton = function (id) {
            var _this = this;
            var button = new Button(id);
            button.Element = $('<a href="#" data-role="button"></a>');

            button.Element.attr('id', button.Properties.Id);
            button.Element.text(button.Properties.Text);

            button.Element.on('click', function (event) {
                _this.log.Debug('bt click');
                App.Instance.Designer.ShowProperty($(event.target).data('prop'));
            });

            button.Element = button.Element.button();
            button.Element.children('.ui-btn-inner').data('prop', button.Properties);
            return button;
        };
        return DesignerControlFactory;
    })();

    
    return DesignerControlFactory;
});
//# sourceMappingURL=DesignerControlFactory.js.map
