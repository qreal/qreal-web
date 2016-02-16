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

/// <reference path="exporters/RobotsDiagramExporter.ts" />
/// <reference path="../model/Diagram.ts" />
/// <reference path="../model/Folder.ts" />
/// <reference path="../../diagramCore.d.ts" />
/// <reference path="../../vendor.d.ts" />

class DiagramMenuController {

    private diagramEditorController: DiagramEditorController;
    protected diagramJsonParser: DiagramJsonParser;
    protected diagramExporter: RobotsDiagramExporter;
    private currentDiagramName: string;
    private currentDiagramFolder: Folder;
    private canBeDeleted: boolean;
    private pathToFolder;
    private folderTree;
    private currentFolder;

    constructor(diagramEditorController: DiagramEditorController) {
        this.diagramEditorController = diagramEditorController;
        this.diagramJsonParser = new DiagramJsonParser();
        this.diagramExporter = new RobotsDiagramExporter();
        this.currentDiagramName = "";
        this.currentDiagramFolder = null;
        this.canBeDeleted = false;
        this.pathToFolder = [];

        var menuManager = this;

        $.ajax({
            type: 'GET',
            url: 'getFolderTree',
            dataType: 'json',
            success: function (response, status, jqXHR) {
                menuManager.folderTree = response;
                menuManager.currentFolder = response;
            },
            error: function (response, status, error) {
                console.log("error: " + status + " " + error);
            }
        });

        $(document).ready(function() {
            $('.modal-footer button').click(function() {
                menuManager.currentFolder = menuManager.folderTree;
                menuManager.pathToFolder = [];
            });
            $('#saveAfterCreate').click(function () {
                menuManager.canBeDeleted = true;
                menuManager.updateCurrentDiagramInDatabase();
            });
        });
    }

    private clearAll(): void {
        this.diagramEditorController.clearState();
        this.canBeDeleted = false;
        this.currentDiagramName = "";
        this.currentDiagramFolder = null;
    }

    private createFolderInDatabase(folderName: string): void {
        var menuManager = this;
        $.ajax({
            type: 'POST',
            url: 'createFolder',
            dataType: 'text',
            contentType: 'application/json',
            data: ({
                'folderName': folderName,
                'folderParentId': menuManager.currentFolder.getId()
            }),
            success: function (createdFolderId, status, jqXHR): any {
                menuManager.currentFolder.addChild(
                    new Folder(createdFolderId, folderName, menuManager.currentFolder.getId()));
                menuManager.showFolderMenu();
                menuManager.showFolderTable(menuManager.currentFolder);
            },
            error: function (response, status, error): any {
                console.log("error: " + status + " " + error);
            }
        });
    }

    private saveDiagramInDatabase(diagramName: string): void {
        var menuManager = this;
        this.currentDiagramName = diagramName;
        this.currentDiagramFolder = this.currentFolder;
        $.ajax({
            type: 'POST',
            url: 'saveDiagram',
            dataType: 'text',
            contentType: 'application/json',
            data: (menuManager.diagramExporter.exportSavingDiagramStateToJSON(this.diagramEditorController.getGraph(),
                new DiagramParts(this.diagramEditorController.getNodesMap(), this.diagramEditorController.getLinksMap()),
                diagramName, this.currentFolder.folderId)),
            success: function (diagramId, status, jqXHR): any {
                menuManager.currentFolder.addDiagram(new Diagram(diagramId, diagramName));
                menuManager.currentFolder = menuManager.folderTree;
                menuManager.pathToFolder = [];
                $('#diagrams').modal('hide');

                if (menuManager.canBeDeleted) {
                    menuManager.clearAll();
                }
            },
            error: function (response, status, error): any {
                console.log("error: " + status + " " + error);
            }
        });
    }

    private updateCurrentDiagramInDatabase(): void {
        var menuManager = this;
        if (this.currentDiagramName === "") {
            $('#diagrams').modal('show');
            this.saveDiagramAs();
        } else {
            $.ajax({
                type: 'POST',
                url: 'updateDiagram',
                dataType: 'text',
                contentType: 'application/json',
                data: (menuManager.diagramExporter.exportUpdatingDiagramStateToJSON(this.diagramEditorController.getGraph(),
                    new DiagramParts(this.diagramEditorController.getNodesMap(), this.diagramEditorController.getLinksMap()),
                    this.currentDiagramName, this.currentDiagramFolder)),
                success: function (response, status, jqXHR): any {
                    if (menuManager.canBeDeleted) {
                        menuManager.clearAll();
                    }
                },
                error: function (response, status, error): any {
                    console.log("error: " + status + " " + error);
                }
            });
        }
    }

    private openDiagramFromDatabase(diagramName: string): void {
        var menuManager = this;
        this.currentDiagramName = diagramName;
        this.currentDiagramFolder = this.currentFolder;
        this.currentFolder = this.folderTree;
        this.pathToFolder = [];
        $.ajax({
            type: 'POST',
            url: 'openDiagram',
            dataType: 'json',
            contentType: 'application/json',
            data: (JSON.stringify({id: menuManager.currentDiagramFolder.getDiagramIdByName(diagramName)})),
            success: function (response, status, jqXHR): any {
                menuManager.diagramEditorController.clearState();
                // TODO: import
            },
            error: function (response, status, error): any {
                console.log("error: " + status + " " + error);
            }
        });
    }

