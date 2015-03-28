class DeviceInfoImpl implements DeviceInfo {
    private name: string;
    private friendlyName: string;
    private deviceType;

    constructor(deviceType) {
        this.deviceType = deviceType;
        this.name = deviceType.name;
        this.friendlyName = deviceType.friendlyName;
    }

    getName(): string {
        return this.name;
    }

    getFriendlyName(): string {
        return this.friendlyName;
    }
}