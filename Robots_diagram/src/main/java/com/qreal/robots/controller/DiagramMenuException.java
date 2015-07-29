package com.qreal.robots.controller;

/**
 * Created by korniluk13 on 26.07.2015.
 */
public class DiagramMenuException extends RuntimeException {
    private String exceptionMessage;

    public DiagramMenuException(String message) {
        this.exceptionMessage = message;
    }

    public String getExceptionMessage() {
        return this.exceptionMessage;
    }

    public void setExceptionMessage(String message) {
        this.exceptionMessage = message;
    }
}
