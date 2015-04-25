package com.qreal.stepic.robots.model.diagram;

import java.io.Serializable;
import java.util.Set;

/**
 * Created by vladzx on 31.10.14.
 */
public class Link implements Serializable {

    public Long getLinkId() {
        return linkId;
    }

    public void setLinkId(Long linkId) {
        this.linkId = linkId;
    }

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public String getTarget() {
        return target;
    }

    public void setTarget(String target) {
        this.target = target;
    }

    public Set<LinkVertex> getVertices() {
        return vertices;
    }

    public void setVertices(Set<LinkVertex> vertices) {
        this.vertices = vertices;
    }

    private Long linkId;
    private String source;
    private String target;
    private Set<LinkVertex> vertices;
}
