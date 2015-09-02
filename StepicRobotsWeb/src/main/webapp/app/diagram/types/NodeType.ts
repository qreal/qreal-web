class NodeType {

    private name: string
    private propertiesMap: PropertiesMap;
    private image: string;

    constructor(name: string, propertiesMap: PropertiesMap, image?: string) {
        this.name = name;
        this.propertiesMap = propertiesMap;
        this.image = (image) ? image : null;
    }

    public getName(): string {
        return this.name;
    }

    public getPropertiesMap(): PropertiesMap {
        return this.propertiesMap;
    }

    public getImage(): string {
        return this.image;
    }

}