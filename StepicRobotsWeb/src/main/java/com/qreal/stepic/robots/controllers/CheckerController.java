package com.qreal.stepic.robots.controllers;

import com.qreal.stepic.robots.constants.PathConstants;
import org.apache.commons.io.IOUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by vladzx on 04.08.15.
 */
@Controller
@RequestMapping("/checker")
public class CheckerController {

    @RequestMapping(value = "tasks", method = RequestMethod.GET)
    public ModelAndView tasksHandler() {
        ModelAndView modelAndView = new ModelAndView("checker/tasks");

        File tasksDir = new File(PathConstants.tasksPath);
        List<String> taskNames = new ArrayList<String>();
        for (File task : tasksDir.listFiles()) {
            taskNames.add(task.getName());
        }

        modelAndView.addObject("tasks", taskNames);
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
    public
    @ResponseBody
    void downloadFiles(HttpServletRequest request, HttpServletResponse response, @PathVariable String taskId) {
        FileInputStream inputStream = null;
        OutputStream outStream = null;

        try {
            File downloadFile = new File(PathConstants.tasksPath + "/" + taskId + "/" + taskId + ".qrs");

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
        String pathToFile = PathConstants.tasksPath + "/" + taskId;
        File folder = new File(pathToFile);
        File diagramDirectory = new File(pathToFile + "/" + taskId);

        try {
            if (!diagramDirectory.exists()) {
                ProcessBuilder processBuilder = new ProcessBuilder(PathConstants.compressorPath, taskId + ".qrs");
                processBuilder.directory(folder);

                System.out.println(pathToFile);
                System.out.println(processBuilder.command());

                final Process process = processBuilder.start();
                InputStream is = process.getInputStream();
                InputStreamReader isr = new InputStreamReader(is);
                BufferedReader bufferedReader = new BufferedReader(isr);
                String line;
                while ((line = bufferedReader.readLine()) != null) {
                    System.out.println(line);
                }
                process.waitFor();
            }
        } catch (IOException e) {
            e.printStackTrace();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
