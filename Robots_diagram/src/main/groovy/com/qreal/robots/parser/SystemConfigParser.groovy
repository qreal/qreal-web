package com.qreal.robots.parser

/**
 * Created by dageev on 26.03.15.
 */
class SystemConfigParser {

    def parse(String systemConfigXml) {
        List<Device> deviceClassesList = []

        def systemConfig = new XmlParser().parseText(systemConfigXml)

        def deviceClasses = systemConfig.deviceClasses
        assert deviceClasses.size() == 1
        deviceClasses[0].children().each {
            deviceClassesList.add(new Device(it.name()))
        }


        def devicePorts = systemConfig.devicePorts
        assert devicePorts.size() == 1
        deviceClassesList.each { device ->
            devicePorts[0].each { port ->
                if (device.name == port.name()) {
                    device.availablePorts.add(port.@port)
                }
            }

        }

        def deviceTypes = systemConfig.deviceTypes
        assert deviceTypes.size() == 1
        deviceClassesList.each { device ->
            deviceTypes[0].children().each { deviceType ->
                if (device.name == deviceType.@class) {
                    device.types.add(deviceType.name())
                }
            }
        }



        return new SystemConfig(devices: deviceClassesList)
    }
}
