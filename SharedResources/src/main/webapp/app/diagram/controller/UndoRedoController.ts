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

/// <reference path="../model/commands/Command.ts" />

class UndoRedoController {

    private stack: Command[];
    private pointer: number;
    private maxSize: number = 10000;

    constructor() {
        this.stack = [];
        this.pointer = -1;

        $(document).ready(() => {
            var zKey: number = 90;
            $(document).keydown((event) => {
                if (event.keyCode == zKey && event.ctrlKey && event.shiftKey) {
                    this.redo();
                } else if (event.keyCode == zKey && event.ctrlKey) {
                    this.undo();
                }
            });
        });
    }

    public addCommand(command: Command) {
        if (command.isRevertible()) {
            if (this.pointer < this.stack.length - 1) {
                this.popNCommands(this.stack.length - 1 - this.pointer);
            }
            this.stack.push(command);
            if (this.stack.length > this.maxSize) {
                this.stack.shift();
            } else {
                this.pointer++;
            }
        }
    }

    public undo(): void {
        if (this.pointer > -1) {
            this.stack[this.pointer].revert();
            this.pointer--;
        }
    }

    public redo(): void {
        if (this.pointer < this.stack.length - 1) {
            this.pointer++;
            this.stack[this.pointer].execute();
        }
    }

    public clearStack(): void {
        this.stack.splice(0, this.stack.length);
        this.pointer = -1;
    }

    private popNCommands(n: number) {
        while (n && this.stack.pop()) {
            n--;
        }
    }

}