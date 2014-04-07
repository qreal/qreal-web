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
        var $header = $('<div/>', {
            'data-role': 'header',
            'data-position': 'fixed'
        });
        $('<h1>sdfgdsfg</h1>').appendTo($header);
        var $content = $('<div/>', {
            'data-role': 'content'
        });
        var $footer = $('<div/>', {
            'data-role': 'footer',
            'data-position': 'fixed'
        });
        //$page.append($header);
        $page.append($content);
        //$page.append($footer);
        return $page;
    }

    public CreateButton(property: ControlProperty.ButtonProperty): JQuery {
        var $bt = $('<a href="#">');
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
    }

    public CreateHeader(property: ControlProperty.HeaderProperty): JQuery {
        var $header = $('<div>');
        $header.attr('id', property.Id);
        $header.attr('data-role', 'header');
        var $title = $('<h1>');
        $title.text(property.Title);
        $header.append($title);
        return $header;
    }
}

export = AppControlFactory; 