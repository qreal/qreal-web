package com.qreal.robots.dao;

import com.qreal.robots.model.diagram.Diagram;
import com.qreal.robots.model.diagram.Folder;

import java.util.List;

/**
 * Created by vladzx on 22.06.15.
 */
public interface DiagramDAO {

    public void save(Diagram diagram);

    public Diagram openById(Long diagramId);

    public Diagram openByName(String name);

    public List<String> showDiagramsByUserName(String userName);

    public boolean exists(String name);

    public String createFolder(Folder folder);

    public List<String> showFoldersByUserName(String userName, String currentFolder);

    public String getParentFolder(String userName, String currentFolder);
}
