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

/// <reference path="Map.ts" />
/// <reference path="Property.ts" />
/// <reference path="../../vendor.d.ts" />

class PropertyEditElement {

    private static template: string = "" +
        "<div class='property-edit-element' style='position: absolute; z-index: 1;'>" +
        "   <span>{3}:</span>" +
        "   <input class='{0} property-edit-input' data-id='{1}' data-type='{2}' width='auto' size='{5}' " +
        "style='border: dashed 1px;' value='{4}'>" +
        "</div>";

    private htmlElement;

    constructor(logicalId: string, jointObjectId: string, propertyKey: string, property: Property) {
        this.htmlElement = $(StringUtils.format(PropertyEditElement.template, propertyKey + "-" + logicalId,
            jointObjectId, propertyKey, property.name, property.value, property.value.length.toString()));
        this.initInputAutosize();
    }

    public getHtmlElement() {
        return this.htmlElement;
    }

    public setPosition(x: number, y: number): void {
        this.htmlElement.css({ left: x - 25, top: y + 55 });
    }

    private initInputAutosize(): void {
        this.htmlElement.find('input').keypress(function(e) {
            if ($(this).val().length > 0) {
                $(this).attr({size: $(this).val().length});
            }
        });
        this.htmlElement.find('input').keydown(function(e) {
            if(e.keyCode === 8 || e.keyCode === 46) {
                if ($(this).val().length > 1) {
                    $(this).attr({size: $(this).val().length - 1});
                }
            }
        });
    }

}