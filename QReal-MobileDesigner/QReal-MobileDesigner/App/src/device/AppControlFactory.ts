import App = require("src/Application");
import Log = require("src/util/log/Log");
import DesignerControls = require("src/model/DesignerControls");
import ControlProperty = require("src/model/ControlProperty");


class AppControlFactory{

    private log = new Log("AppControlFactory");

    constructor() {
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
}

export = AppControlFactory; 