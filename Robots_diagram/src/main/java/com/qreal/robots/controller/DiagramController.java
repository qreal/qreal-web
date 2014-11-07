package com.qreal.robots.controller;

import com.qreal.robots.model.DefaultDiagramNode;
import com.qreal.robots.model.Diagram;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

/**
 * Created by vladzx on 25.10.14.
 */
@Controller
public class DiagramController {
    private static final Logger log = Logger.getLogger(DiagramController.class);

    @RequestMapping("/")
    public String home() {
        log.info("redirect from / to /diagram");
        return "redirect:/diagram";
    }

    @RequestMapping(value = "/diagram", method = RequestMethod.GET)
    public String index(Model model) {
        return "index";
    }

    @RequestMapping(value = "/save", method = RequestMethod.POST)
    public
    @ResponseBody
    String save(@RequestBody Diagram diagram) {
        log.info("save diagram");
        log.info("nodeInex" + diagram.getNodeIndex());
        for (DefaultDiagramNode node : diagram.getNodes()) {
            log.info(node.getId());
        }

        return "{\"message\":\"OK\"}";
    }

    @RequestMapping(value = "/open", method = RequestMethod.POST)
    public
    @ResponseBody
    String open(@RequestParam String name) {
        log.info("open diagram");
        String result = "OK";
        return result;
    }
}
