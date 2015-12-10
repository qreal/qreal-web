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

class DiagramPaper extends joint.dia.Paper {
    private controller;
    private gridSizeValue: number;

    constructor(controller: DiagramController, graph: joint.dia.Graph) {
        this.controller = controller;
        this.gridSizeValue = 25;

        super({
            el: $('#diagram_paper'),
            width: 2000,
            height: 2000,
            model: graph,
            gridSize: this.gridSizeValue,
            defaultLink: new joint.dia.Link({
                attrs: {
                    '.connection': { stroke: 'black' },
                    '.marker-target': { fill: 'black', d: 'M 10 0 L 0 5 L 10 10 z' }
                }
            }),
            validateConnection: function (cellViewS, magnetS, cellViewT, magnetT, end, linkView) {
                return (!(magnetT && magnetT.getAttribute('type') === 'output') && !(cellViewT && cellViewT.model.get('type') === 'link'));
            },
            validateMagnet: function (cellView, magnet) {
                return magnet.getAttribute('magnet') !== 'passive';
            },
            diagramElementView: joint.dia.ElementView.extend(this.getDiagramElementView())
        });
    }

    getGridSizeValue(): number {
        return this.gridSizeValue;
    }

    getDiagramElementView() {
        var controller = this.controller;
        return jQuery.extend(joint.shapes.basic.PortsViewInterface,
            {
                pointerdown: function (evt, x, y) {
                    if ( // target is a valid magnet start linking
                    evt.target.getAttribute('magnet') &&
                    this.paper.options.validateMagnet.call(this.paper, this, evt.target)
                    ) {
                        this.model.trigger('batch:start');

                        var link = this.paper.getDefaultLink(this, evt.target);
                        if (evt.target.tagName === "circle") {
                            link.set({
                                source: {
                                    id: this.model.id
                                },
                                target: { x: x, y: y }
                            });
                        } else {
                            link.set({
                                source: {
                                    id: this.model.id,
                                    selector: this.getSelector(evt.target),
                                    port: $(evt.target).attr('port')
                                },
                                target: { x: x, y: y }
                            });
                        }

                        var typeProperties = controller.getNodeTypesMap()["ControlFlow"].getPropertiesMap();

                        var nodeProperties: PropertiesMap = {};
                        for (var property in typeProperties) {
                            nodeProperties[property] = new Property(typeProperties[property].name,
                                typeProperties[property].type, typeProperties[property].value);
                        }

                        var linkObject: Link = new Link(link, nodeProperties);
                        controller.addLink(link.id, linkObject);

                        this.paper.model.addCell(link);

                        this._linkView = this.paper.findViewByModel(link);
                        this._linkView.startArrowheadMove('target');

                    } else {

                        this._dx = x;
                        this._dy = y;

                        joint.dia.CellView.prototype.pointerdown.apply(this, arguments);
                    }
                }
            });
    }
}