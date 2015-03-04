package com.qreal.robots.controller;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

/**
 * Created by vladzx on 27.02.15.
 */
@Controller
@RequestMapping("/2dmodel")
public class TwoDModelController {
    private static final Logger LOG = Logger.getLogger(TwoDModelController.class);

    @RequestMapping(value = "", method = RequestMethod.GET)
    public ModelAndView twoDModel(Model model) {
        return new ModelAndView("2dmodel");
    }
}
