package com.qreal.stepic.robots.controllers;

import com.qreal.stepic.robots.constants.PathConstants;
import com.qreal.stepic.robots.exceptions.SubmitException;
import com.qreal.stepic.robots.exceptions.UploadException;
import com.qreal.stepic.robots.model.diagram.SubmitResponse;
import com.qreal.stepic.robots.utils.CheckerUtils;
import org.apache.log4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletResponse;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Iterator;
import java.util.NoSuchElementException;
import java.util.UUID;

/**
 * Created by vladzx on 04.08.15.
 */
@Controller
@RequestMapping("/offline")
public class FileUploadController {

    private static final Logger LOG = Logger.getLogger(FileUploadController.class);

    @ExceptionHandler(UploadException.class)
    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
    @ResponseBody
    public String handleUploadException(UploadException e) {
        return e.getMessage();
    }

    @ResponseBody
    @RequestMapping(value = "upload/{taskId}", method = RequestMethod.POST)
    public SubmitResponse handleFileUpload(MultipartHttpServletRequest request, HttpServletResponse response,
                                           @PathVariable String taskId) throws UploadException, SubmitException {
        Iterator<String> iterator = request.getFileNames();
        MultipartFile file;
        try {
            file = request.getFile(iterator.next());
        } catch (NoSuchElementException e) {
            throw new UploadException("No files");
        }

        String name = file.getOriginalFilename();

        if (!file.isEmpty()) {
            try {
                String directoryPath = PathConstants.tasksPath + "/" + taskId;

                UUID uuid = UUID.randomUUID();

                String targetPath = directoryPath + "/solutions/" + String.valueOf(uuid);
                File targetDirectory = new File(targetPath);
                targetDirectory.mkdirs();

                File serverFile = new File(targetDirectory.getAbsolutePath() + '/' + name);

                byte[] bytes = file.getBytes();
                BufferedOutputStream stream = new BufferedOutputStream(new FileOutputStream(serverFile));
                stream.write(bytes);
                stream.close();
                LOG.info("Server File Location = " + serverFile.getAbsolutePath());
                return CheckerUtils.submit(taskId, name, String.valueOf(uuid));
            } catch (IOException e) {
                e.printStackTrace();
                throw new UploadException("Sorry, try to upload the file again");
            }
        } else {
            throw new UploadException("The uploaded file is empty!");
        }
    }
}
