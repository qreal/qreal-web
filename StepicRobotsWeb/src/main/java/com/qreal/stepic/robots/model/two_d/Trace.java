package com.qreal.stepic.robots.model.two_d;

import java.io.Serializable;
import java.util.List;

/**
 * Created by vladzx on 10.05.15.
 */
public class Trace implements Serializable {

    public List<Point> getPoints() {
        return points;
    }

    public void setPoints(List<Point> points) {
        this.points = points;
    }

    private List<Point> points;
}
