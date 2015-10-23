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

class Link implements DiagramElement {
    private logicalId: string;
    private jointObject: joint.dia.Link;
    private properties: PropertiesMap = {};
    private name = "Link"
    private type = "ControlFlow";

    constructor(jointObject: joint.dia.Link, properties: PropertiesMap) {
        this.logicalId = UIDGenerator.generate();
        this.jointObject = jointObject;
        this.properties = properties;

        jointObject.on('change:source', () => {
                this.updateHighlight();
            }
        );

        jointObject.on('change:target', () => {
                this.updateHighlight();
            }
        );
    }

    getLogicalId(): string {
        return this.logicalId;
    }

    getJointObject() {
        return this.jointObject;
    }

    getName(): string {
        return this.name;
    }

    getType(): string {
        return this.type;
    }

    getProperties(): PropertiesMap {
        return this.properties;
    }

    setProperty(key: string, property: Property): void {
        this.properties[key] = property;
    }

    private updateHighlight(): void {
        if (!this.jointObject.get('target').id || !this.jointObject.get('source').id) {
            this.jointObject.attr({
                    '.connection': {stroke: 'red'},
                    '.marker-target': {fill: 'red', d: 'M 10 0 L 0 5 L 10 10 z'}
                }
            );
        } else {
            this.jointObject.attr({
                    '.connection': {stroke: 'black'},
                    '.marker-target': {fill: 'black', d: 'M 10 0 L 0 5 L 10 10 z'}
                }
            );
        }
    }
}