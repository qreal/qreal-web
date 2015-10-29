/*
 * Copyright Anastasia Kornilova
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

class FolderTreeManager {

    static getFolderNames(parentFolder) {
        var folderNames = [];
        for (var i = 0; i < parentFolder.childrenFolders.length; i++) {
            folderNames.push(parentFolder.childrenFolders[i].folderName);
        }

        return folderNames;
    }

    static getDiagramNames(parentFolder) {
        var diagramNames = [];
        for (var i = 0; i < parentFolder.diagrams.length; i++) {
            diagramNames.push(parentFolder.diagrams[i].name);
        }

        return diagramNames;
    }

    static findFolderByName(parentFolder, folderName: string) {
        var folder;
        for (var i = 0; i < parentFolder.childrenFolders.length; i++) {
            if (parentFolder.childrenFolders[i].folderName === folderName) {
                folder = parentFolder.childrenFolders[i];
            }
        }

        return folder;
    }

    static addChildFolder(folderId: number, folderName: string, parentFolder) {
        var folder = {
            folderId: folderId,
            folderName: folderName,
            folderParentId: parentFolder.folderId,
            childrenFolders: [],
            diagrams: []
        }
        parentFolder.childrenFolders.push(folder);
    }

    static addDiagramToFolder(diagramName: string, diagramId: number, parentFolder) {
        var diagram = {
            name: diagramName,
            diagramId: diagramId
        }

        parentFolder.diagrams.push(diagram);
    }

    static getDiagramIdByName(diagramName: string, parentFolder) {
        var diagramId: number;
        for (var i = 0; i < parentFolder.diagrams.length; i++) {
            if (parentFolder.diagrams[i].name === diagramName) {
                diagramId = parentFolder.diagrams[i].diagramId;
            }
        }

        return diagramId;
    }

    static diagramExists(diagramName: string, parentFolder): boolean {
        var exists: boolean = false;
        for (var i = 0; i < parentFolder.diagrams.length; i++) {
            if (parentFolder.diagrams[i].name === diagramName) {
                exists = true;
            }
        }

        return exists;
    }

    static folderExists(folderName: string, parentFolder): boolean {
        var exists: boolean = false;
        for (var i = 0; i < parentFolder.childrenFolders.length; i++) {
            if (parentFolder.childrenFolders[i].folderName === folderName) {
                exists = true;
            }
        }

        return exists;
    }
}