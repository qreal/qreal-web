import App = require("src/Application");
import Log = require("src/util/log/Log");
import IControlFactory = require("src/device/IControlFactory");
import DesignerControls = require("src/model/DesignerControls");
import ControlProperty = require("src/model/ControlProperty");


class AppControlFactory implements IControlFactory {

    private log = new Log("AppControlFactory");

    constructor() {
    }

    public CreatePage(property: ControlProperty.PageProperty): DesignerControls.Page {
        var page = new DesignerControls.Page(property);
        var $page = $('<div></div>');
        $page.data('role', 'page');
        $page.attr('id', property.Id);
        page.Element = $page;
        return page;
    }

    public CreateButton(property: ControlProperty.ButtonProperty): DesignerControls.Button {
        var button = new DesignerControls.Button(property);
        var $bt = $('<a href="#"></a>');

        $bt.attr('data-role', 'button');
        $bt.attr('id', button.Properties.Id);
        $bt.text(button.Properties.Text);
        button.Element = $bt;
        return button;
    }

    public CreateInput(property: ControlProperty.InputProperty): DesignerControls.Input {
        var input = new DesignerControls.Input(property);

        var $container = $("<div data-role='fieldcontain'></div>");
        var $label = $("<label></label>");
        $label.text(input.Properties.Title);
        $label.attr('for', input.Properties.Id);

        var $input = $('<input />');
        $input.attr('type', 'text');
        $input.attr('id', input.Properties.Id);
        $input.attr('name', input.Properties.Name);

        $container.append($label);
        $container.append($input);

        input.Element = $container;
        return input;
    }
}

export = AppControlFactory; 