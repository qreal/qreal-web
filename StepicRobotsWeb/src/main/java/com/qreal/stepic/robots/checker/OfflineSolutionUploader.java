package com.qreal.stepic.robots.checker;

import com.qreal.stepic.robots.constants.PathConstants;
import com.qreal.stepic.robots.exceptions.SubmitException;
import com.qreal.stepic.robots.exceptions.UploadException;
import com.qreal.stepic.robots.model.checker.UploadedSolution;
import org.apache.log4j.Logger;
import org.springframework.context.MessageSource;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Iterator;
import java.util.Locale;
import java.util.NoSuchElementException;
import java.util.UUID;

/**
 * Created by vladimir-zakharov on 31.08.15.
 */
public class OfflineSolutionUploader {

    private static final Logger LOG = Logger.getLogger(OfflineSolutionUploader.class);

    public UploadedSolution upload(MultipartHttpServletRequest request,
                                 @PathVariable String name,
                                 MessageSource messageSource, Locale locale) throws UploadException, SubmitException {
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
                String directoryPath = PathConstants.TASKS_PATH + "/" + name;

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
                return new UploadedSolution(uuid, filename);
            } catch (IOException e) {
                e.printStackTrace();
                throw new UploadException(messageSource.getMessage("label.uploadError", null, locale));
            }
        } else {
            throw new UploadException(messageSource.getMessage("label.emptyFile", null, locale));
        }
    }

}
