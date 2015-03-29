package com.qreal.robots.parser

import groovy.xml.MarkupBuilder

/**
 * Created by dageev on 26.03.15.
 */

class ModelConfig {
    Map<String, String> devicePorts

    def ModelConfig(Map<String, String> devicePorts) {
        this.devicePorts = devicePorts
    }

    def getDeviceName(String portName) {
        return devicePorts.get(portName)
    }

    def convertToXml() {
        def sw = new StringWriter()
        MarkupBuilder builder = new MarkupBuilder(sw)
        builder.config {
            "initScript"()
            devicePorts.each { key, value ->
                "$key" {
                    "$value"()
                }
            }
        }
        return sw.toString()
    }
}
