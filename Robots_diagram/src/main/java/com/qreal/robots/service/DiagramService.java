package com.qreal.robots.service;

import com.qreal.robots.model.diagram.Diagram;

import java.util.List;

/**
 * Created by vladzx on 22.06.15.
 */
public interface DiagramService {

    public void save(Diagram diagram);

    public Diagram openById(Long diagramId);

    public Diagram openByName(String name);

    public List<String> showDiagramsByUserName();
}
