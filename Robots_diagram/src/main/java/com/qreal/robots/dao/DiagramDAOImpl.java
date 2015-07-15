package com.qreal.robots.dao;

import com.qreal.robots.model.diagram.Diagram;
import com.qreal.robots.model.diagram.DiagramRequest;
import com.qreal.robots.model.diagram.Folder;
import org.apache.log4j.Logger;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.ArrayList;

/**
 * Created by vladzx on 07.11.14.
 */
@Repository
public class DiagramDAOImpl implements DiagramDAO {
    private static final Logger LOG = Logger.getLogger(DiagramDAOImpl.class);

    @Autowired
    private SessionFactory sessionFactory;

    public DiagramDAOImpl() {
    }

    public DiagramDAOImpl(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }

    public String save(Diagram diagram) {
        LOG.debug("saving diagram");
        Session session = sessionFactory.getCurrentSession();
        List<Diagram> diagrams = session.createQuery("from Diagram where folderId=? and name=?")
                .setParameter(0, diagram.getFolderId())
                .setParameter(1, diagram.getName())
                .list();

        if (!diagrams.isEmpty()) {
            return "This diagram already exists.";
        }
        else {
            session.save(diagram);
            return "OK";
        }
    }

    public Diagram openDiagram(DiagramRequest request) {
        Session session = sessionFactory.getCurrentSession();
        List<Diagram> diagrams = session.createQuery("from Diagram where name=? and folderId=?")
                .setParameter(0, request.getDiagramName())
                .setParameter(1, request.getFolderId())
                .list();

        return diagrams.get(0);
    }

    public String rewriteDiagram(Diagram diagram) {
        Session session = sessionFactory.getCurrentSession();
        List<Diagram> diagrams = session.createQuery("from Diagram where folderId=? and name=?")
                .setParameter(0, diagram.getFolderId())
                .setParameter(1, diagram.getName())
                .list();

        session.delete(diagrams.get(0));
        session.save(diagram);
        return("OK");
    }

    public String createFolder(Folder folder) {
        LOG.debug("creating folder");
        Session session = sessionFactory.getCurrentSession();
        List<Folder> folders = session.createQuery("from Folder where folderId=? and folderParentId=? and folderName=?")
                .setParameter(0, folder.getFolderId())
                .setParameter(1, folder.getFolderParentId())
                .setParameter(2, folder.getFolderName())
                .list();

        if (folders.isEmpty()) {
            session.save(folder);
            return "OK";
        }
        else {
            return "This folder already exists.";
        }
    }

    public List<String> showFoldersByUserName(String currentFolderId) {
        Session session = sessionFactory.getCurrentSession();
        List<Folder> folders = session.createQuery("from Folder where folderParentId=?")
                .setParameter(0, currentFolderId)
                .list();

        List<String> folderNames = new ArrayList<String>();
        for (Folder folder : folders) {
            folderNames.add(folder.getFolderName());
        }
        return folderNames;
    }

    public String getParentFolder(String currentFolderId) {
        Session session = sessionFactory.getCurrentSession();
        List<Folder> folders = session.createQuery("from Folder where folderId=?")
                .setParameter(0, currentFolderId)
                .list();

        return folders.get(0).getFolderParentId();
    }

    public List<String> showDiagramNames(String folderId) {
        Session session = sessionFactory.getCurrentSession();
        List<Diagram> diagrams = session.createQuery("from Diagram where folderId=?").setParameter(0, folderId).list();

        List<String> namesDiagrams = new ArrayList<String>();
        for (Diagram diagram : diagrams) {
            namesDiagrams.add(diagram.getName());
        }
        return namesDiagrams;
    }
}
