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

    public boolean save(Diagram diagram) {
        LOG.debug("saving diagram");
        Session session = sessionFactory.getCurrentSession();
        List<Diagram> diagrams = session.createQuery("from Diagram where folderId=:folderId and name=:name")
                .setParameter("folderId", diagram.getFolderId())
                .setParameter("name", diagram.getName())
                .list();

        if (diagrams.isEmpty()) {
            session.save(diagram);
            return true;
        }
        return false;
    }

    public Diagram openDiagram(DiagramRequest request) {
        Session session = sessionFactory.getCurrentSession();
        List<Diagram> diagrams = session.createQuery("from Diagram where name=:name and folderId=:folderId")
                .setParameter("name", request.getDiagramName())
                .setParameter("folderId", request.getFolderId())
                .list();

        return diagrams.get(0);
    }

    public void rewriteDiagram(Diagram diagram) {
        Session session = sessionFactory.getCurrentSession();
        List<Diagram> diagrams = session.createQuery("from Diagram where folderId=:folderId and name=:name")
                .setParameter("folderId", diagram.getFolderId())
                .setParameter("name", diagram.getName())
                .list();

        session.delete(diagrams.get(0));
        session.save(diagram);
    }

    public boolean createFolder(Folder folder) {
        LOG.debug("creating folder");
        Session session = sessionFactory.getCurrentSession();
        List<Folder> folders = session.createQuery("from Folder where folderId=:folderId")
                .setParameter("folderId", folder.getFolderId())
                .list();

        if (folders.isEmpty()) {
            session.save(folder);
            return true;
        }
        return false;
    }

    public List<String> getFolderNames(String folderId) {
        Session session = sessionFactory.getCurrentSession();
        List<Folder> folders = session.createQuery("from Folder where folderParentId=:folderParentId")
                .setParameter("folderParentId", folderId)
                .list();

        List<String> folderNames = new ArrayList<String>();
        for (Folder folder : folders) {
            folderNames.add(folder.getFolderName());
        }
        return folderNames;
    }

    public List<String> getDiagramNames(String folderId) {
        Session session = sessionFactory.getCurrentSession();
        List<Diagram> diagrams = session.createQuery("from Diagram where folderId=:folderId")
                .setParameter("folderId", folderId).list();

        List<String> diagramNames = new ArrayList<String>();
        for (Diagram diagram : diagrams) {
            diagramNames.add(diagram.getName());
        }
        return diagramNames;
    }
}
