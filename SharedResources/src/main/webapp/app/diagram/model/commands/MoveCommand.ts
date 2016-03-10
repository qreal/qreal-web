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

class MoveCommand implements Command {

    private oldX: number;
    private oldY: number;
    private newX: number;
    private newY: number;
    private executionFunction: (x: number, y: number) => void;

    constructor(oldX: number, oldY: number, newX: number, newY: number,
                executionFunction: (x: number, y: number) => void) {
        this.oldX = oldX
        this.oldY = oldY
        this.newX = newX;
        this.newY = newY;
        this.executionFunction = executionFunction;
    }

    public execute(): void {
        this.executionFunction(this.newX, this.newY);
    }

    public revert(): void {
        this.executionFunction(this.oldX, this.oldY);
    }

    public isRevertible(): boolean {
        return !(this.newX === this.oldX && this.newY === this.oldY);
    }

}