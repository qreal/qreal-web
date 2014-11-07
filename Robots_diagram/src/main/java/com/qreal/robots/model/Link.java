package com.qreal.robots.model;

/**
 * Created by vladzx on 31.10.14.
 */
public class Link {
    private long linkId;
    private String source;
    private String target;

    public long getLinkId() {
        return linkId;
    }

    public void setLinkId(long linkId) {
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
}
