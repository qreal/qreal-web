package com.qreal.stepic.robots.controllers;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.qreal.stepic.robots.constants.PathConstants;
import com.qreal.stepic.robots.converters.JavaModelConverter;
import com.qreal.stepic.robots.converters.XmlSaveConverter;
import com.qreal.stepic.robots.exceptions.SubmitException;
import com.qreal.stepic.robots.loaders.TypesLoader;
import com.qreal.stepic.robots.model.checker.Description;
import com.qreal.stepic.robots.model.diagram.Diagram;
import com.qreal.stepic.robots.model.diagram.OpenResponse;
import com.qreal.stepic.robots.model.diagram.SubmitRequest;
import com.qreal.stepic.robots.model.diagram.SubmitResponse;
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
import java.util.Iterator;
import java.util.Locale;

/**
 * Created by vladimir-zakharov on 25.10.14.
 */
@Controller
@RequestMapping("/online")
public class OnlineSolutionController extends SolutionController {

    @Autowired
    private MessageSource messageSource;

    private TypesLoader typesLoader;

    public OnlineSolutionController() {
        typesLoader = new TypesLoader();
    }

    @RequestMapping(value = "{title}", params = { "name" }, method = RequestMethod.GET)
    public ModelAndView showTask(HttpServletRequest request, @PathVariable String title,
                                 @RequestParam(value = "name") String name, Locale locale)
            throws NoSuchRequestHandlingMethodException {
        if (getTypes(name, locale) == null) {
            throw new NoSuchRequestHandlingMethodException(request);
        }
        ModelAndView modelAndView = new ModelAndView("checker/onlineSolution");
        modelAndView.addObject("title", title);
        modelAndView.addObject("name", name);

        Description description = getDescription(name);
        if (description != null) {
            modelAndView.addObject("description", description);
        }

        return modelAndView;
    }

    @ResponseBody
    @RequestMapping(value = "getTypes/{name}", method = RequestMethod.POST)
    public JsonNode getTypes(@PathVariable String name, Locale locale) {
        return typesLoader.getTypesJson(name, locale);
    }

    @ResponseBody
    @RequestMapping(value = "open/{name}", method = RequestMethod.POST)
    public OpenResponse open(@PathVariable String name) {
        XmlSaveConverter converter= new XmlSaveConverter();

        try {
            compressor.decompress(name);
            String fieldXML = checker.getWorldModelFromMetainfo(PathConstants.TASKS_PATH + "/" + name + "/"
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
            compressor.compress(name, PathConstants.TASKS_PATH + "/" + name + "/solutions/" + uuidStr);
        } catch (Exception e) {
            throw new SubmitException(messageSource.getMessage("label.commonError", null, locale));
        }

        return checker.submit(name, name + ".qrs", uuidStr, messageSource, locale);
    }

}
