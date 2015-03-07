package com.qreal.robots.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Created by dageev on 07.03.15.
 */

@Controller
public class MainController {

    @RequestMapping("/")
    public String home() {
        return "index";
    }
}
