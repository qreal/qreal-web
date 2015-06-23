package com.qreal.robots.service;

import com.qreal.robots.dao.DiagramDAO;
import com.qreal.robots.model.diagram.Diagram;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
    public void save(Diagram diagram) {
        String creatorName = SecurityContextHolder.getContext().getAuthentication().getName();
        diagram.setCreator(userService.findByUserName(creatorName));
        diagramDAO.save(diagram);
    }

    @Transactional
    @Override
    public Diagram openById(Long diagramId) {
        return diagramDAO.openById(diagramId);
    }

    @Transactional
    @Override
    public Diagram openByName(String name) {
        return diagramDAO.openByName(name);
    }
}
