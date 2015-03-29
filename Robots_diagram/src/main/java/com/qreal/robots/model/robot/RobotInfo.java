package com.qreal.robots.model.robot;

import com.qreal.robots.parser.ModelConfig;
import com.qreal.robots.parser.ModelConfigParser;
import com.qreal.robots.parser.SystemConfig;
import com.qreal.robots.parser.SystemConfigParser;

/**
 * Created by ageevdenis on 02-3-15.
 */
public class RobotInfo {

    private String secretCode;
    private ModelConfig modelConfig;
    private SystemConfig systemConfig;

    public RobotInfo() {

    }


    public RobotInfo(String secretCode, String systemConfig, String modelConfig) {

        this.secretCode = secretCode;
        this.modelConfig = new ModelConfigParser().parse(modelConfig);
        this.systemConfig = new SystemConfigParser().parse(systemConfig);

    }

    public String getSecretCode() {
        return secretCode;
    }

    public void setSecretCode(String secretCode) {
        this.secretCode = secretCode;
    }

    public ModelConfig getModelConfig() {
        return modelConfig;
    }

    public void setModelConfig(String modelConfig) {
        this.modelConfig = new ModelConfigParser().parse(modelConfig);
    }

    public SystemConfig getSystemConfig() {
        return systemConfig;
    }

    public void setSystemConfig(String systemConfig) {
        this.systemConfig = new SystemConfigParser().parse(systemConfig);
    }
}
