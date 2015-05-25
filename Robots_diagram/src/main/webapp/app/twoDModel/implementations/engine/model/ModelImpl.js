var ModelImpl = (function () {
    function ModelImpl() {
        this.robotModels = [];
        var model = this;
        this.timeline = new TimelineImpl();
        model.worldModel = new WorldModelImpl();
    }
    ModelImpl.prototype.getWorldModel = function () {
        return this.worldModel;
    };
    ModelImpl.prototype.getTimeline = function () {
        return this.timeline;
    };
    ModelImpl.prototype.getRobotModels = function () {
        return this.robotModels;
    };
    ModelImpl.prototype.getSetting = function () {
        return this.settings;
    };
    ModelImpl.prototype.addRobotModel = function (robotModel) {
        var model = this;
        $(document).ready(function () {
            var robot = new RobotModelImpl(model.worldModel, robotModel, new TwoDPosition(300, 300));
            model.robotModels.push(robot);
            model.timeline.addRobotModel(robot);
        });
    };
    return ModelImpl;
})();
//# sourceMappingURL=ModelImpl.js.map