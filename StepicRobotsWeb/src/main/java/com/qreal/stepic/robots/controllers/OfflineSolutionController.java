package com.qreal.stepic.robots.controllers;

import com.qreal.stepic.robots.constants.PathConstants;
import com.qreal.stepic.robots.utils.CheckerUtils;
import org.apache.commons.io.IOUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;

/**
 * Created by vladzx on 04.08.15.
 */
@Controller
@RequestMapping("/offline")
public class OfflineSolutionController {

    @RequestMapping(value = "{title}", params = { "name" }, method = RequestMethod.GET)
    public ModelAndView taskHandler(@PathVariable String title, @RequestParam(value = "name") String name) {
        decompressTask(name);
        ModelAndView modelAndView = new ModelAndView("checker/offlineSolution");
        modelAndView.addObject("title", title);
        modelAndView.addObject("name", name);

        String descriptionPath = PathConstants.tasksPath + "/" + name + "/" + name + ".txt";
        try {
            String description = new String(Files.readAllBytes(Paths.get(descriptionPath)), StandardCharsets.UTF_8);
            modelAndView.addObject("description", description);
        } catch (IOException e) {
            e.printStackTrace();
        }

        return modelAndView;
    }

    @RequestMapping(value = "/downloadTask/{title}", params = { "name" }, method = RequestMethod.GET)
    public
    @ResponseBody
    void downloadFiles(HttpServletRequest request, HttpServletResponse response, @PathVariable String title,
                       @RequestParam(value = "name") String name) {
        File downloadFile = new File(PathConstants.tasksPath + "/" + name + "/" + name + ".qrs");
        try (FileInputStream inputStream = new FileInputStream(downloadFile);
             OutputStream outStream = response.getOutputStream()) {
            response.setContentLength((int) downloadFile.length());
            response.setContentType("application/octet-stream");

            String headerKey = "Content-Disposition";
            String headerValue = String.format("attachment; filename=\"%s-%s\"", title, downloadFile.getName());
            response.setHeader(headerKey, headerValue);

            IOUtils.copy(inputStream, outStream);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @ResponseBody
    @RequestMapping(value = "/decompressTask/{name}", method = RequestMethod.POST)
    public void decompressTask(@PathVariable String name) {
        try {
            CheckerUtils.decompressTask(name);
        } catch (IOException e) {
            e.printStackTrace();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
