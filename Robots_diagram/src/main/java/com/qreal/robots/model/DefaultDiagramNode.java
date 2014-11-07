package com.qreal.robots.model;


import java.util.ArrayList;

/**
 * Created by vladzx on 31.10.14.
 */
public class DefaultDiagramNode {
    private long nodeId;
    private String name;
    private double x;
    private double y;
    private String image;
    private ArrayList<Property> properties;

    public long getNodeId() {
        return nodeId;
    }

    public void setNodeId(long nodeId) {
        this.nodeId = nodeId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getX() {
        return x;
    }

    public void setX(double x) {
        this.x = x;
    }

    public double getY() {
        return y;
    }

    public void setY(double y) {
        this.y = y;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public ArrayList<Property> getProperties() {
        return  properties;
    }

    public void setProperties(ArrayList<Property> properties) {
        this.properties = properties;
    }
}
