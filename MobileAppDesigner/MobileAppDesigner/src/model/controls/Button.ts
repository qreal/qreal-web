import App = require("src/Application");
import Log = require("src/util/log/Log");
import Property = require("src/model/properties/Property");
import ButtonProperty = require("src/model/properties/ButtonProperty");
import BaseControl = require("src/model/controls/BaseControl");

class Button extends BaseControl<ButtonProperty> {

    constructor(id:string) {
        super(new ButtonProperty(id));
        this.log = new Log("Button");
    }

    public Create(): JQuery {
        this.log.Debug("Create");
        return $("");
    }

    public CreateForDesigner(): JQuery {
        this.log.Debug("CreateForDesigner");
        var bt = $('<a href="#"></a>');               
        bt.data('role', 'button');
        bt.attr('id', this.Properties.Id);
        bt.text(this.Properties.Text);       
        $(event.currentTarget).append(bt);

        bt.on('click', event => {
            this.log.Debug('bt click');
            App.Instance.Designer.ShowProperty($(event.target).data('prop'));
        });

        bt = bt.button();
        bt.children('.ui-btn-inner').data('prop', this.Properties);
        return bt;
    }

}   