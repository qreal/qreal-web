package com.qreal.robots.dao;

import com.qreal.robots.model.auth.User;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by dageev on 04.03.15.
 */
@Repository
public class UserDao {

    @Autowired
    private SessionFactory sessionFactory;

    public UserDao() {

    }

    public UserDao(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }


    public void save(User user) {
        Session session = sessionFactory.getCurrentSession();
        session.save(user);
    }

    public User findByUserName(String username) {

        Session session = sessionFactory.getCurrentSession();

        List<User> users = session.createQuery("from User where username=?").setParameter(0, username).list();
        if (users.size() > 0) {
            return users.get(0);
        } else {
            return null;
        }


    }


}