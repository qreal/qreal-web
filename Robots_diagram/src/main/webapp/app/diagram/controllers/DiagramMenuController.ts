class DiagramMenuController {
    private diagramController;
    private currentFolderId: string;
    private user: string;
    private folderLevel: number;
    private currentDiagramName: string;
    private currentDiagramFolderId: string;
    private canBeDeleted: boolean;

    constructor($scope) {
        this.diagramController = $scope.vm;
        this.folderLevel = 0;
        this.currentDiagramFolderId = "";
        this.currentDiagramName = "";
        this.canBeDeleted = false;

        var user: string;
        $.ajax({
            type: 'POST',
            url: 'getUser',
            dataType: 'text',
            success: function (response) {
                user = response;
            }
        });
        this.user = user;
        this.currentFolderId = this.user + "root_0";

        $.ajax({
            type: 'POST',
            url: 'createFolder',
            dataType: 'text',
            contentType: 'application/json',
            data: (ExportManager.exportFolderToJSON(this.currentFolderId, "root", "")),
            success: function () {},
            error: function (response, status, error) {
                console.log("error: " + status + " " + error);
            }
        });

        var menuController = this;

        $(document).ready(function() {
            $('.modal-footer button').click(function() {
                menuController.currentFolderId = menuController.user + "root_0";
                menuController.folderLevel = 0;
            });
            $('#saveAfterCreate').click(function () {
                menuController.canBeDeleted = true;
                menuController.saveCurrentDiagram();
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
        var menuController = this;
        this.currentDiagramName = diagramName;
        this.currentDiagramFolderId = this.currentFolderId;
        $.ajax({
            type: 'POST',
            url: 'saveDiagram',
            dataType: 'text',
            contentType: 'application/json',
            data: (ExportManager.exportDiagramStateToJSON(diagramName, this.currentFolderId,
                this.diagramController.nodesMap, this.diagramController.linksMap)),
            success: function (response) {
                if (response === "OK") {
                    menuController.currentFolderId = menuController.user + "root_0";
                    menuController.folderLevel = 0;
                    $('#diagrams').modal('hide');

                    if (menuController.canBeDeleted) {
                        menuController.clearAll();
                    }
                }
                else {
                    menuController.writeWarning(response, '.savingMenu');
                    $('.savingMenu input:text').val('');
                }
            },
            error: function (response, status, error) {
                console.log("error: " + status + " " + error);
            }
        });
    }

    private saveCurrentDiagram(): void {
        var controller = this;
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
                    this.diagramController.nodesMap, this.diagramController.linksMap)),
                success: function (response) {
                    console.log(response);
                    if (controller.canBeDeleted) {
                        controller.clearAll();
                    }
                },
                error: function (response, status, error) {
                    console.log("error: " + status + " " + error);
                }
            });
        }
    }

    private openDiagram(diagramName: string): void {
        var menuController = this;
        this.currentDiagramName = diagramName;
        this.currentDiagramFolderId = this.currentFolderId;
        this.currentFolderId = this.user + "root_0";
        this.folderLevel = 0;
        $.ajax({
            type: 'POST',
            url: 'openDiagram',
            dataType: 'json',
            contentType: 'application/json',
            data: (ExportManager.exportDiagramRequestToJSON(diagramName, this.currentDiagramFolderId)),
            success: function (response) {
                menuController.diagramController.clearScene();
                ImportManager.import(response, menuController.diagramController.graph, menuController.diagramController.nodesMap,
                    menuController.diagramController.linksMap, menuController.diagramController.nodeTypesMap);
            },
            error: function (response, status, error) {
                if (status === "parsererror") {
                    alert("Diagram with this name does not exist");
                }
                console.log("error: " + status + " " + error);
            }
        });
    }

    private createNewDiagram(): void {
        var controller = this;
        $('#confirmNew').modal('show');
    }

    private openFolderWindow(): void {
        this.showFolderMenu();
        this.showFolderTable(this.currentFolderId);
        this.clearSavingMenu();
    }

    private saveDiagramAs(): void {
        this.showFolderMenu();
        this.showFolderTable(this.currentFolderId);
        this.showSavingMenu();
    }

    private showFolderMenu(): void {
        this.clearFolderMenu();
        var menuController = this;
        $('.folderMenu').append("<i id='levelUp'><span class='glyphicon glyphicon-arrow-left'></span></i>");
        $('.folderMenu #levelUp').click(function() {
            menuController.levelUpFolder();
        });

        $('.folderMenu').append("<i id='creatingMenu'><span class='glyphicon glyphicon-plus'></span></i>");
        $('.folderMenu #creatingMenu').click(function() {
            menuController.showCreatingMenu();
        });
    }

    private showCreatingMenu() {
        var menuController = this;
        this.clearFolderMenu();
        $('.folderMenu').append(
            "<input type='text'>" +
            "<i id='creating'><span class='glyphicon glyphicon-ok' aria-hidden='true'></span></i>" +
            "<i id='cancelCreating'><span class='glyphicon glyphicon-remove'></span></i>");

        $('.folderMenu #creating').click(function() {
            menuController.clearWarning('.folderMenu p');
            menuController.createFolder();
        });

        $('.folderMenu #cancelCreating').click(function() {
            menuController.showFolderMenu();
        });
    }

    private showSavingMenu(): void {
        this.clearSavingMenu();
        var menuController = this;

        $('.savingMenu').append("<b>Input diagram name</b><input type:text>");
        $('#diagrams .modal-footer').prepend("<button id='saving' type='button' class='btn btn-success'>Save</button>");

        $('#saving').click(function() {
            menuController.clearWarning('.savingMenu p');
            var name: string = $('.savingMenu input:text').val();
            if (name === "") {
                menuController.writeWarning("Empty name", '.savingMenu');
            }
            else{
                menuController.saveDiagram(name);
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
        $('.folderTable').empty();
    }

    private clearWarning(place : string): void {
        $(place).remove();
    }

    private showFolderTable(openingFolderId: string): void {
        $('.folderTable li').remove();
        this.clearFolderTable();
        this.currentFolderId = openingFolderId;
        var menuController = this;
        $.ajax({
            type: 'POST',
            url: 'getFolderNames',
            dataType: 'json',
            contentType: 'application/json',
            data: (JSON.stringify({name: this.currentFolderId})),
            success: function (response) {
                $.each(response, function (i) {
                    $('.folderView ul').prepend("<li class='folders'><span class='glyphicon glyphicon-folder-open' aria-hidden='true'></span>" +
                        "<span class='glyphicon-class'>" + response[i] + "</span></li>");
                });
                $('.folderTable .folders').click(function () {
                    menuController.folderLevel++;
                    var folderId: string = menuController.user + $(this).text() + "_" + menuController.folderLevel;
                    menuController.showFolderTable(folderId);
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
            data: (JSON.stringify({name: this.currentFolderId})),
            success: function(response) {
                $.each(response, function (i) {
                    $('.folderView ul').append("<li class='diagrams'><span class='glyphicon glyphicon-file' aria-hidden='true'></span>" +
                        "<span class='glyphicon-class'>" + response[i] + "</span></li>");
                });
                $('.folderTable .diagrams').click(function () {
                    menuController.openDiagram($(this).text());
                    $('#diagrams').modal('hide');
                });
            },
            error: function (response, status, error) {
                console.log("error: " + status + " " + error);
            }
        });
    }

    private levelUpFolder(): void {
        var menuController = this;
        if (this.currentFolderId !== this.user + "root_0") {
            this.folderLevel--;
            $.ajax({
                type: 'POST',
                url: 'getParentFolderId',
                dataType: 'text',
                contentType: 'application/json',
                data: (JSON.stringify({name: this.currentFolderId})),
                success: function (response) {
                    menuController.currentFolderId = response;
                    menuController.showFolderTable(menuController.currentFolderId);
                },
                error: function (response, status, error) {
                    console.log("error: " + status + " " + error);
                }
            });
        }
    }

    private createFolder() : void {
        var name: string = $('.folderMenu input:text').val();
        var menuController = this;
        var newFolderLevel: number = this.folderLevel + 1;
        var folderId: string = this.user + name + "_" + newFolderLevel;
        if (name === "") {
            this.writeWarning("Empty name", '.folderMenu');
        }
        else {
            $.ajax({
                type: 'POST',
                url: 'createFolder',
                dataType: 'text',
                contentType: 'application/json',
                data: (ExportManager.exportFolderToJSON(folderId, name, this.currentFolderId)),
                success: function (response) {
                    if (response === "OK") {
                        menuController.showFolderMenu();
                        menuController.showFolderTable(menuController.currentFolderId);
                    }
                    else {
                        menuController.writeWarning(response, '.folderMenu');
                        $('.folderMenu input:text').val('');
                    }
                },
                error: function (response, status, error) {
                    console.log("error: " + status + " " + error);
                }
            });
        }
    }
}

