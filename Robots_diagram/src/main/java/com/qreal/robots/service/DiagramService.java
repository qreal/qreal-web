package com.qreal.robots.service;

import com.qreal.robots.model.auth.User;
import com.qreal.robots.model.diagram.Diagram;
import com.qreal.robots.model.diagram.DiagramRequest;
import com.qreal.robots.model.diagram.Folder;

import java.util.List;

/**
 * Created by vladzx on 22.06.15.
 */
public interface DiagramService {

    public Long saveDiagram(DiagramRequest diagramRequest);

    public Diagram openDiagram(Long diagramId);

    public void rewriteDiagram(Diagram diagram);

    public Long createFolder(Folder folder);

    public Folder getFolderTree();
}
