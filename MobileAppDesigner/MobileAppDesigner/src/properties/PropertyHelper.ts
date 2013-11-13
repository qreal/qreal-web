import Property = require("src/properties/Property");
import ButtonProperty = require("src/properties/ButtonProperty");


class PropertyHelper {

    private static instance = new PropertyHelper();

    static ToJson<T extends Property>(property: T): string {
        return JSON.stringify(property);
    }

    static FromJson(json: string): Property {
        var jsonData = JSON.parse(json);
        var type = jsonData.type;
        var property = this.instance['Create' + type](jsonData);
        return property;
    }

    private CreateProperty(jsonData: any, property: Property = new Property()): Property {
        property.Type = jsonData.type;
        return property;
    }

    private CreateButton(jsonData: any, property: ButtonProperty = new ButtonProperty()): ButtonProperty {
        this.CreateProperty(jsonData, property);
        property.Type = jsonData.type;
        property.Id = jsonData.id;
        property.Text = jsonData.text;
        return property;
    }


}

export = PropertyHelper;