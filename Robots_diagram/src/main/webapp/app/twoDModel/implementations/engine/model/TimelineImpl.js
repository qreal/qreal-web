var TimelineImpl = (function () {
    function TimelineImpl() {
        this.timeInterval = 10;
        this.fps = 28;
        this.defaultFrameLength = 1000 / this.fps;
        this.slowSpeedFactor = 2;
        this.normalSpeedFactor = 5;
        this.fastSpeedFactor = 10;
        this.immediateSpeedFactor = 100000000;
        this.defaultRealTimeInterval = 0;
        this.ticksPerCycle = 3;
        this.frameLength = this.defaultFrameLength;
        this.robotModels = [];
    }
    TimelineImpl.prototype.start = function () {
        var timeline = this;
        this.intervalId = setInterval(function () {
            timeline.onTimer(timeline);
        }, this.defaultFrameLength);
    };
    TimelineImpl.prototype.stop = function () {
        clearInterval(this.intervalId);
    };
    TimelineImpl.prototype.onTimer = function (timeline) {
        timeline.getRobotModels().forEach(function (model) {
            model.nextFragment();
        });
    };
    TimelineImpl.prototype.setSpeedFactor = function (factor) {
        this.speedFactor = factor;
    };
    TimelineImpl.prototype.getSpeedFactor = function () {
        return this.speedFactor;
    };
    TimelineImpl.prototype.getRobotModels = function () {
        return this.robotModels;
    };
    TimelineImpl.prototype.addRobotModel = function (robotModel) {
        this.robotModels.push(robotModel);
    };
    return TimelineImpl;
})();
//# sourceMappingURL=TimelineImpl.js.map