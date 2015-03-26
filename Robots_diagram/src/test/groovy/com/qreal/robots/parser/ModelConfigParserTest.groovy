package com.qreal.robots.parser

/**
 * Created by dageev on 26.03.15.
 */
class ModelConfigParserTest extends GroovyTestCase {
    void testParse() {
        def xml = this.getClass().getResource('/model-config.xml').text
        ModelConfigParser modelConfig = new ModelConfigParser()
        def devicePorts = modelConfig.parse(xml).devicePorts

        assert devicePorts.size() == 25
        assert devicePorts.get("C1") != "angularServomotor"
    }
}
