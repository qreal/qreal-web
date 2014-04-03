define(["require", "exports", "src/Application", "src/util/log/Log"], function(require, exports, App, Log) {
    var DesignerControlFactory = (function () {
        function DesignerControlFactory() {
            this.log = new Log("DesignerControlFactory");
        }
        DesignerControlFactory.prototype.CreatePage = function (property) {
            var $page = $('<div></div>');
            $page.data('role', 'page');
            $page.attr('id', property.Id);
            $page.attr('class', 'sortcontainer');

            return $page;
        };

        DesignerControlFactory.prototype.CreateHeader = function (property) {
            var _this = this;
            var $header = $('<div></div>');
            $header.attr('id', property.Id);
            $header.attr('data-role', 'header');
            $header.addClass('nondraggable');
            var $title = $('<h1></h1>');
            $title.text(property.Title);
            $header.append($title);

            $header.on('click', function (event) {
                event.preventDefault();
                _this.log.Debug('bt click');
                App.Instance.Designer.ShowProperty(property);
            });

            return $header;
        };

        DesignerControlFactory.prototype.CreateButton = function (property) {
            var _this = this;
            var $bt = $('<a href="#"></a>');

            $bt.attr('data-role', 'button');
            $bt.attr('id', property.Id);
            $bt.attr('class', 'item');
            $bt.text(property.Text);

            $bt.on('click', function (event) {
                event.preventDefault();
                _this.log.Debug('bt click');
                App.Instance.Designer.ShowProperty(property);
            });
            return $bt;
        };

        DesignerControlFactory.prototype.CreateInput = function (property) {
            var _this = this;
            var $container = $("<div></div>");
            $container.attr('data-role', 'fieldcontain');
            var $label = $("<label></label>");
            $label.text(property.Title);
            $label.attr('for', property.Id);

            var $input = $('<input />');
            $input.attr('type', 'text');

            $input.attr('name', property.Name);
            $input.attr('id', property.Id);
            $container.append($label);
            $container.append($input);

            $container.on('click', function (event) {
                event.preventDefault();
                _this.log.Debug('input click');
                App.Instance.Designer.ShowProperty(property);
            });

            this.log.Debug('input: ', $container);
            $container.find('input').textinput();
            return $container;
        };
        return DesignerControlFactory;
    })();

    
    return DesignerControlFactory;
});
//# sourceMappingURL=DesignerControlFactory.js.map
