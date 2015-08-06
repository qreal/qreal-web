package com.qreal.stepic.robots.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.qreal.stepic.robots.exceptions.UploadException;
import com.qreal.stepic.robots.model.diagram.Report;
import com.qreal.stepic.robots.model.diagram.ReportMessage;
import com.qreal.stepic.robots.model.diagram.SubmitResponse;
import com.qreal.stepic.robots.model.two_d.Point;
import com.qreal.stepic.robots.model.two_d.Trace;
import org.apache.commons.io.FileUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ResourceLoader;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.*;

/**
 * Created by vladzx on 04.08.15.
 */
@Controller
@RequestMapping("/checker/task")
public class FileUploadController {

    @Autowired
    private ResourceLoader resourceLoader;

    private static final String checkerPath = System.getProperty("user.home") + "/qreal/bin/debug/check-solution.sh";

    private static final Logger LOG = Logger.getLogger(FileUploadController.class);

    @ExceptionHandler(UploadException.class)
    @ResponseStatus(value= HttpStatus.BAD_REQUEST)
    @ResponseBody
    public String handleUploadException(UploadException e) {
        return e.getMessage();
    }

    @ResponseBody
    @RequestMapping(value = "upload/{taskId}", method = RequestMethod.POST)
    public SubmitResponse handleFileUpload(MultipartHttpServletRequest request, HttpServletResponse response,
                                           @PathVariable String taskId) throws UploadException {
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
                String directoryPath = resourceLoader.getResource("tasks/" + taskId).getFile().getPath();

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
                return submit(taskId, name, String.valueOf(uuid));
            } catch (Exception e) {
                throw new UploadException("Sorry, try to upload file again");
            }
        } else {
            throw new UploadException("Uploaded file is empty!");
        }
    }

    public SubmitResponse submit(String taskId, String filename, String uuidStr) {
        String nameWithoutExt = filename.substring(0, filename.length() - 4);
        try {
            File taskFields = resourceLoader.getResource("tasks/" + taskId + "/fields").getFile();
            File solutionFolder = resourceLoader.getResource("tasks/" + taskId + "/solutions/" + uuidStr).getFile();

            if (taskFields.exists()) {
                File solutionFields = new File(solutionFolder.getPath() + "/fields/" + nameWithoutExt);
                FileUtils.copyDirectory(taskFields, solutionFields);
            }

            ProcessBuilder interpreterProcBuilder = new ProcessBuilder(checkerPath, filename);
            interpreterProcBuilder.directory(solutionFolder);

            final Process process = interpreterProcBuilder.start();
            InputStream is = process.getInputStream();
            InputStreamReader isr = new InputStreamReader(is);
            BufferedReader bufferedReader = new BufferedReader(isr);
            String line;
            while ((line = bufferedReader.readLine()) != null) {
                System.out.println(line);
            }
            process.waitFor();

            Path trajectoryPath;
            Report report;

            File failedField = resourceLoader.getResource("tasks/" + taskId +
                    "/solutions/" + uuidStr + "/failed-field").getFile();
            String failedFilename = null;
            if (failedField.exists()) {
                BufferedReader br = new BufferedReader(new FileReader(failedField));
                String[] pathParts = br.readLine().split("/");
                failedFilename = pathParts[pathParts.length - 1];
                String failedName = failedFilename.substring(0, failedFilename.length() - 4);
                trajectoryPath = resourceLoader.getResource("tasks/" + taskId +
                        "/solutions/" + uuidStr + "/trajectories/" + nameWithoutExt + "/" + failedName).getFile().toPath();

                report = parseReportFile(resourceLoader.getResource("tasks/" + taskId +
                        "/solutions/" + uuidStr + "/reports/" + nameWithoutExt + "/" + failedName).getFile());
            } else {
                trajectoryPath = resourceLoader.getResource("tasks/" + taskId +
                        "/solutions/" + uuidStr + "/trajectories/" + nameWithoutExt + "/_" + nameWithoutExt).getFile().toPath();

                report = parseReportFile(resourceLoader.getResource("tasks/" + taskId +
                        "/solutions/" + uuidStr + "/reports/" + nameWithoutExt + "/_" + nameWithoutExt).getFile());
            }

            Trace trace = parseTrajectoryFile(trajectoryPath);
            //FileUtils.deleteDirectory(solutionFolder);
            return new SubmitResponse(report, trace, failedFilename);
        } catch (IOException e) {
            e.printStackTrace();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        return null;
    }

    private Report parseReportFile(File file) {
        ObjectMapper mapper = new ObjectMapper();
        try {
            List<ReportMessage> messages = mapper.readValue(file, List.class);
            return new Report(messages);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    private Trace parseTrajectoryFile(Path file) {
        Trace trace = new Trace();
        List<Point> points = new LinkedList<Point>();
        Charset charset = Charset.forName("UTF-8");
        try (BufferedReader reader = Files.newBufferedReader(file, charset)) {
            String line = null;
            while ((line = reader.readLine()) != null) {
                points.add(parseTrajectoryLine(line));
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        trace.setPoints(points);
        return trace;
    }

    private Point parseTrajectoryLine(String line) {
        String parts[] = line.split(" ");
        return new Point(Double.valueOf(parts[2]), Double.valueOf(parts[3]), Double.valueOf(parts[4]), Double.valueOf(parts[1]));
    }

}
