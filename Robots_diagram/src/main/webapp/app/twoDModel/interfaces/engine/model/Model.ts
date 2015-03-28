interface Model {
    getWorldModel() : WorldModel;
    getTimeline() : Timeline;
    getRobotModels() : RobotModel[];
    getSetting() : Settings;
    addRobotModel(robotModel: TwoDRobotModelImpl): void;
    getPaper(): RaphaelPaper;
}