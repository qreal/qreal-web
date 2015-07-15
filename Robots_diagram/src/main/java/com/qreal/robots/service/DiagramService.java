package com.qreal.robots.service;

import com.qreal.robots.model.diagram.Diagram;
import com.qreal.robots.model.diagram.DiagramRequest;
import com.qreal.robots.model.diagram.Folder;

import java.util.List;

/**
 * Created by vladzx on 22.06.15.
 */
public interface DiagramService {

    public String saveDiagram(Diagram diagram);

    public Diagram openDiagram(DiagramRequest request);

    public String createFolder(Folder folder);

    public List<String> showFoldersByUserName(String currentFolder);

    public String getParentFolder(String currentFolder);

    public String getUserName();

    public List<String> showDiagramNames(String folderId);
}
