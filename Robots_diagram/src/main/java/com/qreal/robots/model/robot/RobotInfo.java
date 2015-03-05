package com.qreal.robots.model.robot;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * Created by ageevdenis on 02-3-15.
 */
public class RobotInfo {

    private String id;
    private Coordinates coordinates;
    private String program;

    public RobotInfo() {

    }

    public RobotInfo(String id, Coordinates coordinates) {
        this.id = id;
        this.coordinates = coordinates;
    }

    public RobotInfo(String id, String program) {
        this.id = id;
        this.program = program;
    }

    public RobotInfo(String id, Coordinates coordinates, String program) {
        this.id = id;
        this.coordinates = coordinates;
        this.program = program;
    }

    public Coordinates getCoordinates() {
        return coordinates;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setCoordinates(Coordinates coordinates) {
        this.coordinates = coordinates;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof RobotInfo)) return false;

        RobotInfo robotInfo = (RobotInfo) o;

        if (!coordinates.equals(robotInfo.coordinates)) return false;
        if (!id.equals(robotInfo.id)) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id.hashCode();
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
}
