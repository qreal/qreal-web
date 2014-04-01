define(["require", "exports", "src/util/log/Log"], function(require, exports, Log) {
    var AppControlFactory = (function () {
        function AppControlFactory() {
            this.log = new Log("AppControlFactory");
        }
        AppControlFactory.prototype.CreateApp = function (property) {
            var $app = $('<div></div>');
            return $app;
        };

        AppControlFactory.prototype.CreatePage = function (property) {
            var $page = $('<div></div>');
            $page.data('role', 'page');
            $page.attr('id', property.Id);
            return $page;
        };

        AppControlFactory.prototype.CreateButton = function (property) {
            var $bt = $('<a href="#"></a>');
            $bt.attr('data-role', 'button');
            $bt.attr('id', property.Id);
            $bt.text(property.Text);
            $bt.attr('data-mini', property.MiniString);
            $bt.attr('data-corners', property.CornersString);
            $bt.attr('data-inline', property.InlineString);
            $bt.attr('data-theme', property.Theme);
            return $bt;
        };

        AppControlFactory.prototype.CreateInput = function (property) {
            var $container = $("<div></div>");
            $container.attr('data-role', 'fieldcontain');

            var $label = $("<label></label>");
            $label.text(property.Title);
            $label.attr('for', property.Id);

            var $input = $('<input />');
            $input.attr('type', 'text');
            $input.attr('id', property.Id);
            $input.attr('name', property.Name);

            $container.append($label);
            $container.append($input);
            return $container;
        };

        AppControlFactory.prototype.CreateHeader = function (property) {
            var $header = $('<div></div>');
            $header.attr('id', property.Id);
            $header.attr('data-role', 'header');
            var $title = $('<h1></h1>');
            $title.text(property.Title);
            $header.append($title);
            return $header;
        };
        return AppControlFactory;
    })();

    
    return AppControlFactory;
});
//# sourceMappingURL=AppControlFactory.js.map
