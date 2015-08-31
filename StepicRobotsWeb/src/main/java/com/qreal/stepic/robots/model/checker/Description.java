package com.qreal.stepic.robots.model.checker;

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

    public String getMotors_hint() {
        return motors_hint;
    }

    public void setMotors_hint(String motors_hint) {
        this.motors_hint = motors_hint;
    }

    public String getHint() {
        return hint;
    }

    public void setHint(String hint) {
        this.hint = hint;
    }

    private String main;
    private String note;
    private String motors_hint;
    private String hint;
}
