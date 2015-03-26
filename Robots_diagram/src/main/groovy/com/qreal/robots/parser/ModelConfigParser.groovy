package com.qreal.robots.parser

/**
 * Created by dageev on 26.03.15.
 */
class ModelConfigParser {
    def parse(String modelConfigXml) {


        Map<String, Device> devicePorts = [:]

        def modelConfig = new XmlParser().parseText(modelConfigXml)
        modelConfig.children().each { port ->
            if (port.children().size() == 1)
                devicePorts.put(port.name(), new Device(port.children()[0].name()))
        }

        return new ModelConfig(devicePorts)

    }
}

