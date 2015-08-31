package com.qreal.stepic.robots.model.diagram;

import java.io.Serializable;

/**
 * Created by vladimir-zakharov on 01.06.15.
 */
public class IdObject implements Serializable{

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    private String id;
}
