package com.qreal.robots.service;

import com.qreal.robots.dao.DiagramDAO;
import com.qreal.robots.model.auth.User;
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
    public boolean saveDiagram(Diagram diagram) {
        diagram.setFolderId(addUserToId(diagram.getFolderId()));
        return diagramDAO.save(diagram);
    }

    @Transactional
    @Override
    public Diagram openDiagram(DiagramRequest request) {
        request.setFolderId(addUserToId(request.getFolderId()));
        return diagramDAO.openDiagram(request);
    }

    @Transactional
    @Override
    public String rewriteDiagram(Diagram diagram) {
        diagram.setFolderId(addUserToId(diagram.getFolderId()));
        return diagramDAO.rewriteDiagram(diagram);
    }

    @Transactional
    @Override
    public boolean createFolder(Folder folder) {
        String creatorName = SecurityContextHolder.getContext().getAuthentication().getName();
        folder.setCreator(userService.findByUserName(creatorName));
        folder.setFolderId(addUserToId(folder.getFolderId()));
        folder.setFolderParentId(addUserToId(folder.getFolderParentId()));

        return diagramDAO.createFolder(folder);
    }

    @Transactional
    @Override
    public boolean createRootFolder(User user) {
        Folder rootFolder = new Folder(user.getUsername() + "root_0", "root", "", user);
        return diagramDAO.createFolder(rootFolder);
    }

    @Transactional
    @Override
    public List<String> getFolderNames(String currentFolderId) {
        currentFolderId = addUserToId(currentFolderId);
        return diagramDAO.getFolderNames(currentFolderId);
    }

    @Transactional
    @Override
    public List<String> getDiagramNames(String folderId) {
        folderId = addUserToId(folderId);
        return diagramDAO.getDiagramNames(folderId);
    }

    private String addUserToId(String folderId) {
        String creatorName = SecurityContextHolder.getContext().getAuthentication().getName();
        return creatorName + folderId;
    }
}