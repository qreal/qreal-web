package com.qreal.stepic.robots.model.diagram;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * Created by vladzx on 31.10.14.
 */
public class DiagramNode implements Serializable {

    public DiagramNode(String id, String type) {
        this.id = id;
        this.type = type;
        this.properties = new HashSet<Property>();
    }

    public void addProperties(Set<Property> properties) {
        this.properties.addAll(properties);
    }

    public String getId() {
        return this.id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Set<Property> getProperties() {
        return properties;
    }

    public void setProperties(Set<Property> properties) {
        this.properties = properties;
    }

    private String id;
    private String type;
    private Set<Property> properties;

}
