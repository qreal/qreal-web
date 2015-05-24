package com.qreal.stepic.robots.model.diagram;

import java.io.Serializable;

/**
 * Created by vladzx on 10.05.15.
 */
public class SubmitRequest implements Serializable {

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Diagram getDiagram() {
        return diagram;
    }

    public void setDiagram(Diagram diagram) {
        this.diagram = diagram;
    }

    private String id;
    private Diagram diagram;
}
