package com.qreal.robots.service;

import com.qreal.robots.model.diagram.Diagram;
import com.qreal.robots.model.diagram.Folder;

import java.util.List;

/**
 * Created by vladzx on 22.06.15.
 */
public interface DiagramService {

    public void save(Diagram diagram);

    public Diagram openById(Long diagramId);

    public Diagram openByName(String name);

    public List<String> showDiagramsByUserName();

    public boolean exists(String name);

    public boolean createFolder(String folderName);

    public List<String> showFoldersByUserName();
}
