/*
 * Copyright Vladimir Zakharov
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
import com.qreal.stepic.robots.translators.PropertyValueTranslator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.multiaction.NoSuchRequestHandlingMethodException;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
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

    @RequestMapping(value = "{id}", params = { "kit", "name", "title" }, method = RequestMethod.GET)
    public ModelAndView showTask(HttpServletRequest request, @PathVariable String id,
                                 @RequestParam(value="kit") String kit,
                                 @RequestParam(value="name") String name,
                                 @RequestParam(value="title") String title, Locale locale)
            throws NoSuchRequestHandlingMethodException {
        if (getTypes(kit, id, locale) == null) {
            throw new NoSuchRequestHandlingMethodException(request);
        }
        ModelAndView modelAndView = new ModelAndView("checker/onlineSolution");
        modelAndView.addObject("kit", kit);
        modelAndView.addObject("title", title);
        modelAndView.addObject("id", id);
        modelAndView.addObject("name", name);

        Description description = getDescription(kit, id, locale);
        if (description != null) {
            modelAndView.addObject("description", description);
        }

        return modelAndView;
    }

    @ResponseBody
    @RequestMapping(value = "getTypes/{id}", method = RequestMethod.POST)
    public JsonNode getTypes(@RequestParam(value="kit") String kit, @PathVariable String id, Locale locale) {
        return typesLoader.getTypesJson(kit, id, locale);
    }

    @ResponseBody
    @RequestMapping(value = "open/{id}", method = RequestMethod.POST)
    public OpenResponse open(@PathVariable String id, @RequestParam(value="kit") String kit) {
        XmlSaveConverter converter = new XmlSaveConverter();

        try {
            compressor.decompress(kit, id);
            String fieldXML = checker.getWorldModelFromMetainfo(PathConstants.STEPIC_PATH + "/" + "trikKit" + kit + "/tasks" +
                    "/" + id + "/" + id + "/metaInfo.xml");
            File treeDirectory = new File(PathConstants.STEPIC_PATH + "/" + "trikKit" + kit + "/tasks" +
                    "/" + id + "/" + id + "/tree");
            Diagram diagram = converter.convertToJavaModel(treeDirectory);
            return new OpenResponse(diagram, fieldXML);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    @ResponseBody
    @RequestMapping(value = "submit/{id}", method = RequestMethod.POST)
    public SubmitResponse submit(@RequestParam(value="kit") String kit,
                                 @RequestParam(value="diagram") String diagramString,
                                 @PathVariable String id, Locale locale) throws SubmitException {
        try {
            ObjectMapper mapper = new ObjectMapper();
            Diagram diagram = mapper.readValue(diagramString, Diagram.class);
            PropertyValueTranslator translator = new PropertyValueTranslator();
            translator.translateAllPropertiesValue(diagram.getNodes(), locale);
            translator.translateAllPropertiesValue(diagram.getLinks(), locale);
            JavaModelConverter javaModelConverter = new JavaModelConverter();
            String uuidStr = String.valueOf(javaModelConverter.convertToXmlSave(diagram, kit, id));
            compressor.compress(id, PathConstants.STEPIC_PATH + "/" + "trikKit" + kit + "/tasks" +
                    "/" + id + "/solutions/" + uuidStr);
            return checker.submit(kit, id, id + ".qrs", uuidStr, messageSource, locale);
        } catch (Exception e) {
            throw new SubmitException(messageSource.getMessage("label.commonError", null, locale));
        }
    }

}
