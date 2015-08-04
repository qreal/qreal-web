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
    public Long saveDiagram(DiagramRequest diagramRequest) {
        return diagramDAO.saveDiagram(diagramRequest);
    }

    @Transactional
    @Override
    public Diagram openDiagram(Long diagramId) {
        return diagramDAO.openDiagram(diagramId);
    }

    @Transactional
    @Override
    public void rewriteDiagram(Diagram diagram) {
        diagramDAO.rewriteDiagram(diagram);
    }

    @Transactional
    @Override
    public Long createFolder(Folder folder) {
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
        System.out.print("(");
        for (int i = 0; i < folder.getDiagrams().size(); i++) {
            System.out.print(folder.getDiagrams().get(i).getName());
        }
        System.out.print(")");
        System.out.print(folder.getFolderName());
        System.out.print(" ");
        int size = folder.getChildrenFolders().size();
        if (size == 0) {
            return;
        }
        System.out.print("(");
        for (int i = 0; i < size; i++) {
            printTree(folder.getChildrenFolders().get(i));
        }
        System.out.print(")");
    }
}