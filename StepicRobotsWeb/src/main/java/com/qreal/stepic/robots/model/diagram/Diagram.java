package com.qreal.stepic.robots.model.diagram;

import java.io.Serializable;
import java.util.Set;

/**
 * Created by vladzx on 05.11.14.
 */
public class Diagram implements Serializable {

    public Long getDiagramId() {
        return diagramId;
    }

    public void setDiagramId(Long diagramId) {
        this.diagramId = diagramId;
    }

    public Long getNodeIndex() {
        return nodeIndex;
    }

    public void setNodeIndex(Long nodeIndex) {
        this.nodeIndex = nodeIndex;
    }

    public Set<DiagramNode> getNodes() {
        return nodes;
    }

    public Set<Link> getLinks() {
        return links;
    }

    public void setNodes(Set<DiagramNode> nodes) {
        this.nodes = nodes;
    }

    public void setLinks(Set<Link> links) {
        this.links = links;
    }

    private Long diagramId;
    private Long nodeIndex;
    private Set<DiagramNode> nodes;
    private Set<Link> links;
}
