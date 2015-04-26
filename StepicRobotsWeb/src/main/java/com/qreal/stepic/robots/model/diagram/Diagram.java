package com.qreal.stepic.robots.model.diagram;

import java.io.Serializable;
import java.util.Set;

/**
 * Created by vladzx on 05.11.14.
 */
public class Diagram implements Serializable {

    public Diagram(Set<DiagramNode> nodes) {
        this.nodes = nodes;
    }

    public Set<DiagramNode> getNodes() {
        return nodes;
    }

    public void setNodes(Set<DiagramNode> nodes) {
        this.nodes = nodes;
    }

    private Set<DiagramNode> nodes;
}
