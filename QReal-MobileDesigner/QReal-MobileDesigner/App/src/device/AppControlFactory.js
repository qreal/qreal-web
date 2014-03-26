define(["require", "exports", "src/util/log/Log", "src/model/DesignerControls"], function(require, exports, Log, DesignerControls) {
    var AppControlFactory = (function () {
        function AppControlFactory() {
            this.log = new Log("AppControlFactory");
        }
        AppControlFactory.prototype.CreatePage = function (property) {
            var page = new DesignerControls.Page(property);
            var $page = $('<div></div>');
            $page.data('role', 'page');
            $page.attr('id', property.Id);
            page.Element = $page;
            return page;
        };

        AppControlFactory.prototype.CreateButton = function (property) {
            var button = new DesignerControls.Button(property);
            var $bt = $('<a href="#"></a>');

            $bt.attr('data-role', 'button');
            $bt.attr('id', button.Properties.Id);
            $bt.text(button.Properties.Text);
            button.Element = $bt;
            return button;
        };

        AppControlFactory.prototype.CreateInput = function (property) {
            var input = new DesignerControls.Input(property);

            var $container = $("<div data-role='fieldcontain'></div>");
            var $label = $("<label></label>");
            $label.text(input.Properties.Title);
            $label.attr('for', input.Properties.Id);

            var $input = $('<input />');
            $input.attr('type', 'text');
            $input.attr('id', input.Properties.Id);
            $input.attr('name', input.Properties.Name);

            $container.append($label);
            $container.append($input);

            input.Element = $container;
            return input;
        };
        return AppControlFactory;
    })();

    
    return AppControlFactory;
});
//# sourceMappingURL=AppControlFactory.js.map
