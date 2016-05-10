package com.qreal.example.controllers;

import com.qreal.example.model.Node;
import com.qreal.example.model.OpenRequest;
import com.qreal.example.model.Palette;
import com.qreal.example.service.PaletteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Iterator;
import java.util.List;

/**
 * Created by LChernigovskaya on 09.03.2016.
 */

@Controller
public class EditorController {
    @Autowired
    private PaletteService paletteService;

    @ResponseBody
    @RequestMapping(value = "/createPalette", method = RequestMethod.POST)
    public void createPalette(@RequestBody Palette palette) {
        System.out.println(palette.getPaletteName());
        System.out.println(palette.getPaletteId());
        Iterator<Node> iter = palette.getNodes().iterator();
        while (iter.hasNext()) {
            System.out.println(iter.next().getName());
            System.out.println(iter.next().getNodeId());
        }
        //paletteService.createPalette(palette);

    }

    @ResponseBody
    @RequestMapping(value = "/getPalette", method = RequestMethod.POST)
    public Palette getPalette(@RequestBody OpenRequest request) {
        return(paletteService.getPalette(request.getName()));
    }

    @ResponseBody
    @RequestMapping(value = "/showPaletteNames", method = RequestMethod.POST)
    public List<String> showPaletteNames() {
        return paletteService.showPaletteNames();
    }
}
