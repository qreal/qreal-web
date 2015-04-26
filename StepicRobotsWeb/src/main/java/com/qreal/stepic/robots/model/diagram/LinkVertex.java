package com.qreal.stepic.robots.model.diagram;

import java.io.Serializable;

/**
 * Created by vladzx on 17.11.14.
 */
public class LinkVertex implements Serializable {

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

    public int getNumber() {
        return number;
    }

    public void setNumber(int number) {
        this.number = number;
    }

    private double x;
    private double y;
    private int number;
}
