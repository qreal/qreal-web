package com.qreal.robots.parser
/**
 * Created by dageev on 26.03.15.
 */

class ModelConfig {
    Map<String, Device> devicePorts

    def ModelConfig(Map<String, Device> devicePorts) {
        this.devicePorts = devicePorts
    }
}
