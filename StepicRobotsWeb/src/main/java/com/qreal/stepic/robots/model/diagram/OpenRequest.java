package com.qreal.stepic.robots.model.diagram;

import java.io.Serializable;

/**
 * Created by vladzx on 09.11.14.
 */
public class OpenRequest implements Serializable {

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    private String id;
}
