class DropdownListManager {
    private static nodeDropdowns = {};

    static addDropdownList(typeName: string, propertyKey: string, list) {
        if (!this.nodeDropdowns[typeName]) {
            this.nodeDropdowns[typeName] = {};
        }
        this.nodeDropdowns[typeName][propertyKey] = list;
    }

    static getDropdownList(typeName: string, propertyKey: string) {
        return this.nodeDropdowns[typeName][propertyKey];
    }
}