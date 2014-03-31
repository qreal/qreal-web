import App = require("src/Application");
import Log = require("src/util/log/Log");
import IControlFactory = require("src/device/IControlFactory");
import DesignerControls = require("src/model/DesignerControls");
import ControlProperty = require("src/model/ControlProperty");


class DesignerControlFactory implements IControlFactory {

    private log = new Log("DesignerControlFactory");

    constructor() {
    }

    public CreatePage(property: ControlProperty.PageProperty): DesignerControls.Page {
        var page = new DesignerControls.Page(property);
        var $page = $('<div></div>');
        $page.data('role', 'page');
        $page.attr('id', property.Id);
        $page.attr('class', 'sortcontainer');

        $page.on('drop', event => page.OnDrop(event));
        $page.on('dragover', event => page.OnDragOver(event));
        page.Element = $page;
        return page;
    }

    public CreateButton(property: ControlProperty.ButtonProperty): DesignerControls.Button {
        var button = new DesignerControls.Button(property);
        var $bt = $('<a href="#"></a>');

        $bt.attr('data-role', 'button');
        $bt.attr('id', button.Properties.Id);
        $bt.attr('class', 'item');
        $bt.text(button.Properties.Text);

        $bt.on('click', event => {
            event.preventDefault();
            this.log.Debug('bt click');
            App.Instance.Designer.ShowProperty(button.Properties);
        });

        button.Element = $bt.button();
        this.log.Debug("button:", button.Element);
        return button;
    }

    public CreateInput(property: ControlProperty.InputProperty): DesignerControls.Input {
        var input = new DesignerControls.Input(property);

        var $container = $("<div data-role='fieldcontain'></div>");
        $container.attr('id', input.Properties.Id);
        var $label = $("<label></label>");
        $label.text(input.Properties.Title);
        $label.attr('for', 'input_' + input.Properties.Id);

        var $input = $('<input />');
        $input.attr('type', 'text');

        $input.attr('name', input.Properties.Name);
        $input.attr('id', 'input_' + input.Properties.Id);
        $container.append($label);
        $container.append($input);

        $container.on('click', event => {
            event.preventDefault();
            this.log.Debug('input click');
            App.Instance.Designer.ShowProperty(input.Properties);
        });

        this.log.Debug('input: ', $container);
        $container.find('input').textinput();
        input.Element = $container;
        return input;
    }
}

export = DesignerControlFactory;