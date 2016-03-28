package com.qreal.example.model;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Set;

/**
 * Created by LChernigovskaya on 18.03.2016.
 */

@Entity
@Table(name = "palettes")
public class Palette implements Serializable {
    @Id
    @Column(name = "palette_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long paletteId;

    @Column(name = "palette_name")
    private String paletteName;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "palette_id", referencedColumnName = "palette_id")
    private Set<Node> nodes;

    public Set<Node> getNodes() {
        return this.nodes;
    }

    public Long getPaletteId() {
        return this.paletteId;
    }

    public String getPaletteName() {
        return this.paletteName;
    }

    public void setPaletteId(Long id) {
        this.paletteId = id;
    }

    public void setPaletteName(String name) {
        this.paletteName = name;
    }

    public void setNodes(Set<Node> nodes) {
        this.nodes = nodes;
    }
}
