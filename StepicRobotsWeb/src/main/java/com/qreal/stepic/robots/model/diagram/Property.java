package com.qreal.stepic.robots.model.diagram;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;

/**
 * Created by vladimir-zakharov on 05.11.14.
 */
public class Property implements Serializable {

    @JsonCreator
    public Property(@JsonProperty("name") String name,
                    @JsonProperty("value") String value,
                    @JsonProperty("type") String type) {
        this.name = name;
        this.value = value;
        this.type = type;
    }

    public String getName() {
        return name;
    }

    public String getValue() {
        return value;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    private String name;
    private String value;
    private String type;
}
