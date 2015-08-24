package com.qreal.stepic.robots.controllers;

import com.qreal.stepic.robots.constants.PathConstants;
import com.qreal.stepic.robots.converters.JavaModelConverter;
import com.qreal.stepic.robots.converters.XmlSaveConverter;
import com.qreal.stepic.robots.exceptions.SubmitException;
import com.qreal.stepic.robots.model.diagram.Diagram;
import com.qreal.stepic.robots.model.diagram.OpenResponse;
import com.qreal.stepic.robots.model.diagram.SubmitRequest;
import com.qreal.stepic.robots.model.diagram.SubmitResponse;
import com.qreal.stepic.robots.utils.CheckerUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.multiaction.NoSuchRequestHandlingMethodException;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;

/**
 * Created by vladzx on 25.10.14.
 */
@Controller
@RequestMapping("/online")
public class OnlineSolutionController {

    @RequestMapping(value = "{title}", params = { "name" }, method = RequestMethod.GET)
    public ModelAndView showTask(HttpServletRequest request, @PathVariable String title,
                                 @RequestParam(value = "name") String name)
            throws NoSuchRequestHandlingMethodException {
        if (getPalette(name) == null) {
            throw new NoSuchRequestHandlingMethodException(request);
        }
        ModelAndView modelAndView = new ModelAndView("checker/onlineSolution");
        modelAndView.addObject("title", title);
        modelAndView.addObject("name", name);

        String descriptionPath = PathConstants.tasksPath + "/" + name + "/" + name + ".txt";
        try {
            String description = new String(Files.readAllBytes(Paths.get(descriptionPath)), StandardCharsets.UTF_8);
            modelAndView.addObject("description", description);
        } catch (IOException e) {
            e.printStackTrace();
        }

        return modelAndView;
    }

    @ResponseBody
    @RequestMapping(value = "getPalette/{name}", method = RequestMethod.POST)
    public String getPalette(@PathVariable String name) {
        try {
            return new String(Files.readAllBytes(Paths.get(PathConstants.tasksPath + "/" + name + "/elements.xml")));
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    @ResponseBody
    @RequestMapping(value = "open/{name}", method = RequestMethod.POST)
    public OpenResponse open(@PathVariable String name) {
        XmlSaveConverter converter= new XmlSaveConverter();

        try {
            CheckerUtils.decompressTask(name);
            String fieldXML = CheckerUtils.getWorldModelFromMetainfo(PathConstants.tasksPath + "/" + name + "/"
                    + name + "/metaInfo.xml");
            File treeDirectory = new File(PathConstants.tasksPath + "/" + name + "/" + name + "/tree");
            Diagram diagram = converter.convertToJavaModel(treeDirectory);
            return new OpenResponse(diagram, fieldXML);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    @ResponseBody
    @RequestMapping(value = "submit/{name}", method = RequestMethod.POST)
    public SubmitResponse submit(@RequestBody SubmitRequest request, @PathVariable String name) throws SubmitException {
        JavaModelConverter javaModelConverter = new JavaModelConverter();
        String uuidStr = String.valueOf(javaModelConverter.convertToXmlSave(request.getDiagram(), name));

        try {
            CheckerUtils.compress(name, PathConstants.tasksPath + "/" + name + "/solutions/" + uuidStr);
        } catch (Exception e) {
            throw new SubmitException("An error occurred. Please contact the developers");
        }

        return CheckerUtils.submit(name, name + ".qrs", uuidStr);
    }
}
