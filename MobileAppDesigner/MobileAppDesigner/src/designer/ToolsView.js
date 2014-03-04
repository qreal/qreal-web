define(["require", "exports", "src/util/log/Log", "src/Application"], function(require, exports, Log, App) {
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
            this.log.Debug("Init");
            $('#toolTmpl').tmpl(this.controls).appendTo('#controls');

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

            var self = this;
            $('#pages .pages-list').on("selectableselected", function (event, component, ui) {
                self.log.Debug('selectableselected, event: ', { event: event, ui: ui });
                App.Instance.Device.ControlManager.SelectPage($(ui.selected).text());
            });

            $('#addPage').click(function (e) {
                //TODO: create normal dialog
                var pageName = prompt('New page', 'MyPage');
                if (pageName) {
                    self.AddNewPage(pageName);
                }
            });

            var pageItem = $('#templatePageItem').tmpl({ name: 'MainPage' });
            pageItem.appendTo('#pages .pages-list');
            pageItem.select();
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

        ToolsView.prototype.AddNewPage = function (pageId) {
            this.log.Debug("PageName: " + pageId);
            var result = App.Instance.Device.ControlManager.CreatePage(pageId);
            if (result) {
                var pageItem = $('#templatePageItem').tmpl({ name: pageId });
                pageItem.appendTo('#pages .pages-list');
                pageItem.select();
            }
        };
        return ToolsView;
    })();

    
    return ToolsView;
});
//# sourceMappingURL=ToolsView.js.map
