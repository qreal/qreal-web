package com.qreal.robots.model.robot;

/**
 * Created by ageevdenis on 02-3-15.
 */
public class Message {

    private String from;
    private String type;
    private RobotInfo robot;

    public Message() {

    }

    public Message(String from, String type, RobotInfo robots) {
        this.from = from;
        this.type = type;
        this.robot = robots;
    }


    public Message(String from, String type) {
        this.from = from;
        this.type = type;
    }

    public String getFrom() {
        return from;
    }

    public void setFrom(String from) {
        this.from = from;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public RobotInfo getRobot() {
        return robot;
    }

    public void setRobot(RobotInfo robot) {
        this.robot = robot;
    }
}
