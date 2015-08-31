package com.qreal.stepic.robots.constants;

/**
 * Created by vladimir-zakharov on 07.08.15.
 */
public class PathConstants {

    public static final String STEPIC_PATH = System.getenv("STEPIC");
    public static final String COMPRESSOR_PATH = STEPIC_PATH + "/compressor";
    public static final String TASKS_PATH = STEPIC_PATH + "/tasks";
    public static final String CHECKER_PATH = STEPIC_PATH + "/trikStudio-checker/bin/check-solution.sh";
    public static final String PATH_TO_GRAPHICAL_PART = "/tree/graphical/RobotsMetamodel/RobotsDiagram";
    public static final String PATH_TO_LOGICAL_PART = "/tree/logical/RobotsMetamodel/RobotsDiagram";
    public static final String PATH_TO_ROOT_ID = "/tree/logical/ROOT_ID/ROOT_ID/ROOT_ID";

}
