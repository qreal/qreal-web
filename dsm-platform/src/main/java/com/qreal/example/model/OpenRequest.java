package com.qreal.example.model;

import java.io.Serializable;

/**
 * Created by LChernigovskaya on 21.03.2016.
 */
public class OpenRequest implements Serializable {
    private String name;

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
