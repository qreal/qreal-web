package com.qreal.stepic.robots.controllers;

import com.qreal.stepic.robots.constants.PathConstants;
import com.qreal.stepic.robots.converters.JavaModelConverter;
import com.qreal.stepic.robots.converters.XmlSaveConverter;
import com.qreal.stepic.robots.exceptions.NotExistsException;
import com.qreal.stepic.robots.exceptions.SubmitException;
import com.qreal.stepic.robots.model.diagram.Diagram;
import com.qreal.stepic.robots.model.diagram.OpenResponse;
import com.qreal.stepic.robots.model.diagram.SubmitRequest;
import com.qreal.stepic.robots.model.diagram.SubmitResponse;
import com.qreal.stepic.robots.utils.CheckerUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

/**
 * Created by vladzx on 25.10.14.
 */
@Controller
public class DiagramController {

    @RequestMapping(value = "", method = RequestMethod.GET)
    public ModelAndView index() {
        return new ModelAndView("index");
    }

    @RequestMapping(value = "{taskId}", method = RequestMethod.GET)
    public ModelAndView showTask(@PathVariable String taskId) {
        ModelAndView modelAndView = new ModelAndView("index");
        modelAndView.addObject("taskId", taskId);
        return modelAndView;
    }

    @ResponseBody
    @RequestMapping(value = "/getPalette/{taskId}", method = RequestMethod.POST)
    public String getPalette(@PathVariable String taskId) {
        try {
            return new String(Files.readAllBytes(Paths.get(PathConstants.tasksPath + "/" + taskId + "/elements.xml")));
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    @ResponseBody
    @RequestMapping(value = "/open/{taskId}", method = RequestMethod.POST)
    public OpenResponse open(@PathVariable String taskId) {
        XmlSaveConverter converter= new XmlSaveConverter();

        try {
            CheckerUtils.decompressTask(taskId);
            String fieldXML = CheckerUtils.getWorldModelFromMetainfo(PathConstants.tasksPath + "/" + taskId + "/"
                    + taskId + "/metaInfo.xml");
            File treeDirectory = new File(PathConstants.tasksPath + "/" + taskId + "/" + taskId + "/tree");
            Diagram diagram = converter.convertToJavaModel(treeDirectory);
            return new OpenResponse(diagram, fieldXML);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    @ResponseBody
    @RequestMapping(value = "/submit/{taskId}", method = RequestMethod.POST)
    public SubmitResponse submit(@RequestBody SubmitRequest request, @PathVariable String taskId) throws SubmitException {
        JavaModelConverter javaModelConverter = new JavaModelConverter();
        String uuidStr = String.valueOf(javaModelConverter.convertToXmlSave(request.getDiagram(), taskId));

        try {
            CheckerUtils.compress(taskId, PathConstants.tasksPath + "/" + taskId + "/solutions/" + uuidStr);
        } catch (Exception e) {
            throw new SubmitException("An error occurred. Please contact the developers");
        }

        return CheckerUtils.submit(taskId, taskId + ".qrs", uuidStr);
    }
}
