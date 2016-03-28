package com.qreal.example.model;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Set;

/**
 * Created by LChernigovskaya on 18.03.2016.
 */
@Entity
@Table(name = "nodes")

public class Node implements Serializable {

    @Id
    @Column(name = "node_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long nodeId;

    @Column(name = "name")
    private String name;

    @Column(name = "image")
    private String image;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "node_id", referencedColumnName = "node_id")
    private Set<NodeProperty> properties;

    public Long getNodeId() {
        return this.nodeId;
    }

    public String getName() {
        return this.name;
    }

    public String getImage() {
        return this.image;
    }

    public Set<NodeProperty> getProperties() {
        return this.properties;
    }

    public void setNodeId(Long id) {
        this.nodeId = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public void setProperties(Set<NodeProperty> properties) {
        this.properties = properties;
    }
}
