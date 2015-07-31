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

    @Transactional
    @Override
    public boolean saveDiagram(Diagram diagram) {
        return diagramDAO.save(diagram);
    }

    @Transactional
    @Override
    public Diagram openDiagram(DiagramRequest request) {
        return diagramDAO.openDiagram(request);
    }

    @Transactional
    @Override
    public void rewriteDiagram(Diagram diagram) {
        diagramDAO.rewriteDiagram(diagram);
    }

    @Transactional
    @Override
    public boolean createFolder(Folder folder) {
        String userName = SecurityContextHolder.getContext().getAuthentication().getName();
        folder.setUserName(userName);

        return diagramDAO.createFolder(folder);
    }

    @Transactional
    @Override
    public Folder getFolderTree() {
        String userName = SecurityContextHolder.getContext().getAuthentication().getName();
        Folder root = diagramDAO.getFolderTree(userName);
        printTree(root);
        return root;
    }

    private void printTree(Folder folder) {
        System.out.print(folder.getFolderName());
        if (folder.getChildrenFolders().size() == 0) {
            return;
        }
        System.out.print("(");
        printTree(folder.getChildrenFolders().get(0));
        System.out.print(" ");
        printTree(folder.getChildrenFolders().get(1));
        System.out.print(")");
    }
}