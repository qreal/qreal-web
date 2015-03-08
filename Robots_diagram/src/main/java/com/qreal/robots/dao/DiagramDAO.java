package com.qreal.robots.dao;

import com.qreal.robots.model.auth.User;
import com.qreal.robots.model.diagram.Diagram;
import org.apache.log4j.Logger;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Created by vladzx on 07.11.14.
 */
@Repository
public class DiagramDAO {
    private static final Logger LOG = Logger.getLogger(DiagramDAO.class);

    @Autowired
    private SessionFactory sessionFactory;

    public DiagramDAO() {
    }

    public DiagramDAO(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }

    @Transactional
    public void save(Diagram diagram) {
        LOG.debug("saving diagram");
        Session session = sessionFactory.openSession();
        Transaction transaction = null;
        try {
            transaction = session.beginTransaction();
            session.save(diagram);
            transaction.commit();
        } catch (Exception e) {
            transaction.rollback();
            e.printStackTrace();
        } finally {
            session.close();
        }
    }

    @Transactional
    public Diagram openById(Long diagramId) {
        LOG.debug("open diagram");
        Session session = sessionFactory.openSession();
        Transaction transaction = null;
        Diagram diagram = null;
        try {
            transaction = session.beginTransaction();
            diagram = (Diagram) session.get(Diagram.class, diagramId);
            transaction.commit();
        } catch (Exception e) {
            transaction.rollback();
            e.printStackTrace();
        } finally {
            session.close();
            return diagram;
        }
    }


    public User findByName(String name) {

        Session session = sessionFactory.getCurrentSession();
        List<User> diagrams = session.createQuery("from Diagram where name=?").setParameter(0, name).list();
        if (diagrams.size() > 0) {
            return diagrams.get(0);
        } else {
            return null;
        }
    }
}
