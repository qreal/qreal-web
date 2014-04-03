import App = require("src/Application");
import Log = require("src/util/log/Log");
import DesignerControls = require("src/model/DesignerControls");
import ControlProperty = require("src/model/ControlProperty");
import AppControlFactory = require("src/device/DesignerControlFactory");


class DesignerControlFactory {

    private log = new Log("DesignerControlFactory");

    constructor() {
    }

    public CreatePage(property: ControlProperty.PageProperty): JQuery {
        var $page = $('<div></div>');
        $page.data('role', 'page');
        $page.attr('id', property.Id);
        $page.attr('class', 'sortcontainer');
 
        return $page;
    }

    public CreateHeader(property: ControlProperty.HeaderProperty): JQuery {
        var $header = $('<div></div>');
        $header.attr('id', property.Id);
        $header.attr('data-role', 'header');
        $header.addClass('nondraggable');
        var $title = $('<h1></h1>');
        $title.text(property.Title);
        $header.append($title);

        $header.on('click', event => {
            event.preventDefault();
            this.log.Debug('bt click');
            App.Instance.Designer.ShowProperty(property);
        });

        return $header;
    }

    public CreateButton(property: ControlProperty.ButtonProperty): JQuery {
        var $bt = $('<a href="#"></a>');

        $bt.attr('data-role', 'button');
        $bt.attr('id', property.Id);
        $bt.attr('class', 'item');
        $bt.text(property.Text);

        $bt.on('click', event => {
            event.preventDefault();
            this.log.Debug('bt click');
            App.Instance.Designer.ShowProperty(property);
        });
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

        $input.attr('name', property.Name);
        $input.attr('id', property.Id);
        $container.append($label);
        $container.append($input);

        $container.on('click', event => {
            event.preventDefault();
            this.log.Debug('input click');
            App.Instance.Designer.ShowProperty(property);
        });

        this.log.Debug('input: ', $container);
        $container.find('input').textinput();
        return $container;
    }
}

export = DesignerControlFactory;