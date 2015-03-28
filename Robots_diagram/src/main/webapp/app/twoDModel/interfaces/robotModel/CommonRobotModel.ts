interface CommonRobotModel {
    getAvailablePorts(): PortInfo[];
    addAllowedConnection(port: PortInfo, devices: DeviceInfo[]);
    configurablePorts(): PortInfo[];
    getAllowedDevices(port: PortInfo): DeviceInfo[];
}