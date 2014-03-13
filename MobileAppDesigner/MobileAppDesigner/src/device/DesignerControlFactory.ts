import App = require("src/Application");
import Log = require("src/util/log/Log");

import Property = require("src/model/properties/Property");
import ButtonProperty = require("src/model/properties/ButtonProperty");
import InputProperty = require("src/model/properties/InputProperty");

import Button = require("src/model/controls/Button");

import IControlFactory = require("src/device/IControlFactory");

class DesignerControlFactory implements IControlFactory {

    private log = new Log("DesignerControlFactory");

    constructor() {
    }

    public CreatePage(id: string): any {
        return "";
    }

    public CreateButton(id: string): Button {
        var button = new Button(id);
        button.Element = $('<a href="#" data-role="button"></a>');             

        button.Element.attr('id', button.Properties.Id);
        button.Element.text(button.Properties.Text);

        button.Element.on('click', event => {
            this.log.Debug('bt click');
            App.Instance.Designer.ShowProperty($(event.target).data('prop'));
        });

        button.Element = button.Element.button();
        button.Element.children('.ui-btn-inner').data('prop', button.Properties);
        return button;
    }
}

export = DesignerControlFactory;