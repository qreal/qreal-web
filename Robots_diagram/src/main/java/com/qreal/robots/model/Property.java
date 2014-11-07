package com.qreal.robots.model;

/**
 * Created by vladzx on 05.11.14.
 */
public class Property {
    private  long propertyId;
    private String name;
    private String value;

    public long getPropertyId() {
        return propertyId;
    }

    public void setPropertyId(long propertyId) {
        this.propertyId = propertyId;
    }

    public String getName() {
        return name;
    }

    public String getValue() {
        return value;
    }

    public void setName(String name) {
        this.name =  name;
    }

    public void setValue(String value) {
        this.value = value;
    }
}
