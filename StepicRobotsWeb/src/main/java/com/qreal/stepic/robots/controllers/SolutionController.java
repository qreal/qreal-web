package com.qreal.stepic.robots.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.qreal.stepic.robots.checker.Checker;
import com.qreal.stepic.robots.checker.Compressor;
import com.qreal.stepic.robots.constants.PathConstants;
import com.qreal.stepic.robots.exceptions.NotExistsException;
import com.qreal.stepic.robots.model.checker.Description;
import org.apache.commons.lang.StringEscapeUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Controller;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;
import sun.security.krb5.internal.crypto.Des;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import java.io.File;
import java.io.IOException;

/**
 * Created by vladimir-zakharov on 31.08.15.
 */
@Controller
public abstract class SolutionController {

    @Autowired
    protected MessageSource messageSource;

    protected Compressor compressor;

    protected Checker checker;

    public SolutionController() {
        compressor = new Compressor();
        checker = new Checker();
    }

    protected Description getDescription(String name) {
        String descriptionPath = PathConstants.TASKS_PATH + "/" + name + "/description_ru.json";
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            return objectMapper.readValue(new File(descriptionPath), Description.class);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

}
