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

class Folder {

    private id: number;
    private name: string;
    private parentId: number;
    private childrenFolders: Folder[];
    private diagrams: Diagram[];

    constructor(id: number, name: string, parentId: number, childrenFolders?: Folder[], diagrams?: Diagram[]) {
        this.id = id;
        this.name = name;
        this.parentId = parentId;
        this.childrenFolders = (childrenFolders) ? childrenFolders : [];
        this.diagrams = (diagrams) ? diagrams : [];
    }

    public getChildrenNames(): string[] {
        var folderNames: string[] = [];
        for (var i = 0; i < this.childrenFolders.length; i++) {
            folderNames.push(this.childrenFolders[i].getName());
        }

        return folderNames;
    }

    public getDiagramNames(): string[] {
        var diagramNames: string[] = [];
        for (var i = 0; i < this.diagrams.length; i++) {
            diagramNames.push(this.diagrams[i].getName());
        }

        return diagramNames;
    }

    public findChildByName(childName: string): Folder {
        for (var i = 0; i < this.childrenFolders.length; i++) {
            if (this.childrenFolders[i].getName() === childName) {
                return this.childrenFolders[i];
            }
        }
        return null;
    }

    public getDiagramIdByName(diagramName: string): number {
        for (var i = 0; i < this.diagrams.length; i++) {
            if ( this.diagrams[i].getName() === diagramName) {
                return  this.diagrams[i].getId();
            }
        }

        return -1;
    }

    public isDiagramExists(diagramName: string): boolean {
        for (var i = 0; i < this.diagrams.length; i++) {
            if (this.diagrams[i].getName() === diagramName) {
                return true;
            }
        }

        return false;
    }

    public isChildExists(folderName: string): boolean {
        for (var i = 0; i < this.childrenFolders.length; i++) {
            if (this.childrenFolders[i].getName() === folderName) {
                return true;
            }
        }

        return false;
    }

    public setId(id: number): void {
        this.id = id;
    }

    public getId(): number {
        return this.id;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public getName(): string {
        return this.name;
    }

    public getParentId(): number {
        return this.parentId;
    }

    public addChild(folder: Folder): void {
        this.childrenFolders.push(folder);
    }

    public getChildren(): Folder[] {
        return this.childrenFolders;
    }

    public addDiagram(diagram: Diagram): void {
        this.diagrams.push(diagram);
    }

    public getDiagrams(): Diagram[] {
        return this.diagrams;
    }

}