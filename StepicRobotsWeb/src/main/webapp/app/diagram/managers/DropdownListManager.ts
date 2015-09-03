class DropdownListManager {

    private static nodeDropdowns = {};

    static addDropdownList(typeName: string, propertyKey: string, variants: Variant[]) {
        if (!this.nodeDropdowns[typeName]) {
            this.nodeDropdowns[typeName] = {};
        }
        this.nodeDropdowns[typeName][propertyKey] = variants;
    }

    static getDropdownList(typeName: string, propertyKey: string): Variant[] {
        return this.nodeDropdowns[typeName][propertyKey];
    }
}