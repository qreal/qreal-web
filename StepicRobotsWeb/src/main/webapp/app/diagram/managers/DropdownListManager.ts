class DropdownListManager {
    private static nodeDropdowns = {};

    static addDropdownList(typeKey: string, propertyName: string, list) {
        if (!this.nodeDropdowns[typeKey]) {
            this.nodeDropdowns[typeKey] = {};
        }
        this.nodeDropdowns[typeKey][propertyName] = list;
    }

    static getDropdownList(typeKey: string, propertyName: string) {
        return this.nodeDropdowns[typeKey][propertyName];
    }
}