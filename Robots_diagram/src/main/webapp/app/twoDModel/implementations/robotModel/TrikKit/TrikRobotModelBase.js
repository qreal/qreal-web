var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var TrikRobotModelBase = (function (_super) {
    __extends(TrikRobotModelBase, _super);
    function TrikRobotModelBase() {
        _super.call(this);
        var analogPortConnections = [this.lightSensorInfo(), this.infraredSensorInfo()];
        this.addAllowedConnection(new PortInfoImpl("DisplayPort", 1 /* output */), [this.displayInfo()]);
        this.addAllowedConnection(new PortInfoImpl("SpeakerPort", 1 /* output */), [this.speakerInfo()]);
        this.addAllowedConnection(new PortInfoImpl("Left", 0 /* input */, [], "buttonLeft"), [this.buttonInfo()]);
        this.addAllowedConnection(new PortInfoImpl("Right", 0 /* input */, [], "buttonRight"), [this.buttonInfo()]);
        this.addAllowedConnection(new PortInfoImpl("Up", 0 /* input */, [], "buttonUp"), [this.buttonInfo()]);
        this.addAllowedConnection(new PortInfoImpl("Down", 0 /* input */, [], "buttonDown"), [this.buttonInfo()]);
        this.addAllowedConnection(new PortInfoImpl("Enter", 0 /* input */, [], "buttonEnter"), [this.buttonInfo()]);
        this.addAllowedConnection(new PortInfoImpl("Esc", 0 /* input */, [], "buttonEsc"), [this.buttonInfo()]);
        this.addAllowedConnection(new PortInfoImpl("C1", 1 /* output */, ["JC1"]), [this.servoMotorInfo()]);
        this.addAllowedConnection(new PortInfoImpl("C2", 1 /* output */, ["JC2"]), [this.servoMotorInfo()]);
        this.addAllowedConnection(new PortInfoImpl("C3", 1 /* output */, ["JC3"]), [this.servoMotorInfo()]);
        this.addAllowedConnection(new PortInfoImpl("E1", 1 /* output */, ["JE1"]), [this.servoMotorInfo()]);
        this.addAllowedConnection(new PortInfoImpl("E2", 1 /* output */, ["JE2"]), [this.servoMotorInfo()]);
        this.addAllowedConnection(new PortInfoImpl("E3", 1 /* output */, ["JE3"]), [this.servoMotorInfo()]);
        this.addAllowedConnection(new PortInfoImpl("E4", 1 /* output */, ["JE4"]), [this.servoMotorInfo()]);
        this.addAllowedConnection(new PortInfoImpl("M1", 1 /* output */, ["JM1", "A", "1"]), [this.powerMotorInfo()]);
        this.addAllowedConnection(new PortInfoImpl("M2", 1 /* output */, ["JM2", "B", "2"]), [this.powerMotorInfo()]);
        this.addAllowedConnection(new PortInfoImpl("M3", 1 /* output */, ["JM3", "C", "3"]), [this.powerMotorInfo()]);
        this.addAllowedConnection(new PortInfoImpl("M4", 1 /* output */, ["JM4", "D", "4"]), [this.powerMotorInfo()]);
        this.addAllowedConnection(new PortInfoImpl("B1", 0 /* input */, ["JB1", "M1", "JM1", "A", "1"], "encoder1"), [this.encoderInfo()]);
        this.addAllowedConnection(new PortInfoImpl("B2", 0 /* input */, ["JB2", "M2", "JM2", "B", "2"], "encoder2"), [this.encoderInfo()]);
        this.addAllowedConnection(new PortInfoImpl("B3", 0 /* input */, ["JB3", "M3", "JM3", "C", "3"], "encoder3"), [this.encoderInfo()]);
        this.addAllowedConnection(new PortInfoImpl("B4", 0 /* input */, ["JB4", "M4", "JM4", "D", "4"], "encoder4"), [this.encoderInfo()]);
        this.addAllowedConnection(new PortInfoImpl("A1", 0 /* input */, ["JA1"], "sensorA1"), analogPortConnections);
        this.addAllowedConnection(new PortInfoImpl("A2", 0 /* input */, ["JA2"], "sensorA2"), analogPortConnections);
        this.addAllowedConnection(new PortInfoImpl("A3", 0 /* input */, ["JA3"], "sensorA3"), analogPortConnections);
        this.addAllowedConnection(new PortInfoImpl("A4", 0 /* input */, ["JA4"], "sensorA4"), analogPortConnections);
        this.addAllowedConnection(new PortInfoImpl("A5", 0 /* input */, ["JA5"], "sensorA5"), analogPortConnections);
        this.addAllowedConnection(new PortInfoImpl("A6", 0 /* input */, ["JA6"], "sensorA6"), analogPortConnections);
        this.digitalPorts = [
            new PortInfoImpl("D1", 0 /* input */, ["JD1"], "sensorD1"),
            new PortInfoImpl("D2", 0 /* input */, ["JD2"], "sensorD2"),
            new PortInfoImpl("F1", 0 /* input */, ["JF1"], "sensorF1")
        ];
        this.addAllowedConnection(this.digitalPorts[0], [this.sonarSensorInfo()]);
        this.addAllowedConnection(this.digitalPorts[1], [this.sonarSensorInfo()]);
        this.addAllowedConnection(this.digitalPorts[2], [this.motionSensorInfo()]);
        this.addAllowedConnection(new PortInfoImpl("GyroscopePortX", 0 /* input */, [], "gyroscopeX"), [this.gyroscopeInfo()]);
        this.addAllowedConnection(new PortInfoImpl("GyroscopePortY", 0 /* input */, [], "gyroscopeY"), [this.gyroscopeInfo()]);
        this.addAllowedConnection(new PortInfoImpl("GyroscopePortZ", 0 /* input */, [], "gyroscopeZ"), [this.gyroscopeInfo()]);
        this.addAllowedConnection(new PortInfoImpl("AccelerometerPortX", 0 /* input */, [], "accelerometerX"), [this.accelerometerInfo()]);
        this.addAllowedConnection(new PortInfoImpl("AccelerometerPortY", 0 /* input */, [], "accelerometerY"), [this.accelerometerInfo()]);
        this.addAllowedConnection(new PortInfoImpl("AccelerometerPortZ", 0 /* input */, [], "accelerometerZ"), [this.accelerometerInfo()]);
        this.addAllowedConnection(new PortInfoImpl("LedPort", 1 /* output */), [this.ledInfo()]);
        this.addAllowedConnection(new PortInfoImpl("LineSensorXPort", 0 /* input */, [], "lineSensorX"), [this.lineSensorInfo()]);
        this.addAllowedConnection(new PortInfoImpl("LineSensorSizePort", 0 /* input */, [], "lineSensorSize"), [this.lineSensorInfo()]);
        this.addAllowedConnection(new PortInfoImpl("LineSensorCrossroadsPort", 0 /* input */, [], "lineSensorCross"), [this.lineSensorInfo()]);
        this.addAllowedConnection(new PortInfoImpl("ObjectSensorXPort", 0 /* input */, [], "objectSensorX"), [this.objectSensorInfo()]);
        this.addAllowedConnection(new PortInfoImpl("ObjectSensorYPort", 0 /* input */, [], "objectSensorY"), [this.objectSensorInfo()]);
        this.addAllowedConnection(new PortInfoImpl("ObjectSensorSizePort", 0 /* input */, [], "objectSensorSize"), [this.objectSensorInfo()]);
        this.addAllowedConnection(new PortInfoImpl("ColorSensorRPort", 0 /* input */, [], "colorSensorR"), [this.colorSensorInfo()]);
        this.addAllowedConnection(new PortInfoImpl("ColorSensorGPort", 0 /* input */, [], "colorSensorG"), [this.colorSensorInfo()]);
        this.addAllowedConnection(new PortInfoImpl("ColorSensorBPort", 0 /* input */, [], "colorSensorB"), [this.colorSensorInfo()]);
        this.addAllowedConnection(new PortInfoImpl("ShellPort", 1 /* output */), [this.shellInfo()]);
        this.addAllowedConnection(new PortInfoImpl("GamepadPad1PosPort", 0 /* input */, [], "gamepadPad1", 1 /* vector */), [this.gamepadPadInfo()]);
        this.addAllowedConnection(new PortInfoImpl("GamepadPad2PosPort", 0 /* input */, [], "gamepadPad2", 1 /* vector */), [this.gamepadPadInfo()]);
        this.addAllowedConnection(new PortInfoImpl("GamepadPad1PressedPort", 0 /* input */, [], "gamepadPad1Pressed"), [this.gamepadPadPressSensorInfo()]);
        this.addAllowedConnection(new PortInfoImpl("GamepadPad2PressedPort", 0 /* input */, [], "gamepadPad2Pressed"), [this.gamepadPadPressSensorInfo()]);
        this.addAllowedConnection(new PortInfoImpl("GamepadWheelPort", 0 /* input */, [], "gamepadWheel"), [this.gamepadWheelInfo()]);
        this.addAllowedConnection(new PortInfoImpl("GamepadButton1Port", 0 /* input */, [], "gamepadButton1"), [this.gamepadButtonInfo()]);
        this.addAllowedConnection(new PortInfoImpl("GamepadButton2Port", 0 /* input */, [], "gamepadButton2"), [this.gamepadButtonInfo()]);
        this.addAllowedConnection(new PortInfoImpl("GamepadButton3Port", 0 /* input */, [], "gamepadButton3"), [this.gamepadButtonInfo()]);
        this.addAllowedConnection(new PortInfoImpl("GamepadButton4Port", 0 /* input */, [], "gamepadButton4"), [this.gamepadButtonInfo()]);
        this.addAllowedConnection(new PortInfoImpl("GamepadButton5Port", 0 /* input */, [], "gamepadButton5"), [this.gamepadButtonInfo()]);
        this.addAllowedConnection(new PortInfoImpl("GamepadConnectionIndicatorPort", 0 /* input */, [], "gamepadConnected"), [this.gamepadConnectionIndicatorInfo()]);
    }
    TrikRobotModelBase.prototype.getConfigurablePorts = function () {
        return _super.prototype.getConfigurablePorts.call(this).concat(this.digitalPorts);
    };
    TrikRobotModelBase.prototype.displayInfo = function () {
        return DeviceInfoImpl.getInstance(Display);
    };
    TrikRobotModelBase.prototype.speakerInfo = function () {
        return DeviceInfoImpl.getInstance(Speaker);
    };
    TrikRobotModelBase.prototype.buttonInfo = function () {
        return DeviceInfoImpl.getInstance(Button);
    };
    TrikRobotModelBase.prototype.powerMotorInfo = function () {
        return DeviceInfoImpl.getInstance(Motor);
    };
    TrikRobotModelBase.prototype.servoMotorInfo = function () {
        return DeviceInfoImpl.getInstance(Motor);
    };
    TrikRobotModelBase.prototype.encoderInfo = function () {
        return DeviceInfoImpl.getInstance(EncoderSensor);
    };
    TrikRobotModelBase.prototype.lightSensorInfo = function () {
        return DeviceInfoImpl.getInstance(LightSensor);
    };
    TrikRobotModelBase.prototype.infraredSensorInfo = function () {
        return DeviceInfoImpl.getInstance(TrikInfraredSensor);
    };
    TrikRobotModelBase.prototype.sonarSensorInfo = function () {
        return DeviceInfoImpl.getInstance(TrikSonarSensor);
    };
    TrikRobotModelBase.prototype.motionSensorInfo = function () {
        return DeviceInfoImpl.getInstance(TrikMotionSensor);
    };
    TrikRobotModelBase.prototype.gyroscopeInfo = function () {
        return DeviceInfoImpl.getInstance(GyroscopeSensor);
    };
    TrikRobotModelBase.prototype.accelerometerInfo = function () {
        return DeviceInfoImpl.getInstance(AccelerometerSensor);
    };
    TrikRobotModelBase.prototype.ledInfo = function () {
        return DeviceInfoImpl.getInstance(TrikLed);
    };
    TrikRobotModelBase.prototype.lineSensorInfo = function () {
        return DeviceInfoImpl.getInstance(TrikLineSensor);
    };
    TrikRobotModelBase.prototype.colorSensorInfo = function () {
        return DeviceInfoImpl.getInstance(TrikColorSensor);
    };
    TrikRobotModelBase.prototype.objectSensorInfo = function () {
        return DeviceInfoImpl.getInstance(TrikObjectSensor);
    };
    TrikRobotModelBase.prototype.shellInfo = function () {
        return DeviceInfoImpl.getInstance(TrikShell);
    };
    TrikRobotModelBase.prototype.gamepadButtonInfo = function () {
        return DeviceInfoImpl.getInstance(TrikGamepadButton);
    };
    TrikRobotModelBase.prototype.gamepadPadInfo = function () {
        return DeviceInfoImpl.getInstance(TrikGamepadPad);
    };
    TrikRobotModelBase.prototype.gamepadPadPressSensorInfo = function () {
        return DeviceInfoImpl.getInstance(TrikGamepadPadPressSensor);
    };
    TrikRobotModelBase.prototype.gamepadWheelInfo = function () {
        return DeviceInfoImpl.getInstance(TrikGamepadWheel);
    };
    TrikRobotModelBase.prototype.gamepadConnectionIndicatorInfo = function () {
        return DeviceInfoImpl.getInstance(TrikGamepadConnectionIndicator);
    };
    return TrikRobotModelBase;
})(CommonRobotModelImpl);
//# sourceMappingURL=TrikRobotModelBase.js.map