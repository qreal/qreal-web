define(["require", "exports", "src/util/log/Log", "src/Application", "src/util/events/EventManager"], function(require, exports, Log, App, EventManager) {
    var ToolsView = (function () {
        function ToolsView() {
            this.log = new Log("ToolsView");
            this.controls = [
                {
                    id: 'Button',
                    title: 'Button',
                    tool: 'button'
                },
                {
                    id: 'Input',
                    title: 'Input',
                    tool: 'input'
                },
                {
                    id: 'Selection',
                    title: 'Selection',
                    tool: 'selection'
                },
                {
                    id: 'Checkbox',
                    title: 'Checkbox',
                    tool: 'checkbox'
                },
                {
                    id: 'Checkbox2',
                    title: 'Checkbox2',
                    tool: 'checkbox2'
                },
                {
                    id: 'Header',
                    title: 'Header',
                    tool: 'header'
                },
                {
                    id: 'Header2',
                    title: 'Header2',
                    tool: 'header2'
                },
                {
                    id: 'Footer',
                    title: 'Footer',
                    tool: 'footer'
                },
                {
                    id: 'Navbar',
                    title: 'Navbar',
                    tool: 'navbar'
                },
                {
                    id: 'Grid',
                    title: 'Grid',
                    tool: 'grid'
                },
                {
                    id: 'ControlGroup',
                    title: 'Control group',
                    tool: 'controlgroup'
                }
            ];
        }
        ToolsView.prototype.Init = function () {
            var _this = this;
            var self = this;
            this.log.Debug("Init");

            //Controlls
            $('#toolTmpl').tmpl(this.controls).appendTo('#controls-widget');

            var toolItems = $('.tool-item');

            toolItems.on('dragstart', function (event) {
                return _this.OnDragStart(event);
            });
            toolItems.on('drag', function (event) {
                return _this.OnDrag(event);
            });
            toolItems.on('dragend', function () {
                return _this.OnDragend();
            });

            //Pages
            $('.pages-list').on('click', 'a', function (e) {
                self.ToogleListState($(e.target));
                App.Instance.Device.ControlManager.SelectPage($(e.target).data('pageid'));
            });

            $('#addPage').click(function (e) {
                //TODO: create normal dialog
                var pageName = prompt('New page', 'MyPage');
                if (pageName) {
                    self.AddNewPage(pageName);
                }
            });

            App.Instance.Designer.EventManager.AddSubscriber(EventManager.OnDeviceLoaded, {
                OnEvent: function (data) {
                    self.log.Debug("Device loaded");
                    self.AddNewPage("Main Page");
                }
            });
        };

        ToolsView.prototype.OnDragStart = function (event) {
            this.log.Debug("OnDragStart: ");
            event.originalEvent.dataTransfer.setData("Text", $(event.target).closest('div').attr('id'));
        };

        ToolsView.prototype.OnDrag = function (event) {
            //this.log.Debug("OnDrag: " + event);
        };

        ToolsView.prototype.OnDragend = function () {
            this.log.Debug("OnDragend");
        };

        ToolsView.prototype.AddNewPage = function (pageName) {
            this.log.Debug("PageName: " + pageName);
            var pageId = pageName.trim().replace(' ', '_');
            this.log.Debug("pageId: " + pageId);
            var result = App.Instance.Device.ControlManager.CreatePage(pageId);
            if (result) {
                var pageItem = $('#templatePageItem').tmpl({
                    name: pageName,
                    page_id: pageId
                });
                pageItem.appendTo('#pages .pages-list');
                this.ToogleListState(pageItem);
            }
        };

        ToolsView.prototype.ToogleListState = function (element) {
            var previous = element.closest(".list-group").children(".active");
            previous.removeClass('active'); // previous list-item
            element.addClass('active'); // activated list-item
        };
        return ToolsView;
    })();

    
    return ToolsView;
});
//# sourceMappingURL=ToolsView.js.map
