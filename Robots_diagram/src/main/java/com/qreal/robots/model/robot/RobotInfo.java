package com.qreal.robots.model.robot;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * Created by ageevdenis on 02-3-15.
 */
public class RobotInfo {

    private String code;
    private Coordinates coordinates;
    private String program;
    private String owner;

    public RobotInfo() {

    }


    public RobotInfo(String owner, String code, String program) {
        this.owner = owner;
        this.code = code;
        this.program = program;
    }

    public Coordinates getCoordinates() {
        return coordinates;
    }

    public void setCoordinates(Coordinates coordinates) {
        this.coordinates = coordinates;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof RobotInfo)) return false;

        RobotInfo robotInfo = (RobotInfo) o;

        if (!coordinates.equals(robotInfo.coordinates)) return false;
        if (!code.equals(robotInfo.code)) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = code.hashCode();
        result = 31 * result + coordinates.hashCode();
        return result;
    }

    public String toJson() throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.writeValueAsString(this);
    }

    public String getProgram() {
        return program;
    }

    public void setProgram(String program) {
        this.program = program;
    }

    public String getOwner() {
        return owner;
    }

    public void setOwner(String owner) {
        this.owner = owner;
    }
}
