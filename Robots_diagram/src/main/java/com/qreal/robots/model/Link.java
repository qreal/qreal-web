package com.qreal.robots.model;

import javax.persistence.*;
import java.io.Serializable;

/**
 * Created by vladzx on 31.10.14.
 */
@Entity
@Table(name = "links")
public class Link implements Serializable {
    @Id
    @Column(name = "link_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long linkId;
    @Column(name = "source")
    private String source;
    @Column(name = "target")
    private String target;

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
}
