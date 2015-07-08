package com.qreal.robots.dao;

import com.qreal.robots.model.diagram.Diagram;
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

    public void save(Diagram diagram) {
        LOG.debug("saving diagram");
        Session session = sessionFactory.getCurrentSession();
        session.save(diagram);
    }

    public Diagram openById(Long diagramId) {
        Session session = sessionFactory.getCurrentSession();
        return (Diagram) session.get(Diagram.class, diagramId);
    }

    public Diagram openByName(String name) {
        LOG.debug("open diagram");
        Session session = sessionFactory.getCurrentSession();
        List<Diagram> diagrams = session.createQuery("from Diagram where name=?").setParameter(0, name).list();
        return (diagrams.isEmpty() ? null : diagrams.get(0));
    }

    public List<String> showDiagramsByUserName(String userName) {
        Session session = sessionFactory.getCurrentSession();
        List<Diagram> diagrams = session.createQuery("from Diagram where username=?").setParameter(0, userName).list();

        List<String> namesDiagrams = new ArrayList<String>();
        for (Diagram diagram : diagrams) {
            namesDiagrams.add(diagram.getName());
        }
        return namesDiagrams;
    }

    public boolean exists(String name) {
        Session session = sessionFactory.getCurrentSession();
        List<Diagram> diagrams = session.createQuery("from Diagram where name=?").setParameter(0, name).list();
        return (!diagrams.isEmpty());
    }
}
