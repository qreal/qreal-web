class DiagramMenuManager {
    private diagramController: DiagramController;
    private currentFolder: string;
    private currentDiagramName: string;
    private currentDiagramFolderId: string;
    private canBeDeleted: boolean;
    private pathToFolder;

    constructor($scope) {
        this.diagramController = $scope.vm;
        this.currentFolder = "root";
        this.currentDiagramName = "";
        this.currentDiagramFolderId = "";
        this.canBeDeleted = false;
        this.pathToFolder = [];

        var menuManager = this;

        $.ajax({
            type: 'POST',
            url: 'getFolderTree',
            success: function () {
                console.log("OK");
            },
            error: function (response, status, error) {
                console.log("error: " + status + " " + error);
            }
        });

        $(document).ready(function() {
            $('.modal-footer button').click(function() {
                menuManager.currentFolder = "root";
                menuManager.pathToFolder = [];
            });
            $('#saveAfterCreate').click(function () {
                menuManager.canBeDeleted = true;
                menuManager.saveCurrentDiagram();
            });
        });
    }

    private clearAll(): void {
        this.diagramController.clearScene();
        this.canBeDeleted = false;
        this.currentDiagramName = "";
        this.currentDiagramFolderId = "";
    }

    private saveDiagram(diagramName: string): void {
        var menuManager = this;
        this.currentDiagramName = diagramName;
        var currentFolderId = this.currentFolder + "_" + this.pathToFolder.length;
        this.currentDiagramFolderId = currentFolderId;
        $.ajax({
            type: 'POST',
            url: 'saveDiagram',
            dataType: 'text',
            contentType: 'application/json',
            data: (ExportManager.exportDiagramStateToJSON(diagramName, currentFolderId,
                this.diagramController.getNodesMap(), this.diagramController.getLinksMap())),
            success: function (response) {
                console.log(response);
                menuManager.currentFolder = "root";
                menuManager.pathToFolder = [];
                $('#diagrams').modal('hide');

                if (menuManager.canBeDeleted) {
                    menuManager.clearAll();
                }
            },
            error: function (response, status, error) {
                menuManager.writeWarning(response.responseText, '.savingMenu');
                $('.savingMenu input:text').val('');
                console.log("error: " + status + " " + error);
            }
        });
    }

    private saveCurrentDiagram(): void {
        var menuManager = this;
        if (this.currentDiagramName === "") {
            $('#diagrams').modal('show');
            this.saveDiagramAs();
        }
        else {
            $.ajax({
                type: 'POST',
                url: 'rewriteDiagram',
                dataType: 'text',
                contentType: 'application/json',
                data: (ExportManager.exportDiagramStateToJSON(this.currentDiagramName, this.currentDiagramFolderId,
                    this.diagramController.getNodesMap(), this.diagramController.getLinksMap())),
                success: function (response) {
                    console.log(response.message);
                    if (menuManager.canBeDeleted) {
                        menuManager.clearAll();
                    }
                },
                error: function (response, status, error) {
                    console.log("error: " + status + " " + error);
                }
            });
        }
    }

    private openDiagram(diagramName: string): void {
        var menuManager = this;
        this.currentDiagramName = diagramName;
        var currentFolderId = this.currentFolder + "_" + this.pathToFolder.length;
        this.currentDiagramFolderId = currentFolderId;
        this.currentFolder = "root";
        this.pathToFolder = [];
        $.ajax({
            type: 'POST',
            url: 'openDiagram',
            dataType: 'json',
            contentType: 'application/json',
            data: (ExportManager.exportDiagramRequestToJSON(diagramName, this.currentDiagramFolderId)),
            success: function (response) {
                menuManager.diagramController.clearScene();
                ImportManager.import(response, menuManager.diagramController.getGraph(), menuManager.diagramController.getNodesMap(),
                    menuManager.diagramController.getLinksMap(), menuManager.diagramController.getNodeTypesMap());
            },
            error: function (response, status, error) {
                console.log("error: " + status + " " + error);
            }
        });
    }

    private createNewDiagram(): void {
        $('#confirmNew').modal('show');
    }

    private openFolderWindow(): void {
        this.showFolderMenu();
        this.showFolderTable(this.currentFolder);
        this.clearSavingMenu();
    }

    private saveDiagramAs(): void {
        this.showFolderMenu();
        this.showFolderTable(this.currentFolder);
        this.showSavingMenu();
    }

    private showFolderMenu(): void {
        this.clearFolderMenu();
        var menuManager = this;
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
            menuManager.createFolder();
        });

        $('.folderMenu #cancelCreating').click(function() {
            menuManager.showFolderMenu();
        });
    }

    private showSavingMenu(): void {
        this.clearSavingMenu();
        var menuManager = this;

        $('.savingMenu').append("<b>Input diagram name</b><input type:text>");
        $('#diagrams .modal-footer').prepend("<button id='saving' type='button' class='btn btn-success'>Save</button>");

        $('#saving').click(function() {
            menuManager.clearWarning('.savingMenu p');
            var name: string = $('.savingMenu input:text').val();
            if (name === "") {
                menuManager.writeWarning("Empty name", '.savingMenu');
            }
            else{
                menuManager.saveDiagram(name);
            }
        });
    }

    private writeWarning(message : string, place : string) : void {
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

    private clearWarning(place : string): void {
        $(place).remove();
    }

    private showPathToFolder(): void {
        $('.folderPath p').remove();
        var path: string = "";
        var i: number = 0;
        if (this.pathToFolder.length > 3) {
            i = this.pathToFolder.length - 2;
            path = "...";
        }
        else {
            i = 1;
        }
        for (i; i < this.pathToFolder.length; i++) {
            path = path + this.pathToFolder[i] + "/";
        }
        if(this.currentFolder !== "root") {
            path = path + this.currentFolder;
        }

        $('.folderPath').prepend("<p>" + path + "</p>");
    }

    private showFolderTable(openingFolder: string): void {
        this.clearFolderTable();
        this.currentFolder = openingFolder;
        this.showPathToFolder();
        var currentFolderId = this.currentFolder + "_" + this.pathToFolder.length;
        var menuManager = this;
        $.ajax({
            type: 'POST',
            url: 'getFolderNames',
            dataType: 'json',
            contentType: 'application/json',
            data: (JSON.stringify({name: currentFolderId})),
            success: function (response) {
                console.log(response);
                $.each(response, function (i) {
                    $('.folderView ul').prepend("<li class='folders'><span class='glyphicon glyphicon-folder-open' aria-hidden='true'></span>" +
                        "<span class='glyphicon-class'>" + response[i] + "</span></li>");
                });
                $('.folderTable .folders').click(function () {
                    menuManager.pathToFolder.push(menuManager.currentFolder);
                    menuManager.showFolderTable($(this).text());
                });
            },
            error: function (response, status, error) {
                console.log("error: " + status + " " + error);
            }
        });
        $.ajax({
            type: 'POST',
            url: 'getDiagramNames',
            dataType: 'json',
            contentType: 'application/json',
            data: (JSON.stringify({name: currentFolderId})),
            success: function(response) {
                $.each(response, function (i) {
                    $('.folderView ul').append("<li class='diagrams'><span class='glyphicon glyphicon-file' aria-hidden='true'></span>" +
                        "<span class='glyphicon-class'>" + response[i] + "</span></li>");
                });
                $('.folderTable .diagrams').click(function () {
                    menuManager.openDiagram($(this).text());
                    $('#diagrams').modal('hide');
                });
            },
            error: function (response, status, error) {
                console.log("error: " + status + " " + error);
            }
        });
    }

    private levelUpFolder(): void {
        if (this.pathToFolder.length > 0) {
            var parentFolder: string = this.pathToFolder.pop();
            this.showFolderTable(parentFolder);
        }
    }

    private createFolder() : void {
        var name: string = $('.folderMenu input:text').val();
        var menuManager = this;
        var newFolderLevel: number = this.pathToFolder.length + 1;
        var newfolderId: string = name + "_" + newFolderLevel;
        var currentFolderId: string = this.currentFolder + "_" + this.pathToFolder.length;
        if (name === "") {
            this.writeWarning("Empty name", '.folderMenu');
        }
        else {
            $.ajax({
                type: 'POST',
                url: 'createFolder',
                dataType: 'text',
                contentType: 'application/json',
                data: (ExportManager.exportFolderToJSON(newfolderId, name, currentFolderId)),
                success: function () {
                    menuManager.showFolderMenu();
                    menuManager.showFolderTable(menuManager.currentFolder);
                },
                error: function (response, status, error) {
                    menuManager.writeWarning(response.responseText, '.folderMenu');
                    $('.folderMenu input:text').val('');
                    console.log("error: " + status + " " + error);
                }
            });
        }
    }
}