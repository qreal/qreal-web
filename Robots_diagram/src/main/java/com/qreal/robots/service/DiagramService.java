package com.qreal.robots.service;

import com.qreal.robots.model.diagram.Diagram;
import com.qreal.robots.model.diagram.Folder;

import java.util.List;

/**
 * Created by vladzx on 22.06.15.
 */
public interface DiagramService {

    public String save(Diagram diagram);

    public Diagram openById(Long diagramId);

    public Diagram openByName(String name);

    public List<String> showDiagramsByUserName();

    public boolean exists(String name);

    public String createFolder(Folder folder);

    public List<String> showFoldersByUserName(String currentFolder);

    public String getParentFolder(String currentFolder);

    public String getUserName();

    public List<String> showDiagramNames(String folderId);
}
