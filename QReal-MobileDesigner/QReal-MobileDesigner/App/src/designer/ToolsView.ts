declare var bootbox;
import Log = require("src/util/log/Log");
import App = require("src/Application");
import Controller = require("src/designer/Designer");
import EventManager = require("src/util/events/EventManager");


class ToolsView {

    private log = new Log("ToolsView");

    private controls = [
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
            id: 'Checkbox2',
            title: 'Checkbox2',
            tool: 'checkbox2'
        },
        {
            id: 'Label',
            title: 'Label',
            tool: ''
        },
        {
            id: 'Image',
            title: 'Image',
            tool: ''
        },
        {
            id: 'Map',
            title: 'Map',
            tool: ''
        },
        {
            id: 'WebView',
            title: 'WebView',
            tool: ''
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

    constructor() {
    }

    public Init() {
        var self = this;
        this.log.Debug("Init");

        //Controlls
        $('#toolTmpl').tmpl(this.controls).appendTo('#controls-widget');

        var toolItems = $('.tool-item');

        toolItems.on('dragstart', event => this.OnDragStart(event));
        toolItems.on('drag', event => this.OnDrag(event));
        toolItems.on('dragend', () => this.OnDragend());

        //Pages
        $('.pages-list').on('click', 'a', function (e) {
            self.ToogleListState($(e.target));
            App.Instance.Device.ControlManager.SelectPage($(e.target).data('pageid'));
        });

        $('#addPage').click(function (e) {
            bootbox.prompt("Enter a new page name:", function (pageName) {
                if (pageName) {
                    self.AddNewPage(pageName);
                }
            });

        });

        App.Instance.Designer.EventManager.AddSubscriber(EventManager.OnDeviceLoaded, {
            OnEvent: function (data) {
                self.log.Debug("Device loaded");
                self.AddNewPage("Main Page");
            }
        });
    }

    public OnDragStart(event) {
        this.log.Debug("OnDragStart: ");
        event.originalEvent.dataTransfer.setData("Text", $(event.target).closest('div').attr('id'));
    }

    public OnDrag(event) {
        //this.log.Debug("OnDrag: " + event);
    }

    public OnDragend() {
        this.log.Debug("OnDragend");
    }

    public AddNewPage(pageName: string) {
        this.log.Debug("PageName: " + pageName);
        var pageId = pageName.trim().replace(' ', '_');
        var result = App.Instance.Device.ControlManager.CreatePage(pageId);
        if (result) {
            var pageItem = $('#templatePageItem').tmpl({
                name: pageName,
                page_id: pageId
            });
            pageItem.appendTo('#pages .pages-list');
            this.ToogleListState(pageItem);
        }
    }

    private ToogleListState(element: JQuery): void {
        var previous = element.closest(".list-group").children(".active");
        previous.removeClass('active'); // previous list-item
        element.addClass('active'); // activated list-item

        var id = element.data('pageid');
        var page = App.Instance.Device.ControlManager.FindById(id);
        App.Instance.Designer.ShowProperty(page.Properties);
    }
}

export = ToolsView;