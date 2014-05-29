import App = require("src/Application");
import Log = require("src/util/log/Log");
import Enums = require("src/model/Enums");
import DesignerControls = require("src/model/DesignerControls");
import ControlProperty = require("src/model/ControlProperty");

declare var google;


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
            case Enums.ControlType.Label:
                return this.CreateLabel(<any>property);
                break;
            case Enums.ControlType.Image:
                return this.CreateImage(<any>property);
                break;
            case Enums.ControlType.Map:
                return this.CreateMap(<any>property);
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
            'data-role': 'page'
        });
        if (property.Theme != 'default') {
            $page.attr('data-theme', property.Theme);
        }
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
        if (property.Theme != 'default') {
            $bt.addClass('ui-btn-' + property.Theme);
        }
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
        var $header = $('<div>', {
            'id': property.Id,
            'data-role': 'header'
        });
        if (property.Theme) {
            $header.attr('data-theme', property.Theme);
        }
        var $title = $('<h1>');
        $title.text(property.Title);
        $header.append($title);
        return (<any>$header).toolbar();
    }


    public CreateMap(property: ControlProperty.MapProperty): JQuery {
        var $map = $("<div>");
        $map.css('width', "100%");
        $map.css('height', "300px");
        $map.attr('id', property.Id);
        return $map;
    }

    public CreateLabel(property: ControlProperty.LabelProperty): JQuery {
        var $label = $("<label>");
        $label.text(property.Text);
        $label.attr('id', property.Id);
        $label.css('font-size', property.TextSize);
        return $label;
    }

    public CreateImage(property: ControlProperty.ImageProperty): JQuery {
        var $image = $("<img>");
        $image.attr('id', property.Id);
        $image.attr('src', property.Url);
        $image.css({
            'width': property.Width,
            'height': property.Height
        });
        return $image;
    }
}

export = AppControlFactory; 