/*
 * Copyright Anton Gulikov
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

class DrawingItemImpl implements DrawingItem {

    private currentPosition : TwoDPosition;
    private worldModel : WorldModel;
    private drawingState : boolean;

    constructor(worldModel : WorldModel, robotItem : RobotItemImpl) {
        var robotPosition : TwoDPosition = robotItem.getCenterPosition();
        this.currentPosition = new TwoDPosition(robotPosition.x - robotItem.getWidth() / 2, robotPosition.y);
        this.worldModel = worldModel;
        this.drawingState = false;
    }

    /**
     * Set a new drawing state : true if robot should draw own way and false otherwise.
     * @param newState
     */
    setDrawingState(newState : boolean) : void {
        this.drawingState = newState;
    }

    /**
     * Remove draw pencil to point (x,y)
     * @param x
     * @param y
     */
    setPosition(x : number, y : number) : void {
        this.currentPosition.x = x;
        this.currentPosition.y = y;
    }

    /**
     * Draw point at the current position, if drawState is true
     */
    drawLine() : void {
        var paper = this.worldModel.getPaper();;
        if (this.drawingState) {
            var rect = paper.rect(this.currentPosition.x, this.currentPosition.y, 3, 3);
            rect.attr({stroke : "#bb0000", fill : "bb0000"});
        }
    }
}