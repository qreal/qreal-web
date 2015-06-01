package com.qreal.stepic.robots.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.qreal.stepic.robots.converters.JavaModelConverter;
import com.qreal.stepic.robots.converters.XmlSaveConverter;
import com.qreal.stepic.robots.model.diagram.SubmitRequest;
import com.qreal.stepic.robots.model.diagram.Diagram;
import com.qreal.stepic.robots.model.diagram.OpenRequest;
import com.qreal.stepic.robots.model.two_d.Trace;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.io.File;
import java.io.IOException;

/**
 * Created by vladzx on 25.10.14.
 */
@Controller
public class DiagramController {

    @RequestMapping(value = "", method = RequestMethod.GET)
    public ModelAndView index() {
        return new ModelAndView("index");
    }

    @Autowired
    private ResourceLoader resourceLoader;

    @RequestMapping(value = "{taskId}", method = RequestMethod.GET)
    public ModelAndView showTask(@PathVariable String taskId, Model model) {
        model.addAttribute("taskId", taskId);
        return new ModelAndView("index");
    }

    @ResponseBody
    @RequestMapping(value = "/open", method = RequestMethod.POST)
    public Diagram open(@RequestBody OpenRequest request) {
        Resource resource = resourceLoader.getResource("tasks/" + request.getId());
        XmlSaveConverter converter= new XmlSaveConverter();

        try {
            File folder = resource.getFile();
            String folderPath = folder.getPath();
            File diagramDirectory = new File(folderPath + "/diagram");

            if (!diagramDirectory.exists()) {
                ProcessBuilder processBuilder = new ProcessBuilder("compressor", "diagram.qrs");
                processBuilder.directory(folder);
                processBuilder.start().waitFor();
                diagramDirectory = new File(folderPath + "/diagram");
            }

            File treeDirectory = new File(diagramDirectory.getPath() + "/tree");
            Diagram diagram = converter.convertToJavaModel(treeDirectory);
            return diagram;
        } catch (IOException e) {
            e.printStackTrace();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        return null;
    }

    @ResponseBody
    @RequestMapping(value = "/submit", method = RequestMethod.POST)
    public Trace submit(@RequestBody SubmitRequest request) {
        final String taskId = request.getId();
        JavaModelConverter javaModelConverter = new JavaModelConverter();
        javaModelConverter.convertToXmlSave(request.getDiagram(), resourceLoader, taskId);

        try {
            Resource resource = resourceLoader.getResource("tasks/" + request.getId());
            File folder = resource.getFile();
            ProcessBuilder processBuilder = new ProcessBuilder("compressor", "test");
            processBuilder.directory(folder);
            processBuilder.start().waitFor();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        ObjectMapper mapper = new ObjectMapper();
        Resource resource = resourceLoader.getResource("tasks/" + taskId + "/trace.json");
        try {
            return mapper.readValue(resource.getFile(), Trace.class);
        } catch (IOException e) {
            e.printStackTrace();
        }

        return null;
    }
}
