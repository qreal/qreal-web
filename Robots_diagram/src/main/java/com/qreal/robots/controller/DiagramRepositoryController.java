package com.qreal.robots.controller;

import com.qreal.robots.model.diagram.Diagram;
import com.qreal.robots.model.diagram.Folder;
import com.qreal.robots.model.diagram.OpenRequest;
import com.qreal.robots.service.DiagramService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
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
        return diagramService.save(diagram);
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
    public boolean exists(@RequestBody OpenRequest request) { return diagramService.exists(request.getName()); }

    @ResponseBody
    @RequestMapping(value = "/createFolder", method = RequestMethod.POST)
    public String createFolder(@RequestBody Folder folder) {
        return diagramService.createFolder(folder);
    }

    @ResponseBody
    @RequestMapping(value = "/showFolders", method = RequestMethod.POST)
    public List<String> showFolders(@RequestBody OpenRequest request) {
        return diagramService.showFoldersByUserName(request.getName());
    }

    @ResponseBody
    @RequestMapping(value = "/getParentFolder", method = RequestMethod.POST)
    public String getParentFolder(@RequestBody OpenRequest request) {
        return diagramService.getParentFolder(request.getName());
    }

    @ResponseBody
    @RequestMapping(value = "/getUser", method = RequestMethod.POST)
    public String getUserName() { return diagramService.getUserName(); }

    @ResponseBody
    @RequestMapping(value = "/showDiagramNames", method = RequestMethod.POST)
    public List<String> showDiagramNames(@RequestBody OpenRequest request) {
        return diagramService.showDiagramNames(request.getName());
    }
}
