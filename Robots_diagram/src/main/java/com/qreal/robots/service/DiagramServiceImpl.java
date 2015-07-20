package com.qreal.robots.service;

import com.qreal.robots.dao.DiagramDAO;
import com.qreal.robots.model.diagram.Diagram;
import com.qreal.robots.model.diagram.DiagramRequest;
import com.qreal.robots.model.diagram.Folder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Created by vladzx on 22.06.15.
 */
@Service
public class DiagramServiceImpl implements DiagramService {

    @Autowired
    private DiagramDAO diagramDAO;

    @Autowired
    private UserService userService;

    @Transactional
    @Override
    public String saveDiagram(Diagram diagram) { return diagramDAO.save(diagram); }

    @Transactional
    @Override
    public Diagram openDiagram(DiagramRequest request) {
        return diagramDAO.openDiagram(request);
    }

    @Transactional
    @Override
    public String rewriteDiagram(Diagram diagram) { return diagramDAO.rewriteDiagram(diagram); }

    @Transactional
    @Override
    public String createFolder(Folder folder) {
        String creatorName = SecurityContextHolder.getContext().getAuthentication().getName();
        folder.setCreator(userService.findByUserName(creatorName));
        return diagramDAO.createFolder(folder);
    }

    @Transactional
    @Override
    public List<String> getFolderNames(String currentFolderId) {
        return diagramDAO.getFolderNames(currentFolderId);
    }

    @Transactional
    @Override
    public String getParentFolder(String currentFolderId) {
        return diagramDAO.getParentFolder(currentFolderId);
    }

    @Transactional
    @Override
    public String getUserName() { return SecurityContextHolder.getContext().getAuthentication().getName(); }

    @Transactional
    @Override
    public List<String> getDiagramNames(String folderId) { return diagramDAO.getDiagramNames(folderId); }
}
