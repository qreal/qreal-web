import App = require("src/Application");
import Log = require("src/util/log/Log");
import Enums = require("src/model/Enums");
import Property = require("src/model/properties/Property");
import ButtonProperty = require("src/model/properties/ButtonProperty");
import BaseControl = require("src/model/controls/BaseControl");


class Button extends BaseControl<ButtonProperty> {

    constructor(id: string) {
        super(new ButtonProperty(id));
        this.log = new Log("Button");
    }

    public ChangeProperty(propertyId: string, propertyType: Enums.PropertyType, newValue: string): void {
        switch (propertyType) {
            case Enums.PropertyType.Id:

                if (App.Instance.Device.ControlManager.ContainsId(newValue)) {
                    //TODO: show notification
                    alert('Id already exists');
                } else {
                    $('#' + propertyId).attr('id', newValue);
                    App.Instance.Device.ControlManager.ChangeId(propertyId, newValue);
                }
                break;
            case Enums.PropertyType.Text:
                this.log.Debug("Enums.PropertyType.Text:", this.Element);
                this.Element.find('.ui-btn-text').text(newValue);
                break;
            case Enums.PropertyType.Inline:
                var cond: boolean = newValue == "true";
                this.Element.buttonMarkup({ inline: cond });
                break;
            case Enums.PropertyType.Corners:
                var cond: boolean = newValue == "true";
                this.Element.buttonMarkup({ corners: cond });
                break;
            case Enums.PropertyType.Mini:
                var cond: boolean = newValue == "true";
                this.Element.buttonMarkup({ mini: cond });
                break;
            case Enums.PropertyType.Theme:
                this.Element.buttonMarkup({ theme: newValue });
                break;
        }
    }

}

export = Button;