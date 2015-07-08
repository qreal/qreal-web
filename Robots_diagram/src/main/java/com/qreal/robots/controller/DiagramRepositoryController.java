package com.qreal.robots.controller;

import com.qreal.robots.model.diagram.Diagram;
import com.qreal.robots.model.diagram.OpenRequest;
import com.qreal.robots.service.DiagramService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

/**
 * Created by vladzx on 22.06.15.
 */
@Controller
public class DiagramRepositoryController {

    @Autowired
    private DiagramService diagramService;

    @ResponseBody
    @RequestMapping(value = "/save", method = RequestMethod.POST)
    public String save(@RequestBody Diagram diagram) {
        diagramService.save(diagram);
        return "{\"message\":\"OK\"}";
    }

    @ResponseBody
    @RequestMapping(value = "/open", method = RequestMethod.POST)
    public Diagram open(@RequestBody OpenRequest request) {
        return diagramService.openByName(request.getName());
    }

    @ResponseBody
    @RequestMapping(value = "/show", method = RequestMethod.POST)
    public List<String> showByUserName() { return diagramService.showDiagramsByUserName(); }

    @ResponseBody
    @RequestMapping(value = "/exists", method = RequestMethod.POST)
    public boolean exists(@RequestBody OpenRequest request) {
        return diagramService.exists(request.getName());
    }
}
