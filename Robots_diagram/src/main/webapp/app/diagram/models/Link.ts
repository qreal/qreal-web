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

class Link implements DiagramElement {
    private jointObject: joint.dia.Link;
    private properties: PropertiesMap = {};
    private type = "Link";

    constructor(jointObject: joint.dia.Link, properties?: PropertiesMap) {
        this.jointObject = jointObject;

        if (properties) {
            this.properties = properties;
        }
        else {
            this.properties["Guard"] = new Property("", "combobox");
        }
    }

    getJointObject() {
        return this.jointObject;
    }

    getType(): string {
        return this.type;
    }

    getProperties(): PropertiesMap {
        return this.properties;
    }

    setProperty(name:string, property: Property): void {
        this.properties[name] = property;
    }
}