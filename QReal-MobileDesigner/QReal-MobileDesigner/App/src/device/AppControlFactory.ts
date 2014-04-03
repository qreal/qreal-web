import App = require("src/Application");
import Log = require("src/util/log/Log");
import Enums = require("src/model/Enums");
import DesignerControls = require("src/model/DesignerControls");
import ControlProperty = require("src/model/ControlProperty");


class AppControlFactory{

    private log = new Log("AppControlFactory");

    constructor() {
    }

    public CreateControl(property: ControlProperty.Property): JQuery {
        switch (property.Type) {
            case Enums.ControlType.App:
                return this.CreateApp(property);
                break;
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

    public CreateApp(property: ControlProperty.Property): JQuery {
        var $app = $('<div></div>');
        return $app;
    }

    public CreatePage(property: ControlProperty.PageProperty): JQuery {
        var $page = $('<div></div>');
        $page.data('role', 'page');
        $page.attr('id', property.Id);
        return $page;
    }

    public CreateButton(property: ControlProperty.ButtonProperty): JQuery {
        var $bt = $('<a href="#"></a>');
        $bt.attr('data-role', 'button');
        $bt.attr('id', property.Id);
        $bt.text(property.Text);
        $bt.attr('data-mini', property.MiniString);
        $bt.attr('data-corners', property.CornersString);
        $bt.attr('data-inline', property.InlineString);
        $bt.attr('data-theme', property.Theme);
        return $bt;
    }

    public CreateInput(property: ControlProperty.InputProperty): JQuery {
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
    }

    public CreateHeader(property: ControlProperty.HeaderProperty): JQuery {
        var $header = $('<div></div>');
        $header.attr('id', property.Id);
        $header.attr('data-role', 'header');
        var $title = $('<h1></h1>');
        $title.text(property.Title);
        $header.append($title);
        return $header;
    }
}

export = AppControlFactory; 