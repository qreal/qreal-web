import App = require("src/Application");
import Log = require("src/util/log/Log");
import Enums = require("src/model/Enums");
import Helper = require("src/util/Helper");
import DesignerControls = require("src/model/DesignerControls");
import ControlProperty = require("src/model/ControlProperty");
import AppControlFactory = require("src/device/AppControlFactory");


class DesignerControlFactory extends AppControlFactory {

    constructor() {
        super();
        this.log = new Log("DesignerControlFactory");;
    }

    public CreateControl(property: ControlProperty.Property): JQuery {
        switch (property.Type) {
            case Enums.ControlType.Page:
                return this.CreatePage(<any>property);
                break;
            case Enums.ControlType.Header:
                return this.CreateHeader(<any>property);
                break;
            case Enums.ControlType.Button:
                return this.CreateButton(<any>property);
                break;
            case Enums.ControlType.Input:
                return this.CreateInput(<any>property);
                break;
        }
    }

    public CreatePage(property: ControlProperty.PageProperty): JQuery {
        var $page = super.CreatePage(property);
        var $content = $page.find('div[data-role=content]');
        var controlManager = App.Instance.Device.ControlManager;
        $page.on('drop', event => controlManager.OnDrop(event, property.Id));
        $page.on('dragover', event => controlManager.OnDragOver(event));

        (<any>$content).sortable(
            {
                forcePlaceholderSize: true,
                containment: "document",
                cancel: '.nondraggable',
                start: function (event, ui) {
                    ui.placeholder.height(ui.item.height());
                    ui.item.startPos = ui.item.index();
                },
                stop: function (e, ui) {
                    var container = <DesignerControls.BaseContainer<ControlProperty.Property>>controlManager.FindById(e.target.id);
                    Helper.ArrayMove(container.Childrens, ui.item.startPos, ui.item.index());
                },
                delay: 100,
                placeholder: "ui-state-highlight"
            });
        //$page.attr('class', 'sortcontainer');
        return $page;
    }

    public CreateHeader(property: ControlProperty.HeaderProperty): JQuery {
        var $header = super.CreateHeader(property);
        $header.addClass('nondraggable');

        $header.on('click', event => {
            event.preventDefault();
            this.log.Debug('bt click');
            App.Instance.Designer.ShowProperty(property);
        });

        return $header;
    }

    public CreateButton(property: ControlProperty.ButtonProperty): JQuery {
        var $bt = super.CreateButton(property);

        $bt.on('click', event => {
            event.preventDefault();
            this.log.Debug('bt click');
            App.Instance.Designer.ShowProperty(property);
        });
        return $bt.button();
    }

    public CreateInput(property: ControlProperty.InputProperty): JQuery {
        var $input = super.CreateInput(property);

        $input.on('click', event => {
            event.preventDefault();
            App.Instance.Designer.ShowProperty(property);
        });

        $input.find('input').textinput();
        return $input;
    }
}

export = DesignerControlFactory;