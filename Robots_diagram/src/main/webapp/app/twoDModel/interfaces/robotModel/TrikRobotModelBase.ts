interface TrikRobotModelBase extends CommonRobotModel {
    displayInfo(): DeviceInfo;
    speakerInfo(): DeviceInfo;
    buttonInfo(): DeviceInfo;

    powerMotorInfo(): DeviceInfo;
    servoMotorInfo(): DeviceInfo;
    encoderInfo(): DeviceInfo;

    lightSensorInfo(): DeviceInfo;
    infraredSensorInfo(): DeviceInfo;

    sonarSensorInfo(): DeviceInfo;

    motionSensorInfo(): DeviceInfo;

    gyroscopeInfo(): DeviceInfo;
    accelerometerInfo(): DeviceInfo;

    ledInfo(): DeviceInfo;
    lineSensorInfo(): DeviceInfo;
    colorSensorInfo(): DeviceInfo;
    objectSensorInfo(): DeviceInfo;
    shellInfo(): DeviceInfo;

    gamepadButtonInfo(): DeviceInfo;
    gamepadPadInfo(): DeviceInfo;
    gamepadPadPressSensorInfo(): DeviceInfo;
    gamepadWheelInfo(): DeviceInfo;
    gamepadConnectionIndicatorInfo(): DeviceInfo;
}