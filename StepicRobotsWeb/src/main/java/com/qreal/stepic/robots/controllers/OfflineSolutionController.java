/*
 * Copyright Vladimir Zakharov
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
import org.springframework.web.multipart.MaxUploadSizeExceededException;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.HandlerExceptionResolver;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Locale;

import static java.nio.charset.StandardCharsets.UTF_8;

/**
 * Created by vladimir-zakharov on 04.08.15.
 */
@Controller
@RequestMapping("/offline")
public class OfflineSolutionController extends SolutionController implements HandlerExceptionResolver {

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

    @RequestMapping(value = "{id}", params = { "name", "title"}, method = RequestMethod.GET)
    public ModelAndView showTask(HttpServletRequest request, @PathVariable String id,
                                 @RequestParam(value="title") String title, Locale locale) {
        try {
            compressor.decompress(id);
        } catch (IOException ioe) {
            ioe.printStackTrace();
        } catch (InterruptedException ie) {
            ie.printStackTrace();
        }

        String name = getParamWithUTF8Encoding(request, "name");
        ModelAndView modelAndView = new ModelAndView("checker/offlineSolution");
        modelAndView.addObject("title", title);
        modelAndView.addObject("id", id);
        modelAndView.addObject("name", name);

        Description description = getDescription(id, locale);
        if (description != null) {
            modelAndView.addObject("description", description);
        }

        return modelAndView;
    }

    @RequestMapping(value = "/downloadTask/{id}", params = { "title" }, method = RequestMethod.GET)
    public
    @ResponseBody
    void downloadFiles(HttpServletRequest request, HttpServletResponse response, @PathVariable String id,
                       @RequestParam(value = "title") String title) {
        File downloadFile = new File(PathConstants.TASKS_PATH + "/" + id + "/" + id + ".qrs");
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
    @RequestMapping(value = "upload/{id}", method = RequestMethod.POST)
    public SubmitResponse handleFileUpload(MultipartHttpServletRequest request,
                                           @PathVariable String id,
                                           Locale locale) throws UploadException, SubmitException {
        UploadedSolution uploadedSolution = offlineSolutionUploader.upload(request, id, messageSource, locale);
        return checker.submit(id, uploadedSolution.getFilename(), String.valueOf(uploadedSolution.getUuid()),
                messageSource, locale);

    }

    @Override
    @ResponseBody
    public ModelAndView resolveException(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse,
                                         Object o, Exception e) {
        httpServletResponse.setStatus(500);
        if (e instanceof MaxUploadSizeExceededException) {
            ModelAndView modelAndView = new ModelAndView("errors/maxSizeError");
            return modelAndView;
        }
        e.printStackTrace();
        return new ModelAndView("errors/commonError");
    }

    private String getParamWithUTF8Encoding(HttpServletRequest request, String paramName) {
        try {
            return new String(request.getParameter(paramName).getBytes("ISO-8859-1"), "UTF-8");
        }
        catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        return null;
    }

}
