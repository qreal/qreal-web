interface DeviceInfo {
    getName(): string;
    getFriendlyName(): string;
    isA(type): boolean;
}