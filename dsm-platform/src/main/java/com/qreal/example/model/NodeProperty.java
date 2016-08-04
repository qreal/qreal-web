package com.qreal.example.model;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.io.Serializable;

/**
 * Created by LChernigovskaya on 23.03.2016.
 */
@Entity
@Table(name = "node_properties")
public class NodeProperty implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "property_id")
    private String propertyId;

    @Column(name = "name")
    private String name;

    @Column(name = "value")
    private String value;

    @Column(name = "type")
    private String type;

    public String getPropertyId() {
        return this.propertyId;
    }

    public String getName() {
        return this.name;
    }

    public String getValue() {
        return this.value;
    }

    public String getType() {
        return this.type;
    }

    public void setPropertyId(String id) {
        this.propertyId = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public void setType(String type) {
        this.type = type;
    }
}
