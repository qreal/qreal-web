package com.qreal.example.model;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Set;

/**
 * Created by LChernigovskaya on 09.05.2016.
 */
@Entity
@Table(name = "nodes")

public class Variant implements Serializable {

    @Id
    @Column(name = "variant_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long variantId;

    @Column(name = "name")
    private String name;

    public Long getVariantId() {
        return this.variantId;
    }

    public String getName() {
        return this.name;
    }

    public void setVariantId(Long id) {
        this.variantId = id;
    }

    public void setName(String name) {
        this.name = name;
    }
}
