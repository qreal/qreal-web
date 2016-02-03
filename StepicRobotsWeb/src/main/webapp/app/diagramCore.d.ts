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

declare class Link {
}

declare class DiagramNode {
}

declare class SubprogramDiagramNode {
}

declare class RobotsDiagramNode {
}

declare interface DiagramElement {
}

declare class Map<T> {
}

declare class NodeType {
}

declare class Property {
}

declare class SubprogramNode {
}

declare class DiagramPaper {

    public getGridSize(): number;
    public getZoom(): number;
    public getNodesMap(): Map<DiagramNode>;
    public getLinksMap(): Map<Link>;
    public getNodeById(id: string): DiagramNode;
    public getLinkById(id: string): Link;
    public addNodesFromMap(nodesMap: Map<DiagramNode>): void;
    public addLinksFromMap(linksMap: Map<Link>): void;
    public addLinkToMap(linkId: string, linkObject: Link): void;
    public removeNode(nodeId: string): void;
    public removeLink(linkId: string): void;
    public clear(): void;
    public createDefaultNode(name: string, type: string, x: number, y: number, properties: Map<Property>,
                             imagePath: string, id?: string): DiagramNode;
    public createSubprogramNode(name: string, type: string, x: number, y: number, properties: Map<Property>,
                                imagePath: string, subprogramDiagramId: string, id?: string): SubprogramNode;

}

declare class PaletteTypes {
    categories: Map<Map<NodeType>>;
}

declare class ElementTypes {
    uncategorisedTypes: Map<NodeType>;
    paletteTypes: PaletteTypes;
}

declare class DiagramParts {

    nodesMap: Map<DiagramNode>;
    linksMap: Map<Link>;
    robotsDiagramNode: RobotsDiagramNode;
    subprogramDiagramNodes: SubprogramDiagramNode[];

    constructor(nodesMap?: Map<DiagramNode>, linksMap?: Map<Link>, robotsDiagramNode?: RobotsDiagramNode,
                subprogramDiagramNodes?: SubprogramDiagramNode[]);

}

declare class DiagramEditor {

    public getGraph(): joint.dia.Graph;
    public getPaper(): DiagramPaper;
    public clear(): void;

}

declare class PaperController {

    constructor(diagramEditorController: DiagramEditorController, paper: DiagramPaper);

    public getCurrentElement(): DiagramElement;

    public clearState(): void;

}

declare class PropertyEditorController {

    constructor(paperController: PaperController);

    public setNodeProperties(element: DiagramElement): void;

    public clearState(): void;

}

declare class ElementsTypeLoader {

    load(kit: string, task: string, callback: (elementTypes: ElementTypes) => void): void;

}

declare class PaletteController {

    public initDraggable(): void;

    public appendSubprogramsPalette(subprogramDiagramNodes: SubprogramDiagramNode[],
                                    nodeTypesMap: Map<NodeType>): void;

    public appendBlocksPalette(paletteTypes: PaletteTypes): void;

}

declare class DiagramJsonParser {

    public parse(diagramJson: any, nodeTypesMap: Map<NodeType>): DiagramParts;

}

declare class DiagramExporter {

    public exportDiagramStateToJSON(graph: joint.dia.Graph, diagramParts: DiagramParts);

}

declare class DiagramElementListener {

    static getNodeProperties: (type: string) => Map<Property>;

}