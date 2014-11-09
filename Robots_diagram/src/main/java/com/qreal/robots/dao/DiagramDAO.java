package com.qreal.robots.dao;

import com.qreal.robots.model.Diagram;
import org.apache.log4j.Logger;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

/**
 * Created by vladzx on 07.11.14.
 */
@Repository
public class DiagramDAO {
    private static final Logger log = Logger.getLogger(DiagramDAO.class);

    @Autowired
    private SessionFactory sessionFactory;

    @Transactional
    public void save(Diagram diagram) {
        log.debug("saving diagram");
        Session session = sessionFactory.getCurrentSession();
        Transaction transaction = session.beginTransaction();
        session.save(diagram);
        transaction.commit();
    }
}
