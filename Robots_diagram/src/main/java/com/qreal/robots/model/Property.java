package com.qreal.robots.model;

import javax.persistence.*;
import java.io.Serializable;

/**
 * Created by vladzx on 05.11.14.
 */
@Entity
@Table(name = "properties")
public class Property implements Serializable {
    @Id
    @Column(name = "property_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long propertyId;
    @Column(name = "name")
    private String name;
    @Column(name = "value")
    private String value;

    public Long getPropertyId() {
        return propertyId;
    }

    public void setPropertyId(Long propertyId) {
        this.propertyId = propertyId;
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
}
