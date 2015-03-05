package com.qreal.robots.controller;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * Created by vladzx on 25.10.14.
 */
@Controller
public class DiagramController {
    private static final Logger LOG = Logger.getLogger(DiagramController.class);


    @RequestMapping("/")
    public String home() {
        LOG.info("redirect from / to /diagram");
        return "redirect:/diagram";
    }

    @RequestMapping(value = "/diagram", method = RequestMethod.GET)
    public String index() {
        return "index";
    }





}
