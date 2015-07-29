package com.qreal.robots.model.diagram;

import java.io.Serializable;

/**
 * Created by korniluk13 on 14.07.2015.
 */
public class DiagramRequest implements Serializable {

    private String diagramName;

    private String folderId;

    public String getDiagramName() {
        return this.diagramName;
    }

    public void setDiagramName(String name) {
        this.diagramName = name;
    }

    public String getFolderId() {
        return this.folderId;
    }

    public void setFolderId(String folderId) {
        this.folderId = folderId;
    }
}
