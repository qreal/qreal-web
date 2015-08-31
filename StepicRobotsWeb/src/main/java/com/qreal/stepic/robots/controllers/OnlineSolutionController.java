package com.qreal.stepic.robots.controllers;

import com.qreal.stepic.robots.checker.Checker;
import com.qreal.stepic.robots.constants.PathConstants;
import com.qreal.stepic.robots.converters.JavaModelConverter;
import com.qreal.stepic.robots.converters.XmlSaveConverter;
import com.qreal.stepic.robots.exceptions.SubmitException;
import com.qreal.stepic.robots.model.diagram.Diagram;
import com.qreal.stepic.robots.model.diagram.OpenResponse;
import com.qreal.stepic.robots.model.diagram.SubmitRequest;
import com.qreal.stepic.robots.model.diagram.SubmitResponse;
import com.qreal.stepic.robots.checker.CheckerUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
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
import java.util.Locale;

/**
 * Created by vladzx on 25.10.14.
 */
@Controller
@RequestMapping("/online")
public class OnlineSolutionController {

    @Autowired
    MessageSource messageSource;

    @RequestMapping(value = "{title}", params = { "name" }, method = RequestMethod.GET)
    public ModelAndView showTask(HttpServletRequest request, @PathVariable String title,
                                 @RequestParam(value = "name") String name, Locale locale)
            throws NoSuchRequestHandlingMethodException {
        if (getPalette(name, locale) == null) {
            throw new NoSuchRequestHandlingMethodException(request);
        }
        ModelAndView modelAndView = new ModelAndView("checker/onlineSolution");
        modelAndView.addObject("title", title);
        modelAndView.addObject("name", name);

        String descriptionPath = PathConstants.TASKS_PATH + "/" + name + "/" + name + ".txt";
        try {
            String description = new String(Files.readAllBytes(Paths.get(descriptionPath)), StandardCharsets.UTF_8);
            modelAndView.addObject("description", description);
        } catch (IOException e) {
            e.printStackTrace();
        }

        return modelAndView;
    }

    @ResponseBody
    @RequestMapping(value = "getPalette/{name}", method = RequestMethod.POST, produces = "text/plain;charset=UTF-8")
    public String getPalette(@PathVariable String name, Locale locale) {
        try {
            if (locale.equals(new Locale("en", ""))) {
                return new String(Files.readAllBytes(Paths.get(PathConstants.TASKS_PATH + "/" + name + "/elements_en.xml")),
                        StandardCharsets.UTF_8);
            }

            return new String(Files.readAllBytes(Paths.get(PathConstants.TASKS_PATH + "/" + name + "/elements_ru.xml")),
                    StandardCharsets.UTF_8);
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
            String fieldXML = CheckerUtils.getWorldModelFromMetainfo(PathConstants.TASKS_PATH + "/" + name + "/"
                    + name + "/metaInfo.xml");
            File treeDirectory = new File(PathConstants.TASKS_PATH + "/" + name + "/" + name + "/tree");
            Diagram diagram = converter.convertToJavaModel(treeDirectory);
            return new OpenResponse(diagram, fieldXML);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    @ResponseBody
    @RequestMapping(value = "submit/{name}", method = RequestMethod.POST)
    public SubmitResponse submit(@RequestBody SubmitRequest request, @PathVariable String name,
                                 Locale locale) throws SubmitException {
        JavaModelConverter javaModelConverter = new JavaModelConverter();
        String uuidStr = String.valueOf(javaModelConverter.convertToXmlSave(request.getDiagram(), name));

        try {
            CheckerUtils.compress(name, PathConstants.TASKS_PATH + "/" + name + "/solutions/" + uuidStr);
        } catch (Exception e) {
            throw new SubmitException(messageSource.getMessage("label.commonError", null, locale));
        }

        Checker checker = new Checker(messageSource);
        return checker.submit(name, name + ".qrs", uuidStr, locale);
    }
}
