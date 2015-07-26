package com.qreal.robots.controller;

import com.qreal.robots.model.diagram.Diagram;
import com.qreal.robots.model.diagram.DiagramRequest;
import com.qreal.robots.model.diagram.Folder;
import com.qreal.robots.model.diagram.OpenRequest;
import com.qreal.robots.service.DiagramService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by vladzx on 22.06.15.
 */
@Controller
public class DiagramRepositoryController {

    @Autowired
    private DiagramService diagramService;

    @ExceptionHandler(DiagramMenuException.class)
    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
    @ResponseBody
    public String handleMenuException(DiagramMenuException exception) {
        return exception.getExceptionMessage();
    }

    @ResponseBody
    @RequestMapping(value = "/saveDiagram", method = RequestMethod.POST)
    public String saveDiagram(@RequestBody Diagram diagram) throws DiagramMenuException {
        if (!diagramService.saveDiagram(diagram)) {
            throw new DiagramMenuException("This diagram already exists");
        }
        return "OK";
    }

    @ResponseBody
    @RequestMapping(value = "/openDiagram", method = RequestMethod.POST)
    public Diagram openDiagram(@RequestBody DiagramRequest request) {
        return diagramService.openDiagram(request);
    }

    @ResponseBody
    @RequestMapping(value = "/getDiagramNames", method = RequestMethod.POST)
    public List<String> getDiagramNames(@RequestBody OpenRequest request) {
        return diagramService.getDiagramNames(request.getName());
    }

    @ResponseBody
    @RequestMapping(value = "/rewriteDiagram", method = RequestMethod.POST)
    public String rewriteDiagram(@RequestBody Diagram diagram) {
        return diagramService.rewriteDiagram(diagram);
    }

    @ResponseBody
    @RequestMapping(value = "/createFolder", method = RequestMethod.POST)
    public String createFolder(@RequestBody Folder folder) {
        if (!diagramService.createFolder(folder)) {
            throw new DiagramMenuException("This folder already exists");
        }
        return "OK";
    }

    @ResponseBody
    @RequestMapping(value = "/getFolderNames", method = RequestMethod.POST)
    public List<String> getFolderNames(@RequestBody OpenRequest request) {
        return diagramService.getFolderNames(request.getName());
    }
}