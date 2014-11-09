package com.qreal.robots.model;

import java.io.Serializable;

/**
 * Created by vladzx on 09.11.14.
 */
public class OpenRequest implements Serializable {
    private Long diagramId;

    public Long getDiagramId() {
        return diagramId;
    }

    public void setDiagramId(Long diagramId) {
        this.diagramId = diagramId;
    }
}
