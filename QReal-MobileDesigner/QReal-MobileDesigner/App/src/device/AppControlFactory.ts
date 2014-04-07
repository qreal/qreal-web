import App = require("src/Application");
import Log = require("src/util/log/Log");
import Enums = require("src/model/Enums");
import DesignerControls = require("src/model/DesignerControls");
import ControlProperty = require("src/model/ControlProperty");


class AppControlFactory {

    log = new Log("AppControlFactory");

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
        var $app = $('<div>');
        return $app;
    }

    public CreatePage(property: ControlProperty.PageProperty): JQuery {
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
    }

    public CreateButton(property: ControlProperty.ButtonProperty): JQuery {
        var $bt = $('<a>', {
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
    }

    public CreateInput(property: ControlProperty.InputProperty): JQuery {
        var $container = $("<div>");
        $container.addClass('ui-field-contain');

        var $label = $("<label>", {
            'for': property.Id
        });
        $label.text(property.Title);

        var $input = $('<input>', {
            'id': property.Id,
            'type': 'text',
            'data-mini': property.Mini   
        });

        $container.append($label);
        $container.append($input);     
        return $container;
    }

    public CreateHeader(property: ControlProperty.HeaderProperty): JQuery {
        var $header = $('<div>');
        $header.attr('id', property.Id);
        $header.attr('data-role', 'header');
        var $title = $('<h1>');
        $title.text(property.Title);
        $header.append($title);
        return (<any>$header).toolbar();
    }
}

export = AppControlFactory; 