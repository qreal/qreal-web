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
/// <reference path="DiagramNode.ts" />
/// <reference path="Link.ts" />
/// <reference path="../controller/DiagramElementListener.ts" />
/// <reference path="../../vendor.d.ts" />

class DiagramPaper extends joint.dia.Paper {

    private graph: joint.dia.Graph;
    private nodesMap: Map<DiagramNode>;
    private linksMap: Map<Link>;
    private gridSize: number;
    private zoom: number;

    constructor(graph: joint.dia.Graph) {
        this.graph = graph;
        this.nodesMap = {};
        this.linksMap = {};
        this.gridSize = 25;
        this.zoom = 0.8;

        super({
            el: $('#diagram_paper'),
            width: 2000,
            height: 2000,
            model: graph,
            gridSize: this.gridSize,
            defaultLink: new joint.dia.Link({
                attrs: {
                    '.connection': { stroke: 'black' },
                    '.marker-target': { fill: 'black', d: 'M 10 0 L 0 5 L 10 10 z' }
                }
            }),
            validateConnection: function (cellViewS, magnetS, cellViewT, magnetT, end, linkView) {
                return (!(magnetT && magnetT.getAttribute('type') === 'output')
                     && !(cellViewT && cellViewT.model.get('type') === 'link'));
            },
            validateMagnet: function (cellView, magnet) {
                return magnet.getAttribute('magnet') !== 'passive';
            },
            diagramElementView: joint.dia.ElementView.extend(this.getDiagramElementView())
        });

        this.scale(this.zoom, this.zoom);
    }

    public getGridSize(): number {
        return this.gridSize;
    }

    public getZoom(): number {
        return this.zoom;
    }

    public getNodesMap(): Map<DiagramNode> {
        return this.nodesMap;
    }

    public getLinksMap(): Map<Link> {
        return this.linksMap;
    }

    public getNodeById(id: string): DiagramNode {
        return this.nodesMap[id];
    }

    public getLinkById(id: string): Link {
        return this.linksMap[id];
    }

    public addNodesFromMap(nodesMap: Map<DiagramNode>): void {
        $.extend(this.nodesMap, nodesMap);
        for (var nodeId in nodesMap) {
            var node: DiagramNode = nodesMap[nodeId];
            if (node instanceof SubprogramNode) {
                this.addSubprogramNode(<SubprogramNode> node);
            } else {
                this.addNode(node);
            }
        }
    }

    public addLinksFromMap(linksMap: Map<Link>): void {
        $.extend(this.linksMap, linksMap);
        for (var linkId in linksMap) {
            var link: Link = linksMap[linkId];
            this.addLink(link);
        }
    }

    public addLinkToMap(linkId: string, linkObject: Link): void {
        this.linksMap[linkId] = linkObject;
    }

    public removeNode(nodeId: string): void {
        var node: DiagramNode = this.nodesMap[nodeId];

        var links = this.graph.getConnectedLinks(node.getJointObject(), { inbound: true, outbound: true });

        links.forEach((link) => {
            delete this.linksMap[link.id];
        });

        node.getJointObject().remove();
        delete this.nodesMap[nodeId];
    }

    public removeLink(linkId: string): void {
        var link: Link = this.linksMap[linkId];
        link.getJointObject().remove();
        delete this.linksMap[linkId];
    }

    public clear(): void {
        this.nodesMap = {};
        this.linksMap = {};
    }

    public createDefaultNode(name: string, type: string, x: number, y: number, properties: Map<Property>,
                      imagePath: string, id?: string): DiagramNode {
        var node: DiagramNode = new DefaultDiagramNode(name, type, x, y, properties, imagePath, id);
        this.nodesMap[node.getJointObject().id] = node;
        this.addNode(node);
        return node;
    }

    public createSubprogramNode(name: string, type: string, x: number, y: number, properties: Map<Property>,
                         imagePath: string, subprogramDiagramId: string, id?: string): SubprogramNode {
        var node: SubprogramNode = new SubprogramNode(name, type, x, y, properties, imagePath, subprogramDiagramId, id);
        this.nodesMap[node.getJointObject().id] = node;
        this.addSubprogramNode(node);
        return node;
    }

    private addSubprogramNode(node: SubprogramNode): void {
        var textObject: joint.shapes.basic.Text = node.getTextObject();
        node.getJointObject().embed(textObject);
        this.graph.addCell(textObject);
        this.addNode(node);
    }

    private addNode(node: DiagramNode): void {
        this.graph.addCell(node.getJointObject());
    }

    private addLink(link: Link): void {
        this.graph.addCell(link.getJointObject());
    }

    private getDiagramElementView() {
        DiagramElementListener.addLinkToMap = (linkId: string, linkObject: Link): void => {
            this.addLinkToMap(linkId, linkObject);
        };
        return jQuery.extend(joint.shapes.basic.PortsViewInterface,
            {
                pointerdown: DiagramElementListener.pointerdown
            });
    }
}