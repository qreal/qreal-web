import App = require("src/Application");
import Log = require("src/util/log/Log");

import Property = require("src/model/properties/Property");
import ButtonProperty = require("src/model/properties/ButtonProperty");
import InputProperty = require("src/model/properties/InputProperty");

import Button = require("src/model/controls/Button");
import Input = require("src/model/controls/Input");
import Page = require("src/model/controls/Page");

import IControlFactory = require("src/device/IControlFactory");

class DesignerControlFactory implements IControlFactory {

    private log = new Log("DesignerControlFactory");

    constructor() {
    }

    public CreatePage(id: string): Page {
        var page = new Page(id);
        var $page = $('<div></div>');
        $page.data('role', 'page');
        $page.attr('id', id);

        $page.on('drop', event => page.OnDrop(event));
        $page.on('dragover', event => page.OnDragOver(event));
        page.Element = $page;
        return page;
    }

    public CreateButton(id: string): Button {
        var button = new Button(id);
        var $bt = $('<a href="#"></a>');

        $bt.data('role', 'button');
        $bt.attr('id', button.Properties.Id);
        $bt.text(button.Properties.Text);

        $bt.on('click', event => {
            this.log.Debug('bt click');
            App.Instance.Designer.ShowProperty(button.Properties);
        });

        button.Element = $bt.button();
        return button;
    }

    public CreateInput(id: string): Input {
        var input = new Input(id);
       
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

        $container.on('click', event => {
            this.log.Debug('input click');
            App.Instance.Designer.ShowProperty(input.Properties);
        });

        this.log.Debug('input: ', $container);
        $container.find('input').textinput({ theme: "a" });
        input.Element = $container;
        return input;
    }

}

export = DesignerControlFactory;