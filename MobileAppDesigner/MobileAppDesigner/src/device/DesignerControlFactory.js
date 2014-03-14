define(["require", "exports", "src/Application", "src/util/log/Log", "src/model/controls/Button", "src/model/controls/Input", "src/model/controls/Page"], function(require, exports, App, Log, Button, Input, Page) {
    var DesignerControlFactory = (function () {
        function DesignerControlFactory() {
            this.log = new Log("DesignerControlFactory");
        }
        DesignerControlFactory.prototype.CreatePage = function (id) {
            //this.idList.push(pageId);
            var page = new Page(id);
            var $page = $('<div></div>');
            $page.data('role', 'page');
            $page.attr('id', id);

            $page.on('drop', function (event) {
                return page.OnDrop(event);
            });
            $page.on('dragover', function (event) {
                return page.OnDragOver(event);
            });
            page.Element = $page;
            return page;
        };

        DesignerControlFactory.prototype.CreateButton = function (id) {
            var _this = this;
            var button = new Button(id);
            var $bt = $('<a href="#"></a>');

            $bt.data('role', 'button');
            $bt.attr('id', button.Properties.Id);
            $bt.text(button.Properties.Text);

            $bt.on('click', function (event) {
                _this.log.Debug('bt click');
                App.Instance.Designer.ShowProperty(button.Properties);
            });

            button.Element = $bt.button();
            return button;
        };

        DesignerControlFactory.prototype.CreateInput = function (id) {
            var _this = this;
            var input = new Input(id);
            var $input = $('<input />');

            $input.attr('type', 'text');
            $input.attr('id', input.Properties.Id);
            $input.attr('name', input.Properties.Name);

            $input.on('click', function (event) {
                _this.log.Debug('input click');
                App.Instance.Designer.ShowProperty(input.Properties);
            });

            this.log.Debug('input: ', $input);
            input.Element = $input;
            return input;
        };
        return DesignerControlFactory;
    })();

    
    return DesignerControlFactory;
});
//# sourceMappingURL=DesignerControlFactory.js.map
