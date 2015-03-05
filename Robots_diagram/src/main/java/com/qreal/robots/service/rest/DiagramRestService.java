package com.qreal.robots.service.rest;

import com.qreal.robots.dao.DiagramDAO;
import com.qreal.robots.model.diagram.Diagram;
import com.qreal.robots.model.diagram.OpenRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * Created by ageevdenis on 23-2-15.
 */

@RestController
public class DiagramRestService {


    @Autowired
    private DiagramDAO diagramDAO;

    @ResponseBody
    @RequestMapping(value = "/save", method = RequestMethod.POST)
    public String save(@RequestBody Diagram diagram) {
        diagramDAO.save(diagram);
        return "{\"message\":\"OK\"}";
    }

    @ResponseBody
    @RequestMapping(value = "/open", method = RequestMethod.POST)
    public Diagram open(@RequestBody OpenRequest request) {
        return diagramDAO.openById(request.getDiagramId());
    }

}
