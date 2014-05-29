var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "src/Application", "src/util/log/Log", "src/model/Enums", "src/util/Helper", "src/device/AppControlFactory"], function(require, exports, App, Log, Enums, Helper, AppControlFactory) {
    var DesignerControlFactory = (function (_super) {
        __extends(DesignerControlFactory, _super);
        function DesignerControlFactory() {
            _super.call(this);
            this.log = new Log("DesignerControlFactory");
            ;
        }
        DesignerControlFactory.prototype.CreateControl = function (property) {
            console.log('CreateControl', property);
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
                case 6 /* Label */:
                    return this.CreateLabel(property);
                    break;
                case 7 /* Image */:
                    return this.CreateImage(property);
                    break;
                case 5 /* Map */:
                    return this.CreateMap(property);
                    break;
                case 8 /* WebView */:
                    return this.CreateWebView(property);
                    break;
            }
        };

        DesignerControlFactory.prototype.CreatePage = function (property) {
            var $page = _super.prototype.CreatePage.call(this, property);
            var $content = $page.find('div[role=main]');
            var controlManager = App.Instance.Device.ControlManager;
            $page.on('drop', function (event) {
                return controlManager.OnDrop(event, property.Id);
            });
            $page.on('dragover', function (event) {
                return controlManager.OnDragOver(event);
            });

            $content.sortable({
                forcePlaceholderSize: true,
                containment: "document",
                cancel: '.nondraggable',
                start: function (event, ui) {
                    ui.placeholder.height(ui.item.height());
                    ui.item.startPos = ui.item.index();
                },
                stop: function (e, ui) {
                    console.log;
                    var container = controlManager.FindById(property.Id);
                    Helper.ArrayMove(container.Childrens, ui.item.startPos, ui.item.index());
                },
                delay: 100,
                placeholder: "ui-state-highlight"
            });

            //$page.attr('class', 'sortcontainer');
            return $page;
        };

        DesignerControlFactory.prototype.CreateHeader = function (property) {
            var $header = _super.prototype.CreateHeader.call(this, property);
            $header.addClass('nondraggable');

            $header.on('click', function (event) {
                event.preventDefault();
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
            return $bt;
        };

        DesignerControlFactory.prototype.CreateInput = function (property) {
            var $input = _super.prototype.CreateInput.call(this, property);
            $input.find('input').textinput();
            $input.on('click', function (event) {
                event.preventDefault();
                App.Instance.Designer.ShowProperty(property);
            });

            return $input;
        };

        DesignerControlFactory.prototype.CreateMap = function (property) {
            var $map = _super.prototype.CreateMap.call(this, property);
            $map.css('background-color', '#aaa');
            $map.on('click', function (event) {
                event.preventDefault();
                App.Instance.Designer.ShowProperty(property);
            });
            return $map;
        };

        DesignerControlFactory.prototype.CreateLabel = function (property) {
            var $label = _super.prototype.CreateLabel.call(this, property);
            $label.on('click', function (event) {
                event.preventDefault();
                App.Instance.Designer.ShowProperty(property);
            });
            return $label;
        };

        DesignerControlFactory.prototype.CreateImage = function (property) {
            var $img = _super.prototype.CreateImage.call(this, property);
            $img.on('click', function (event) {
                event.preventDefault();
                App.Instance.Designer.ShowProperty(property);
            });
            return $img;
        };

        DesignerControlFactory.prototype.CreateWebView = function (property) {
            var $webView = $("<div>");
            $webView.attr('id', property.Id);
            $webView.css({
                'width': property.Width,
                'height': property.Height,
                'display': 'block',
                'margin-left': 'auto',
                'margin-right': 'auto',
                'border': '1px solid gray'
            });
            var $label = $('<div>');
            $label.css({
                'text-align': 'center',
                'margin-top': '10px'
            });
            $label.clone().text('WebView').appendTo($webView);
            $label.clone().text('Url:' + property.Url).appendTo($webView);

            $webView.bind('click', function (event) {
                event.preventDefault();
                App.Instance.Designer.ShowProperty(property);
            });

            return $webView;
        };
        return DesignerControlFactory;
    })(AppControlFactory);

    
    return DesignerControlFactory;
});
//# sourceMappingURL=DesignerControlFactory.js.map
