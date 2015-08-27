package com.qreal.stepic.robots.controllers;

import com.qreal.stepic.robots.checker.Checker;
import com.qreal.stepic.robots.constants.PathConstants;
import com.qreal.stepic.robots.exceptions.SubmitException;
import com.qreal.stepic.robots.exceptions.UploadException;
import com.qreal.stepic.robots.model.diagram.SubmitResponse;
import com.qreal.stepic.robots.checker.CheckerUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.nio.charset.UnsupportedCharsetException;
import java.util.Iterator;
import java.util.Locale;
import java.util.NoSuchElementException;
import java.util.UUID;
import static java.nio.charset.StandardCharsets.*;

/**
 * Created by vladzx on 04.08.15.
 */
@Controller
@RequestMapping("/offline")
public class FileUploadController {

    private static final Logger LOG = Logger.getLogger(FileUploadController.class);

    @Autowired
    MessageSource messageSource;

    @ExceptionHandler(UploadException.class)
    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
    @ResponseBody
    public byte[] handleUploadException(UploadException e) {
        return e.getMessage().getBytes(UTF_8);
    }

    @ResponseBody
    @RequestMapping(value = "upload/{name}", method = RequestMethod.POST)
    public SubmitResponse handleFileUpload(MultipartHttpServletRequest request, HttpServletResponse response,
                                           @PathVariable String name,
                                           Locale locale) throws UploadException, SubmitException {
        Iterator<String> iterator = request.getFileNames();
        MultipartFile file;
        try {
            file = request.getFile(iterator.next());
        } catch (NoSuchElementException e) {
            throw new UploadException(messageSource.getMessage("label.noFiles", null, locale));
        }

        String filename = file.getOriginalFilename();

        if (!file.isEmpty()) {
            try {
                String directoryPath = PathConstants.tasksPath + "/" + name;

                UUID uuid = UUID.randomUUID();

                String targetPath = directoryPath + "/solutions/" + String.valueOf(uuid);
                File targetDirectory = new File(targetPath);
                targetDirectory.mkdirs();

                File serverFile = new File(targetDirectory.getAbsolutePath() + '/' + filename);

                byte[] bytes = file.getBytes();
                BufferedOutputStream stream = new BufferedOutputStream(new FileOutputStream(serverFile));
                stream.write(bytes);
                stream.close();
                LOG.info("Server File Location = " + serverFile.getAbsolutePath());
                Checker checker = new Checker(messageSource);
                return checker.submit(name, filename, String.valueOf(uuid), locale);
            } catch (IOException e) {
                e.printStackTrace();
                throw new UploadException(messageSource.getMessage("label.uploadError", null, locale));
            }
        } else {
            throw new UploadException(messageSource.getMessage("label.emptyFile", null, locale));
        }
    }
}
