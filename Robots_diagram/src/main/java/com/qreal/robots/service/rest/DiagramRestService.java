package com.qreal.robots.service.rest;

import com.qreal.robots.dao.DiagramDAO;
import com.qreal.robots.dao.UserDAO;
import com.qreal.robots.model.diagram.Diagram;
import com.qreal.robots.model.diagram.OpenRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

/**
 * Created by ageevdenis on 23-2-15.
 */

@RestController
public class DiagramRestService {

    @Autowired
    private DiagramDAO diagramDAO;

    @Autowired
    private UserDAO userDAO;

    @ResponseBody
    @RequestMapping(value = "/save", method = RequestMethod.POST)
    public String save(@RequestBody Diagram diagram) {
        String creatorName = SecurityContextHolder.getContext().getAuthentication().getName();
        diagram.setCreator(userDAO.findByUserName(creatorName));
        diagramDAO.save(diagram);
        return "{\"message\":\"OK\"}";
    }

    @ResponseBody
    @RequestMapping(value = "/open", method = RequestMethod.POST)
    public Diagram open(@RequestBody OpenRequest request) {
        return diagramDAO.openByName(request.getName());
    }

}
