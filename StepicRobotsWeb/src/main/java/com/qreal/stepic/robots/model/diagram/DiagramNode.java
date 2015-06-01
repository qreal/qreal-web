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

    public String getGraphicalParent() {
        return graphicalParent;
    }

    public void setGraphicalParent(String graphicalParent) {
        this.graphicalParent = graphicalParent;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Set<IdObject> getLogicalChildren() {
        return logicalChildren;
    }

    public void setLogicalChildren(Set<IdObject> logicalChildren) {
        this.logicalChildren = logicalChildren;
    }

    public Set<IdObject> getGraphicalChildren() {
        return graphicalChildren;
    }

    public void setGraphicalChildren(Set<IdObject> graphicalChildren) {
        this.graphicalChildren = graphicalChildren;
    }

    public Set<IdObject> getLogicalLinksIds() {
        return logicalLinksIds;
    }

    public void setLogicalLinksIds(Set<IdObject> logicalLinksIds) {
        this.logicalLinksIds = logicalLinksIds;
    }

    public Set<IdObject> getGraphicalLinksIds() {
        return graphicalLinksIds;
    }

    public void setGraphicalLinksIds(Set<IdObject> graphicalLinksIds) {
        this.graphicalLinksIds = graphicalLinksIds;
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
    private String graphicalParent;
    private String type;
    private Set<IdObject> logicalChildren;
    private Set<IdObject> graphicalChildren;
    private Set<IdObject> logicalLinksIds;
    private Set<IdObject> graphicalLinksIds;
    private Set<Property> logicalProperties;
    private Set<Property> graphicalProperties;

}