    // TODO: should be migrated to view

    private createNewDiagram(): void {
        $('#confirmNew').modal('show');
    }

    private openFolderWindow(): void {
        this.showFolderMenu();
        this.showFolderTable(this.currentFolder);
        this.clearSavingMenu();
    }

    private saveCurrentDiagram(): void {
        if (this.currentDiagramName === "") {
            this.saveDiagramAs();
        } else {
            this.updateCurrentDiagramInDatabase();
        }
    }

    private saveDiagramAs(): void {
        $('#diagrams').modal('show');
        this.showFolderMenu();
        this.showFolderTable(this.currentFolder);
        this.showSavingMenu();
    }

    private showFolderMenu(): void {
        var menuManager = this;
        this.clearFolderMenu();
        $('.folderMenu').append("<i id='levelUp'><span class='glyphicon glyphicon-arrow-left'></span></i>");
        $('.folderMenu #levelUp').click(function() {
            menuManager.levelUpFolder();
        });

        $('.folderMenu').append("<i id='creatingMenu'><span class='glyphicon glyphicon-plus'></span></i>");
        $('.folderMenu #creatingMenu').click(function() {
            menuManager.showCreatingMenu();
        });
    }

    private showCreatingMenu() {
        var menuManager = this;
        this.clearFolderMenu();
        $('.folderMenu').append(
            "<input type='text'>" +
            "<i id='creating'><span class='glyphicon glyphicon-ok' aria-hidden='true'></span></i>" +
            "<i id='cancelCreating'><span class='glyphicon glyphicon-remove'></span></i>");

        $('.folderMenu #creating').click(function() {
            menuManager.clearWarning('.folderMenu p');
            var folderName: string = $('.folderMenu input:text').val();
            if (folderName === "") {
                menuManager.writeWarning("Empty name", '.folderMenu');
            }  else if (menuManager.currentFolder.isChildExists(folderName)) {
                menuManager.writeWarning("The folder with this name already exists", '.folderMenu');
            } else {
                menuManager.createFolderInDatabase(folderName);
            }
        });

        $('.folderMenu #cancelCreating').click(function() {
            menuManager.showFolderMenu();
        });
    }

    private showSavingMenu(): void {
        var menuManager = this;
        this.clearSavingMenu();

        $('.savingMenu').append("<b>Input diagram name</b><input type:text>");
        $('#diagrams .modal-footer').prepend("<button id='saving' type='button' class='btn btn-success'>Save</button>");

        $('#saving').click(function() {
            menuManager.clearWarning('.savingMenu p');
            var diagramName: string = $('.savingMenu input:text').val();
            if (diagramName === "") {
                menuManager.writeWarning("Empty name", '.savingMenu');
            } else if (menuManager.currentFolder.isDiagramExists(diagramName)) {
                menuManager.writeWarning("The diagram with this name already exists", '.savingMenu');
            } else {
                menuManager.saveDiagramInDatabase(diagramName);
            }
        });
    }

    private writeWarning(message: string, place: string): void {
        $(place).append("<p class='warningMessage'>" + message + "</p>");
    }

    private clearSavingMenu(): void {
        $('.savingMenu').empty();
        $('.modal-footer #saving').remove();
    }

    private clearFolderMenu(): void {
        $('.folderMenu').empty();
    }

    private clearFolderTable(): void {
        $('.folderTable li').remove();
    }

    private clearWarning(place: string): void {
        $(place).remove();
    }

    private showPathToFolder(): void {
        var path: string = "";
        var i: number = 0;

        $('.folderPath p').remove();

        if (this.pathToFolder.length > 3) {
            i = this.pathToFolder.length - 2;
            path = "...";
        } else {
            i = 1;
        }

        for (i; i < this.pathToFolder.length; i++) {
            path = path + this.pathToFolder[i].folderName + "/";
        }

        if (this.currentFolder.folderName !== "root") {
            path = path + this.currentFolder.folderName;
        }

        $('.folderPath').prepend("<p>" + path + "</p>");
    }

    private showFolderTable(openingFolder): void {
        var menuManager = this;

        this.clearFolderTable();
        this.currentFolder = openingFolder;
        var folderNames: string[] = this.currentFolder.getChildrenNames();
        var diagramNames: string[] = this.currentFolder.getDiagramNames();
        this.showPathToFolder();
        $.each(folderNames, function (i) {
            $('.folderView ul').prepend("<li class='folders'><span class='glyphicon glyphicon-folder-open' aria-hidden='true'></span>" +
                "<span class='glyphicon-class'>" + folderNames[i] + "</span></li>");
        });
        $.each(diagramNames, function (i) {
            $('.folderView ul').append("<li class='diagrams'><span class='glyphicon glyphicon-file' aria-hidden='true'></span>" +
                "<span class='glyphicon-class'>" + diagramNames[i] + "</span></li>");
        });

        $('.folderTable .folders').click(function () {
            menuManager.pathToFolder.push(menuManager.currentFolder);
            menuManager.showFolderTable(menuManager.currentFolder.findChildByName($(this).text()));
        });
        $('.folderTable .diagrams').click(function () {
            menuManager.openDiagramFromDatabase($(this).text());
            $('#diagrams').modal('hide');
        });
    }

    private levelUpFolder(): void {
        if (this.pathToFolder.length > 0) {
            this.showFolderTable(this.pathToFolder.pop());
        }
    }
}