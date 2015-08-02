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
    public Long saveDiagram(@RequestBody Diagram diagram) throws DiagramMenuException {
        return diagramService.saveDiagram(diagram);
    }

    @ResponseBody
    @RequestMapping(value = "/openDiagram", method = RequestMethod.POST)
    public Diagram openDiagram(@RequestBody DiagramRequest request) {
        return diagramService.openDiagram(request);
    }

    @ResponseBody
    @RequestMapping(value = "/rewriteDiagram", method = RequestMethod.POST)
    public String rewriteDiagram(@RequestBody Diagram diagram) {
        diagramService.rewriteDiagram(diagram);
        return "{\"responseText\":\"OK\"}";
    }

    @ResponseBody
    @RequestMapping(value = "/createFolder", method = RequestMethod.POST)
    public Long createFolder(@RequestBody Folder folder) {
        return diagramService.createFolder(folder);
    }

    @ResponseBody
    @RequestMapping(value = "/getFolderTree", method = RequestMethod.GET)
    public Folder getFolderTree() {
        return diagramService.getFolderTree();
    }
}