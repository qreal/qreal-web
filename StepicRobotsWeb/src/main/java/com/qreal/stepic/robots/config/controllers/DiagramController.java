package com.qreal.stepic.robots.config.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

/**
 * Created by vladzx on 25.10.14.
 */
@Controller
public class DiagramController {

    @RequestMapping(value = "", method = RequestMethod.GET)
    public ModelAndView index() {
        return new ModelAndView("index");
    }

    @RequestMapping(value = "/diagram", method = RequestMethod.GET)
    public ModelAndView diagram() {
        return new ModelAndView("diagram/diagram");
    }
}
