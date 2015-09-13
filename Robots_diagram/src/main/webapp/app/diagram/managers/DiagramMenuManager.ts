class DiagramMenuManager {

    private diagramController: DiagramController;
    private currentDiagramName: string;
    private currentDiagramFolder;
    private canBeDeleted: boolean;
    private pathToFolder;
    private folderTree;
    private currentFolder;

    constructor($scope) {
        var menuManager = this;

        this.diagramController = $scope.vm;
        this.resetCurrentDiagram();
        this.canBeDeleted = false;
        this.pathToFolder = [];

        $.ajax({
            type: 'GET',
            url: 'getFolderTree',
            dataType: 'json',
            success: function (response) {
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

    private resetCurrentDiagram(): void {
        this.currentDiagramName = "";
        this.currentDiagramFolder = null;
    }

    private clearAll(): void {
        this.diagramController.clearScene();
        this.canBeDeleted = false;
        this.resetCurrentDiagram();
    }

    private createFolderInDatabase(folderName: string): void {
        var menuManager = this;
        $.ajax({
            type: 'POST',
            url: 'createFolder',
            dataType: 'text',
            contentType: 'application/json',
            data: (ExportManager.exportFolderToJSON(folderName, this.currentFolder.folderId)),
            success: function (createdFolderId) {
                FolderTreeManager.addChildFolder(createdFolderId, folderName, menuManager.currentFolder);
                menuManager.showFolderMenu();
                menuManager.showFolderTable(menuManager.currentFolder);
            },
            error: function (response, status, error) {
                console.log("error: " + status + " " + error);
            }
        });
    }

    private  deleteFolderFromDatabase(folderName: string) {
        var menuManager = this;
        $.ajax({
            type: 'POST',
            url: 'deleteFolder',
            contentType: 'application/json',
            data: (JSON.stringify({id: FolderTreeManager.getFolderIdByName(folderName, this.currentFolder)})),
            success: function () {
                FolderTreeManager.deleteFolderFromTree(folderName, menuManager.currentFolder);
                menuManager.showFolderTable(menuManager.currentFolder);
            },
            error: function (response, status, error) {
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
            data: (ExportManager.exportSavingDiagramStateToJSON(diagramName, this.currentFolder.folderId,
                this.diagramController.getNodesMap(), this.diagramController.getLinksMap())),
            success: function (diagramId) {
                FolderTreeManager.addDiagramToFolder(diagramName, diagramId, menuManager.currentFolder);
                menuManager.currentFolder = menuManager.folderTree;
                menuManager.pathToFolder = [];
                $('#diagrams').modal('hide');

                if (menuManager.canBeDeleted) {
                    menuManager.clearAll();
                }
            },
            error: function (response, status, error) {
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
                data: (ExportManager.exportUpdatingDiagramStateToJSON(this.currentDiagramName, this.currentDiagramFolder,
                    this.diagramController.getNodesMap(), this.diagramController.getLinksMap())),
                success: function () {
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
            data: (JSON.stringify({id: FolderTreeManager.getDiagramIdByName(diagramName, this.currentDiagramFolder)})),
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

    private deleteDiagramFromDatabase(diagramName: string): void {
        var menuManager = this;
        $.ajax({
            type: 'POST',
            url: 'deleteDiagram',
            contentType: 'application/json',
            data: (JSON.stringify({id: FolderTreeManager.getDiagramIdByName(diagramName, this.currentFolder)})),
            success: function () {
                FolderTreeManager.deleteDiagramFromTree(diagramName, menuManager.currentFolder);
                menuManager.showFolderTable(menuManager.currentFolder);

                if (diagramName === menuManager.currentDiagramName
                    && menuManager.currentFolder === menuManager.currentDiagramFolder) {
                    menuManager.resetCurrentDiagram();
                }
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
            }  else if (FolderTreeManager.folderExists(folderName, menuManager.currentFolder)) {
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
            } else if (FolderTreeManager.diagramExists(diagramName, menuManager.currentFolder)) {
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
        var folders;
        var diagrams;

        this.clearFolderTable();
        this.currentFolder = openingFolder;
        folders = FolderTreeManager.getFolderNames(this.currentFolder);
        diagrams = FolderTreeManager.getDiagramNames(this.currentFolder);
        this.showPathToFolder();
        $.each(folders, function (i) {
            $('.folderView ul').prepend("<li class='folders'><span class='glyphicon glyphicon-folder-open' aria-hidden='true'></span>" +
                "<span class='glyphicon-class'>" + folders[i] + "</span></li>");
        });
        $.each(diagrams, function (i) {
            $('.folderView ul').append("<li class='diagrams'><span class='glyphicon glyphicon-file' aria-hidden='true'></span>" +
                "<span class='glyphicon-class'>" + diagrams[i] + "</span></li>");
        });

        $('.folderTable .folders').click(function () {
            menuManager.pathToFolder.push(menuManager.currentFolder);
            menuManager.showFolderTable(FolderTreeManager.findFolderByName(menuManager.currentFolder, $(this).text()));
        });
        $('.folderTable .diagrams').click(function () {
            menuManager.openDiagramFromDatabase($(this).text());
            $('#diagrams').modal('hide');
        });

        this.initCustomMenu();
    }

    private initCustomMenu(): void {
        var menuManager = this;
        var name: string;
        var tableElementClass: string;

        $('#diagrams li').mousedown(function (event) {
            if (event.which == 3) {
                $("#diagrams .custom-menu").finish().toggle(100).
                    css({
                        top: event.pageY + "px",
                        left: event.pageX + "px"
                    });
                name = $(this).text();
                tableElementClass = $(this).attr("class");
            }
        });

        $("#diagrams .custom-menu li").click(function () {
            switch($(this).attr("data-action")) {
                case "delete":
                    if (tableElementClass === 'diagrams') {
                        menuManager.deleteDiagramFromDatabase(name);
                    } else if (tableElementClass === 'folders') {
                        menuManager.deleteFolderFromDatabase(name);
                    }
                    break;
            }

            $(".custom-menu").hide(100);
        });
    }

    private levelUpFolder(): void {
        if (this.pathToFolder.length > 0) {
            this.showFolderTable(this.pathToFolder.pop());
        }
    }
}