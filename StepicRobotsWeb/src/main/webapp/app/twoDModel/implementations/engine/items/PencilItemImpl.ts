/*
 * Copyright vladimir-zakharov
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

class PencilItemImpl {
    private path: RaphaelPath;
    private worldModel: WorldModel;
    private pathArray = new Array();

    constructor(worldModel: WorldModel, xStart: number, yStart: number, width: number, color: string) {
        var paper = worldModel.getPaper();
        this.worldModel = worldModel;
        this.pathArray[0] = ["M", xStart, yStart];
        this.path = paper.path(this.pathArray);
        this.path.attr({
            "stroke": color,
            "stroke-width": width
        });
    }

    setDraggable(): void {
        var pencilItem = this;
        pencilItem.path.attr({cursor: "pointer"});

        var startPath = function () {
                if (!pencilItem.worldModel.getDrawMode()) {
                    this.transformation = this.transform();
                    pencilItem.worldModel.setCurrentElement(pencilItem);
                }
                return this;
            },
            movePath = function (dx, dy) {
                if (!pencilItem.worldModel.getDrawMode()) {
                    this.transform(this.transformation + "T" + dx + "," + dy);
                }
                return this;
            },
            upPath = function () {
                return this;
            };

        pencilItem.path.drag(movePath, startPath, upPath);
    }

    updatePath(x: number, y: number): void {
        this.pathArray[this.pathArray.length] = ["L", x, y];
        this.path.attr({path: this.pathArray});
    }

    getPath(): RaphaelPath {
        return this.path;
    }

    hideHandles(): void {
    }
    showHandles(): void {
    }

    remove(): void {
        this.path.remove();
    }
}