package com.qreal.example.model;

import javax.persistence.*;
import java.io.Serializable;

/**
 * Created by LChernigovskaya on 18.03.2016.
 */
@Entity
@Table(name = "nodes")

public class Node implements Serializable {

    @Id
    @Column(name = "node_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long nodeId;

    @Column(name = "name")
    private String name;

    @Column(name = "image")
    private String image;
}
