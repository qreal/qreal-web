package com.qreal.stepic.robots.model.checker;

import java.io.Serializable;

/**
 * Created by vladzx on 10.08.15.
 */
public class TaskItem implements Serializable {

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    private String title;
    private String name;
}
