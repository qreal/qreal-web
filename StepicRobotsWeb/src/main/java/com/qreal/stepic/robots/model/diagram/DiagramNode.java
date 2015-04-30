package com.qreal.stepic.robots.model.diagram;

import java.io.Serializable;
import java.util.Set;

/**
 * Created by vladzx on 31.10.14.
 */
public class DiagramNode implements Serializable {

    public String getLogicalId() {
        return logicalId;
    }

    public void setLogicalId(String logicalId) {
        this.logicalId = logicalId;
    }

    public String getGraphicalId() {
        return graphicalId;
    }

    public void setGraphicalId(String graphicalId) {
        this.graphicalId = graphicalId;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Set<Property> getLogicalProperties() {
        return logicalProperties;
    }

    public void setLogicalProperties(Set<Property> logicalProperties) {
        this.logicalProperties = logicalProperties;
    }

    public Set<Property> getGraphicalProperties() {
        return graphicalProperties;
    }

    public void setGraphicalProperties(Set<Property> graphicalProperties) {
        this.graphicalProperties = graphicalProperties;
    }

    private String logicalId;
    private String graphicalId;
    private String type;
    private Set<Property> logicalProperties;
    private Set<Property> graphicalProperties;

}
