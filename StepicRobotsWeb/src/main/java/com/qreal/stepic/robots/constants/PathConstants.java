package com.qreal.stepic.robots.constants;

/**
 * Created by vladzx on 07.08.15.
 */
public class PathConstants {

    public static final String stepicPath = System.getenv("STEPIC");
    public static final String compressorPath = stepicPath + "/compressor";
    public static final String tasksPath = stepicPath + "/tasks";
    public static final String checkerPath = stepicPath + "/trikStudio-checker/bin/check-solution.sh";
    public static final String pathToGraphicalPart = "/tree/graphical/RobotsMetamodel/RobotsDiagram";
    public static final String pathToLogicalPart = "/tree/logical/RobotsMetamodel/RobotsDiagram";
    public static final String pathToRootId = "/tree/logical/ROOT_ID/ROOT_ID/ROOT_ID";

}
