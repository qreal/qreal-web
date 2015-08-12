package com.qreal.stepic.robots.model.diagram;

import java.io.Serializable;

/**
 * Created by vladzx on 12.08.15.
 */
public class OpenResponse implements Serializable {

    public OpenResponse(Diagram diagram, String fieldXML) {
        this.diagram = diagram;
        this.fieldXML = fieldXML;
    }

    public Diagram getDiagram() {
        return diagram;
    }

    public void setDiagram(Diagram diagram) {
        this.diagram = diagram;
    }

    public String getFieldXML() {
        return fieldXML;
    }

    public void setFieldXML(String fieldXML) {
        this.fieldXML = fieldXML;
    }

    private Diagram diagram;
    private String fieldXML;
}
