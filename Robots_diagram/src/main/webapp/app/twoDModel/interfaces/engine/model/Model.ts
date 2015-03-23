interface Model {
    worldModel : WorldModel;
    timeline : Timeline;
    settings : Settings;
    robotModel : RobotModel;

    getWorldModel() : WorldModel;
    getTimeline() : Timeline;
    getRobotModel() : RobotModel;
    getSetting() : Settings;
}