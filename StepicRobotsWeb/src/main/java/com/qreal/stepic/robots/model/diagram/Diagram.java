package com.qreal.stepic.robots.model.diagram;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;
import java.util.Set;

/**
 * Created by vladzx on 05.11.14.
 */
public class Diagram implements Serializable {

    @JsonCreator
    public Diagram(@JsonProperty("nodes") Set<DiagramNode> nodes, @JsonProperty("links") Set<DiagramNode> links) {
        this.nodes = nodes;
        this.links = links;
    }

    public Set<DiagramNode> getNodes() {
        return nodes;
    }

    public void setNodes(Set<DiagramNode> nodes) {
        this.nodes = nodes;
    }

    public Set<DiagramNode> getLinks() {
        return links;
    }

    public void setLinks(Set<DiagramNode> links) {
        this.links = links;
    }

    private Set<DiagramNode> nodes;
    private Set<DiagramNode> links;
}
