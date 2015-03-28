class CommonRobotModelImpl implements CommonRobotModel {
    private ports: PortInfo[] = [];
    private allowedConnections: {number?: DeviceInfo[]} = {};

    getAvailablePorts(): PortInfo[] {
        return this.ports;
    }

    addAllowedConnection(port: PortInfo, devices: DeviceInfo[]) {
        this.ports.push(port);
        this.allowedConnections[this.ports.indexOf(port)] = devices;
    }

    configurablePorts(): PortInfo[] {
        var result: PortInfo[] = [];
        var robotModel = this;

        robotModel.getAvailablePorts().forEach(function(port) {
            var devices: DeviceInfo[] = robotModel.getAllowedDevices(port);

            if(devices.length) {
                result.push(port);
            }
        });

        return result;
    }

    getAllowedDevices(port: PortInfo): DeviceInfo[] {
        return this.allowedConnections[this.ports.indexOf(port)];
    }
}