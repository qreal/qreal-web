package com.qreal.robots.service;

import com.qreal.robots.dao.DiagramDAO;
import com.qreal.robots.model.diagram.Diagram;
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
    public String save(Diagram diagram) { return diagramDAO.save(diagram); }

    @Transactional
    @Override
    public Diagram openById(Long diagramId) {
        return diagramDAO.openById(diagramId);
    }

    @Transactional
    @Override
    public Diagram openByName(String name) {
        return diagramDAO.openByName(name);
    }

    @Transactional
    @Override
    public List<String> showDiagramsByUserName() {
        String creatorName = SecurityContextHolder.getContext().getAuthentication().getName();
        return diagramDAO.showDiagramsByUserName(creatorName);
    }

    @Transactional
    @Override
    public boolean exists(String name) {
        return diagramDAO.exists(name);
    }

    @Transactional
    @Override
    public String createFolder(Folder folder) {
        String creatorName = SecurityContextHolder.getContext().getAuthentication().getName();
        folder.setCreator(userService.findByUserName(creatorName));
        return diagramDAO.createFolder(folder);
    }

    @Transactional
    @Override
    public List<String> showFoldersByUserName(String currentFolder) {
        String creatorName = SecurityContextHolder.getContext().getAuthentication().getName();
        return diagramDAO.showFoldersByUserName(creatorName, currentFolder);
    }

    @Transactional
    @Override
    public String getParentFolder(String currentFolder) {
        String creatorName = SecurityContextHolder.getContext().getAuthentication().getName();
        return diagramDAO.getParentFolder(creatorName, currentFolder);
    }

    @Transactional
    @Override
    public String getUserName() { return SecurityContextHolder.getContext().getAuthentication().getName(); }

    @Transactional
    @Override
    public List<String> showDiagramNames(String folderId) { return diagramDAO.showDiagramNames(folderId); }
}
