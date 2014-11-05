package com.qreal.robots.model;

import java.util.ArrayList;

/**
 * Created by vladzx on 05.11.14.
 */
public class Diagram {
    private ArrayList<DefaultDiagramNode> nodes;
    private ArrayList<Link> links;

    public ArrayList<DefaultDiagramNode> getNodes() {
        return nodes;
    }

    public ArrayList<Link> getLinks() {
        return links;
    }

    public void setNodes(ArrayList<DefaultDiagramNode> nodes) {
        this.nodes = nodes;
    }

    public void setLinks(ArrayList<Link> links) {
        this.links = links;
    }
}
