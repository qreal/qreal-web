class GyroscopeSensor extends ScalarSensor {
    private name: string = "gyroscope";
    private friendlyName: string = "Gyroscope";

    getName(): string {
        return this.name;
    }

    getFriendlyName(): string {
        return this.friendlyName;
    }
}