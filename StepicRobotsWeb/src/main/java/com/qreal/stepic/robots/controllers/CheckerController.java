package com.qreal.stepic.robots.controllers;

import com.qreal.stepic.robots.converters.XmlSaveConverter;
import com.qreal.stepic.robots.model.diagram.Diagram;
import com.qreal.stepic.robots.model.diagram.OpenRequest;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by vladzx on 04.08.15.
 */
@Controller
@RequestMapping("/checker")
public class CheckerController {

    @Autowired
    private ResourceLoader resourceLoader;

    @RequestMapping(value = "tasks", method = RequestMethod.GET)
    public ModelAndView tasksHandler() {
        ModelAndView modelAndView = new ModelAndView("checker/tasks");
        try {
            File tasksDir = resourceLoader.getResource("tasks").getFile();
            List<String> taskNames = new ArrayList<String>();
            for (File task : tasksDir.listFiles()) {
                taskNames.add(task.getName());
            }
            modelAndView.addObject("tasks", taskNames);
        } catch (IOException e) {
            e.printStackTrace();
        }

        return modelAndView;
    }

    @RequestMapping(value = "task/{taskId}", method = RequestMethod.GET)
    public ModelAndView uploadHandler(@PathVariable String taskId) {
        decompressTask(taskId);
        ModelAndView modelAndView = new ModelAndView("checker/task");
        modelAndView.addObject("taskId", taskId);
        return modelAndView;
    }

    @RequestMapping(value = "task/downloadTask/{taskId}", method = RequestMethod.GET)
    public @ResponseBody
    void downloadFiles(HttpServletRequest request, HttpServletResponse response, @PathVariable String taskId) {
        FileInputStream inputStream = null;
        OutputStream outStream = null;

        try {
            File downloadFile = resourceLoader.getResource("tasks/" + taskId + "/" + taskId + ".qrs").getFile();

            inputStream = new FileInputStream(downloadFile);

            response.setContentLength((int) downloadFile.length());
            response.setContentType("application/octet-stream");

            String headerKey = "Content-Disposition";
            String headerValue = String.format("attachment; filename=\"%s\"", downloadFile.getName());
            response.setHeader(headerKey, headerValue);

            outStream = response.getOutputStream();
            IOUtils.copy(inputStream, outStream);
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                if (inputStream != null) {
                    inputStream.close();
                }
                if (outStream != null) {
                    outStream.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }

        }

    }

    @ResponseBody
    @RequestMapping(value = "task/decompressTask/{taskId}", method = RequestMethod.POST)
    public void decompressTask(@PathVariable String taskId) {
        Resource resource = resourceLoader.getResource("tasks/" + taskId);

        try {
            File folder = resource.getFile();
            String folderPath = folder.getPath();
            File diagramDirectory = new File(folderPath + "/" + taskId);

            if (!diagramDirectory.exists()) {
                ProcessBuilder processBuilder = new ProcessBuilder("compressor", taskId + ".qrs");
                processBuilder.directory(folder);
                processBuilder.start().waitFor();
            }
        } catch (IOException e) {
            e.printStackTrace();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
