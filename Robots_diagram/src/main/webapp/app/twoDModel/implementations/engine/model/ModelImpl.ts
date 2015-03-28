class ModelImpl implements Model {
    private worldModel : WorldModel;
    private timeline : Timeline;
    private settings : Settings;
    private robotModels : RobotModel[] = [];
    private paper: RaphaelPaper;

    constructor() {
        var model = this;
        this.timeline = new TimelineImpl();
        $(document).ready(function() {
            model.paper = Raphael("twoDModel_stage", "100%", "100%");
            $(model.paper.canvas).attr("id", "twoDModel_paper");

            var wall_pattern = '<pattern id="wall_pattern" patternUnits="userSpaceOnUse" width="85" height="80">\
                                        <image xlink:href="images/2dmodel/2d_wall.png" width="85" height="80" />\
                                    </pattern>';
            $("body").append('<svg id="dummy" style="display:none"><defs>' + wall_pattern + '</defs></svg>');
            $("#twoDModel_paper defs").append($("#dummy pattern"));
            $("#dummy").remove();

            model.worldModel = new WorldModelImpl(model.paper);
        });
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

    getPaper(): RaphaelPaper {
        return this.paper;
    }

    getSetting() : Settings {
        return this.settings;
    }

    addRobotModel(robotModel: TwoDRobotModelImpl): void {
        var model = this;
        $(document).ready(function() {
            var robot:RobotModel = new RobotModelImpl(model.paper, robotModel, new TwoDPosition(300, 300));
            model.robotModels.push(robot);
            model.timeline.addRobotModel(robot);
        });
    }
}