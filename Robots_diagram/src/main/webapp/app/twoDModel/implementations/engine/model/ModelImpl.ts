class ModelImpl implements Model {
    worldModel : WorldModel;
    timeline : Timeline;
    settings : Settings;
    robotModel : RobotModel;

    constructor($scope) {
        this.worldModel = new WorldModelImpl($scope);

        this.robotModel = new RobotModelImpl();

        this.timeline = new TimelineImpl(this.robotModel);
        //this.timeline.start();
    }

    getWorldModel() : WorldModel {
        return this.worldModel;
    }

    getTimeline() : Timeline {
        return this.timeline;
    }

    getRobotMode() : RobotModel {
        return this.robotModel;
    }

    getSetting() : Settings {
        return this.settings;
    }
}