package com.qreal.robots.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * Created by vladzx on 25.10.14.
 */
@Controller
public class DiagramController {

    @RequestMapping(value = "/diagram", method = RequestMethod.GET)
    public String index() {
        return "diagram/diagram";
    }
}
