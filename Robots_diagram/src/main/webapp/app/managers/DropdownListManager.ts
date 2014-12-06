class DropdownListManager {
    private static dropdownsList = {};

    static addDropdownList(name: string, list) {
        this.dropdownsList[name] = list;
    }

    static getDropdownListByName(name: string) {
        return this.dropdownsList[name];
    }
}