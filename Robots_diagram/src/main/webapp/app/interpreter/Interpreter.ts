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

/// <reference path="BlockFactory.ts" />
/// <reference path="../diagramCore.d.ts" />
/// <reference path="../two-d-model-core.d.ts" />
/// <reference path="../vendor.d.ts" />

class Interpreter {

    private variablesMap: Map<any>;
    private blockFactory: BlockFactory;
    private delay: number;
    private delayTimeoutId: number;
    private stopFlag: boolean;
    private timeline: Timeline;

    constructor() {
        this.blockFactory = new BlockFactory();
    }

    public interpret(graph: joint.dia.Graph, nodesMap: Map<DiagramNode>, linksMap: Map<Link>, 
                     timeline: Timeline): void {
        this.clearState();
        this.timeline = timeline;
        try {
            timeline.start();
            this.run(this.findInitialNodeId(nodesMap), graph, nodesMap, linksMap);
        } catch (error) {
            timeline.stop();
            alert(error.message);
        }
    }
    
    public addOrChangeVariable(name: string, value: any): void {
        this.variablesMap[name] = value;
    }

    public addOrChangeVariableMap(variablesMap: Map<any>): void {
        $.extend(this.variablesMap, variablesMap);
    }
    
    public getVariable(name: string): any {
        if (!this.variablesMap[name]) {
            throw new Error("No such variable:" + name);
        }
        return this.variablesMap[name];
    }
    
    public setDelay(delay: number): void {
        this.delay = delay;
    }

    private run(nodeId: string, graph: joint.dia.Graph, nodesMap: Map<DiagramNode>, linksMap: Map<Link>): void {
        if (this.stopFlag) {
            return;
        }
        var block: AbstractBlock = this.blockFactory.createBlock(nodesMap[nodeId],
            this.getOutboundLinks(graph, nodesMap[nodeId], linksMap), this, this.timeline.getRobotModels());
        block.run();
        var nextNodeId: string = block.getNextNodeId();
        if (nextNodeId) {
            if (this.delay) {
                this.delayTimeoutId = setTimeout(() => {
                    this.delay = 0;
                    this.run(block.getNextNodeId(), graph, nodesMap, linksMap);
                }, this.delay);
            } else {
                this.run(block.getNextNodeId(), graph, nodesMap, linksMap);
            }
        } else {
            this.timeline.stop();
        }
    }
    
    public stop(): void {
        this.stopFlag = true;
        clearTimeout(this.delayTimeoutId);
        if (this.timeline) {
            this.timeline.stop();
        }
    }
    
    private getOutboundLinks(graph: joint.dia.Graph, node: DiagramNode, linksMap: Map<Link>): Link[] {
        var links: Link[] = [];
        var cell = graph.getCell(node.getJointObject().id);
        var jointOutboundLinks: joint.dia.Link[] = graph.getConnectedLinks(cell, { outbound : true });
        jointOutboundLinks.forEach((jointLink) => links.push(linksMap[jointLink.id]));
        return links;
    }

    private findInitialNodeId(nodesMap: Map<DiagramNode>): string {
        for (var id in nodesMap) {
            if (nodesMap.hasOwnProperty(id)) {
                var node: DiagramNode = nodesMap[id];
                if (node.getType() === "InitialNode") {
                    return node.getJointObject().id;
                }
            }
        }
        throw new Error("Initial node was not found");
    }

    private clearState(): void {
        this.variablesMap = {};
        this.delay = 0;
        this.stopFlag = false;
        this.delayTimeoutId = null;
        this.timeline = null;
    }

}