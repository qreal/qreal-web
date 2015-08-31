package com.qreal.stepic.robots.model.checker;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;

/**
 * Created by vladimir-zakharov on 31.08.15.
 */
public class Description implements Serializable {

    public String getMain() {
        return main;
    }

    public void setMain(String main) {
        this.main = main;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public String getMotorsHint() {
        return motorsHint;
    }

    public void setMotorsHint(String motorsHint) {
        this.motorsHint = motorsHint;
    }

    public String getHint() {
        return hint;
    }

    public void setHint(String hint) {
        this.hint = hint;
    }

    private String main;

    private String note;

    @JsonProperty("motors_hint")
    private String motorsHint;

    private String hint;
}
