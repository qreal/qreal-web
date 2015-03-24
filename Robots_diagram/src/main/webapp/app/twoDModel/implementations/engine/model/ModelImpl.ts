class ModelImpl implements Model {
    private worldModel : WorldModel;
    private timeline : Timeline;
    private settings : Settings;
    private robotModels : RobotModel[] = [];

    constructor() {
        this.worldModel = new WorldModelImpl();
    }

    getWorldModel() : WorldModel {
        return this.worldModel;
    }

    getTimeline() : Timeline {
        return this.timeline;
    }

    getRobotModels() : RobotModel[] {
        return this.robotModels;
    }

    getSetting() : Settings {
        return this.settings;
    }

    addRobotModel(robotModel: TwoDRobotModel): void {
        var robot: RobotModel = new RobotModelImpl();
        this.robotModels.push(robot);
        this.timeline.addRobotModel(robot);
    }
}