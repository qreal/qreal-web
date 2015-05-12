package com.qreal.stepic.robots.model.two_d;

import java.io.Serializable;

/**
 * Created by vladzx on 10.05.15.
 */
public class Point implements Serializable {
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

    public double getDirection() {
        return direction;
    }

    public void setDirection(double direction) {
        this.direction = direction;
    }

    public double getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(double timestamp) {
        this.timestamp = timestamp;
    }

    private double x;
    private double y;
    private double direction;
    private double timestamp;

}
