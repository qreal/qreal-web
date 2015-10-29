/*
 * Copyright Vladimir Zakharov 
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

class ModelImpl implements Model {
    private worldModel : WorldModel;
    private timeline : Timeline;
    private settings : Settings;
    private robotModels : RobotModel[] = [];

    constructor() {
        var model = this;
        this.timeline = new TimelineImpl();
        model.worldModel = new WorldModelImpl();
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
        var model = this;
        $(document).ready(function() {
            var robot:RobotModel = new RobotModelImpl(model.worldModel, robotModel, new TwoDPosition(300, 300));
            model.robotModels.push(robot);
            model.timeline.addRobotModel(robot);
        });
    }
}