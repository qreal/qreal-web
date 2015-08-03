interface Model {
    getWorldModel() : WorldModel;
    getRobotModels() : RobotModel[];
    getSetting() : Settings;
    addRobotModel(robotModel: TwoDRobotModel): void;
    deserialize(xml): void;
}