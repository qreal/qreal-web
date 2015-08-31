package com.qreal.stepic.robots.controllers;

import com.qreal.stepic.robots.checker.OfflineSolutionUploader;
import com.qreal.stepic.robots.constants.PathConstants;
import com.qreal.stepic.robots.exceptions.SubmitException;
import com.qreal.stepic.robots.exceptions.UploadException;
import com.qreal.stepic.robots.model.checker.Description;
import com.qreal.stepic.robots.model.checker.UploadedSolution;
import com.qreal.stepic.robots.model.diagram.SubmitResponse;
import org.apache.commons.io.IOUtils;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartHttpServletRequest;
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
import java.util.Locale;

import static java.nio.charset.StandardCharsets.UTF_8;

/**
 * Created by vladimir-zakharov on 04.08.15.
 */
@Controller
@RequestMapping("/offline")
public class OfflineSolutionController extends SolutionController {

    private OfflineSolutionUploader offlineSolutionUploader;

    public OfflineSolutionController() {
        offlineSolutionUploader = new OfflineSolutionUploader();
    }

    @ExceptionHandler(UploadException.class)
    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
    @ResponseBody
    public byte[] handleUploadException(UploadException e) {
        return e.getMessage().getBytes(UTF_8);
    }

    @RequestMapping(value = "{title}", params = { "name" }, method = RequestMethod.GET)
    public ModelAndView showTask(@PathVariable String title, @RequestParam(value = "name") String name) {
        try {
            compressor.decompress(name);
        } catch (IOException ioe) {
            ioe.printStackTrace();
        } catch (InterruptedException ie) {
            ie.printStackTrace();
        }

        ModelAndView modelAndView = new ModelAndView("checker/offlineSolution");
        modelAndView.addObject("title", title);
        modelAndView.addObject("name", name);

        Description description = getDescription(name);
        if (description != null) {
            modelAndView.addObject("description", description.getMain());
        }

        return modelAndView;
    }

    @RequestMapping(value = "/downloadTask/{title}", params = { "name" }, method = RequestMethod.GET)
    public
    @ResponseBody
    void downloadFiles(HttpServletRequest request, HttpServletResponse response, @PathVariable String title,
                       @RequestParam(value = "name") String name) {
        File downloadFile = new File(PathConstants.TASKS_PATH + "/" + name + "/" + name + ".qrs");
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
    @RequestMapping(value = "upload/{name}", method = RequestMethod.POST)
    public SubmitResponse handleFileUpload(MultipartHttpServletRequest request,
                                           @PathVariable String name,
                                           Locale locale) throws UploadException, SubmitException {
        UploadedSolution uploadedSolution = offlineSolutionUploader.upload(request, name, messageSource, locale);
        return checker.submit(name, uploadedSolution.getFilename(), String.valueOf(uploadedSolution.getUuid()),
                messageSource, locale);

    }

}
