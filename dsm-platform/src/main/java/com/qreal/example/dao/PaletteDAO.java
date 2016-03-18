package com.qreal.example.dao;

import com.qreal.example.model.Palette;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 * Created by LChernigovskaya on 18.03.2016.
 */
@Repository
public class PaletteDAO {
    @Autowired
    private SessionFactory sessionFactory;

    public void createPalette(Palette palette) {
        Session session = sessionFactory.getCurrentSession();
        session.save(palette);
    }
}
