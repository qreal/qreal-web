interface Model {
    worldModel : WorldModel;
    timeline : Timeline;
    settings : Settings;
    robotModel : RobotModel;

    getWorldModel() : WorldModel;
    getTimeline() : Timeline;
    getRobotMode() : RobotModel;
    getSetting() : Settings;
}