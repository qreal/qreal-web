define(["require", "exports", "src/util/log/Log", "src/model/Enums"], function(require, exports, Log, Enums) {
    var AppControlFactory = (function () {
        function AppControlFactory() {
            this.log = new Log("AppControlFactory");
        }
        AppControlFactory.prototype.CreateControl = function (property) {
            switch (property.Type) {
                case 0 /* App */:
                    return this.CreateApp(property);
                    break;
                case 1 /* Page */:
                    return this.CreatePage(property);
                    break;
                case 2 /* Header */:
                    return this.CreateHeader(property);
                    break;
                case 3 /* Button */:
                    return this.CreateButton(property);
                    break;
                case 4 /* Input */:
                    return this.CreateInput(property);
                    break;
            }
        };

        AppControlFactory.prototype.CreateApp = function (property) {
            var $app = $('<div>');
            return $app;
        };

        AppControlFactory.prototype.CreatePage = function (property) {
            var $page = $('<div>', {
                'id': property.Id,
                'data-role': 'page',
                'data-theme': property.Theme
            });
            var $main = $('<div/>', {
                'role': 'main'
            });
            $main.addClass('ui-content');
            $page.append($main);
            return $page;
        };

        AppControlFactory.prototype.CreateButton = function (property) {
            var $bt = $('<a href="#">', {
                'id': property.Id
            });
            $bt.text(property.Text);
            $bt.addClass('ui-btn');
            if (property.Corners) {
                $bt.addClass('ui-corner-all');
            }
            if (property.Inline) {
                $bt.addClass('ui-btn-inline');
            }
            if (property.Mini) {
                $bt.addClass('ui-mini');
            }
            $bt.addClass('ui-btn-' + property.Theme);
            return $bt;
        };

        AppControlFactory.prototype.CreateInput = function (property) {
            var $container = $("<div>");
            $container.attr('data-role', 'fieldcontain');

            var $label = $("<label>");
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
            var $header = $('<div>');
            $header.attr('id', property.Id);
            $header.attr('data-role', 'header');
            var $title = $('<h1>');
            $title.text(property.Title);
            $header.append($title);
            return $header.toolbar();
        };
        return AppControlFactory;
    })();

    
    return AppControlFactory;
});
//# sourceMappingURL=AppControlFactory.js.map
