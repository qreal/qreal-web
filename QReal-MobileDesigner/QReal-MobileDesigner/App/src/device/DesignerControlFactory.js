var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "src/Application", "src/util/log/Log", "src/model/Enums", "src/device/AppControlFactory"], function(require, exports, App, Log, Enums, AppControlFactory) {
    var DesignerControlFactory = (function (_super) {
        __extends(DesignerControlFactory, _super);
        function DesignerControlFactory() {
            _super.call(this);
            this.log = new Log("DesignerControlFactory");
            ;
        }
        DesignerControlFactory.prototype.CreateControl = function (property) {
            switch (property.Type) {
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

        DesignerControlFactory.prototype.CreatePage = function (property) {
            var $page = _super.prototype.CreatePage.call(this, property);
            $page.attr('class', 'sortcontainer');

            return $page;
        };

        DesignerControlFactory.prototype.CreateHeader = function (property) {
            var _this = this;
            var $header = _super.prototype.CreateHeader.call(this, property);
            $header.addClass('nondraggable');

            $header.on('click', function (event) {
                event.preventDefault();
                _this.log.Debug('bt click');
                App.Instance.Designer.ShowProperty(property);
            });

            return $header;
        };

        DesignerControlFactory.prototype.CreateButton = function (property) {
            var _this = this;
            var $bt = _super.prototype.CreateButton.call(this, property);

            $bt.on('click', function (event) {
                event.preventDefault();
                _this.log.Debug('bt click');
                App.Instance.Designer.ShowProperty(property);
            });
            return $bt.button();
        };

        DesignerControlFactory.prototype.CreateInput = function (property) {
            var $input = _super.prototype.CreateInput.call(this, property);

            $input.on('click', function (event) {
                event.preventDefault();
                App.Instance.Designer.ShowProperty(property);
            });

            $input.find('input').textinput();
            return $input;
        };
        return DesignerControlFactory;
    })(AppControlFactory);

    
    return DesignerControlFactory;
});
//# sourceMappingURL=DesignerControlFactory.js.map
