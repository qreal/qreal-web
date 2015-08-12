package com.qreal.stepic.robots.controllers;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.qreal.stepic.robots.constants.PathConstants;
import com.qreal.stepic.robots.model.checker.TaskItem;
import com.qreal.stepic.robots.utils.CheckerUtils;
import org.apache.commons.io.IOUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
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
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * Created by vladzx on 04.08.15.
 */
@Controller
@RequestMapping("/checker")
public class CheckerController {

    @RequestMapping(value = "tasks", method = RequestMethod.GET)
    public ModelAndView tasksHandler() {
        ModelAndView modelAndView = new ModelAndView("checker/tasks");

        List<TaskItem> taskItems = this.parseTaskList(new File(PathConstants.stepicPath + "/list.json"));

        File tasksDir = new File(PathConstants.tasksPath);
        Set<String> taskNames = new HashSet<>();
        for (File task : tasksDir.listFiles()) {
            taskNames.add(task.getName());
        }

        List<TaskItem> tasks = new ArrayList();
        for (TaskItem item : taskItems) {
            if (taskNames.contains(item.getName())) {
                tasks.add(item);
            }
        }

        modelAndView.addObject("tasks", tasks);
        modelAndView.addObject("tasksWithTitles");
        return modelAndView;
    }

    @RequestMapping(value = "task/{taskId}", method = RequestMethod.GET)
    public ModelAndView taskHandler(@PathVariable String taskId) {
        decompressTask(taskId);
        ModelAndView modelAndView = new ModelAndView("checker/task");
        modelAndView.addObject("taskId", taskId);

        String descriptionPath = PathConstants.tasksPath + "/" + taskId + "/" + taskId + ".txt";
        try {
            String description = new String(Files.readAllBytes(Paths.get(descriptionPath)), StandardCharsets.UTF_8);
            modelAndView.addObject("description", description);
        } catch (IOException e) {
            e.printStackTrace();
        }

        return modelAndView;
    }

    @RequestMapping(value = "task/downloadTask/{taskId}", method = RequestMethod.GET)
    public
    @ResponseBody
    void downloadFiles(HttpServletRequest request, HttpServletResponse response, @PathVariable String taskId) {
        File downloadFile = new File(PathConstants.tasksPath + "/" + taskId + "/" + taskId + ".qrs");
        try (FileInputStream inputStream = new FileInputStream(downloadFile);
             OutputStream outStream = response.getOutputStream()) {
            response.setContentLength((int) downloadFile.length());
            response.setContentType("application/octet-stream");

            String headerKey = "Content-Disposition";
            String headerValue = String.format("attachment; filename=\"%s\"", downloadFile.getName());
            response.setHeader(headerKey, headerValue);

            IOUtils.copy(inputStream, outStream);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @ResponseBody
    @RequestMapping(value = "task/decompressTask/{taskId}", method = RequestMethod.POST)
    public void decompressTask(@PathVariable String taskId) {
        try {
            CheckerUtils.decompressTask(taskId);
        } catch (IOException e) {
            e.printStackTrace();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    private List<TaskItem> parseTaskList(File file) {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            return objectMapper.readValue(file, new TypeReference<List<TaskItem>>() {
            });
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }
}
