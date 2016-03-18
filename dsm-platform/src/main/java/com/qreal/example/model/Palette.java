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

    @Column(name = "name")
    private String name;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "name", referencedColumnName = "name")
    private Set<Node> nodes;
}
