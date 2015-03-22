package com.qreal.robots.model.robot;

import java.util.List;

/**
 * Created by ageevdenis on 02-3-15.
 */
public class Message {

    private String from;
    private String type;
    private RobotInfo robot;
    private String user;
    private List<String> secretCodes;

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

    public Message(String from, String type, String user, List<String> secretCodes) {
        this.from = from;
        this.type = type;
        this.secretCodes = secretCodes;
        this.user = user;
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

    public List<String> getSecretCodes() {
        return secretCodes;
    }

    public void setSecretCodes(List<String> secretCodes) {
        this.secretCodes = secretCodes;
    }

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }
}
