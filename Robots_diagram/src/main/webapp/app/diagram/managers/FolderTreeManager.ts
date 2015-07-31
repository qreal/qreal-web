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
}