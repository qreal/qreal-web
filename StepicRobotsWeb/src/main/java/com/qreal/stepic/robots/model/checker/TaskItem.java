package com.qreal.stepic.robots.model.checker;

import java.io.Serializable;

/**
 * Created by vladimir-zakharov on 10.08.15.
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

    public Boolean isOnline() {
        return online;
    }

    public void setOnline(Boolean online) {
        this.online = online;
    }

    private String title;
    private String name;
    private Boolean online;
}
