package com.qreal.robots.parser

/**
 * Created by dageev on 26.03.15.
 */
class SystemConfigParserTest extends GroovyTestCase {

    void testParse() {
        def xml = this.getClass().getResource('/system-config.xml').text
        SystemConfigParser systemConfigParser = new SystemConfigParser()

        def systemConfig = systemConfigParser.parse(xml);
        def devices = systemConfig.devices
        def ports = systemConfig.ports

        assert devices.size() == 16
        assert ports.size() == 25

        def servoMotor = devices.get(0)
        assert servoMotor.name == "servoMotor"
        assert servoMotor.availablePorts == ["E1", "E2", "E3", "C1", "C2", "C3"]
        assert servoMotor.types == ["angularServomotor", "continuousRotationServomotor"]
    }
}
