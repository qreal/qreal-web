package com.qreal.stepic.robots.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.qreal.stepic.robots.constants.PathConstants;
import com.qreal.stepic.robots.exceptions.UploadException;
import com.qreal.stepic.robots.model.diagram.Report;
import com.qreal.stepic.robots.model.diagram.ReportMessage;
import com.qreal.stepic.robots.model.diagram.SubmitResponse;
import com.qreal.stepic.robots.model.two_d.Point;
import com.qreal.stepic.robots.model.two_d.Trace;
import org.apache.commons.io.FileUtils;
import org.apache.commons.lang.StringEscapeUtils;
import org.apache.log4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.InputSource;

import javax.servlet.http.HttpServletResponse;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import java.io.*;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.*;

/**
 * Created by vladzx on 04.08.15.
 */
@Controller
@RequestMapping("/checker/task")
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
                return submit(taskId, name, String.valueOf(uuid));
            } catch (IOException e) {
                e.printStackTrace();
                throw new UploadException("Sorry, try to upload file again");
            }
        } else {
            throw new UploadException("Uploaded file is empty!");
        }
    }

    public SubmitResponse submit(String taskId, String filename, String uuidStr) throws UploadException {
        String nameWithoutExt = filename.substring(0, filename.length() - 4);
        try {
            File taskFields = new File(PathConstants.tasksPath + "/" + taskId + "/fields");
            File solutionFolder = new File(PathConstants.tasksPath + "/" + taskId + "/solutions/" + uuidStr);

            if (taskFields.exists()) {
                File solutionFields = new File(solutionFolder.getPath() + "/fields/" + nameWithoutExt);
                FileUtils.copyDirectory(taskFields, solutionFields);
            }

            ProcessBuilder interpreterProcBuilder = new ProcessBuilder(PathConstants.checkerPath, filename);
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

            String trajectoryPath;
            Report report;

            File failedField = new File(PathConstants.tasksPath + "/" + taskId +
                    "/solutions/" + uuidStr + "/failed-field");
            String failedFieldXML = null;
            if (failedField.exists()) {
                BufferedReader br = new BufferedReader(new FileReader(failedField));
                String pathToFailedField = br.readLine();
                failedFieldXML = new String(Files.readAllBytes(Paths.get(pathToFailedField)), StandardCharsets.UTF_8);
                String[] pathParts = pathToFailedField.split("/");
                String failedFilename = pathParts[pathParts.length - 1];
                String failedName = failedFilename.substring(0, failedFilename.length() - 4);
                trajectoryPath = PathConstants.tasksPath + "/" + taskId +
                        "/solutions/" + uuidStr + "/trajectories/" + nameWithoutExt + "/" + failedName;

                report = parseReportFile(new File(PathConstants.tasksPath + "/" + taskId +
                        "/solutions/" + uuidStr + "/reports/" + nameWithoutExt + "/" + failedName));
            } else {
                String pathToMetainfo = PathConstants.tasksPath + "/" + taskId +"/" + taskId + "/metaInfo.xml";
                failedFieldXML = getWorldModelFromMetainfo(pathToMetainfo);
                trajectoryPath = PathConstants.tasksPath + "/" + taskId + "/solutions/" + uuidStr + "/trajectory";

                report = parseReportFile(new File(PathConstants.tasksPath + "/" + taskId +
                        "/solutions/" + uuidStr + "/report"));
            }

            Trace trace = parseTrajectoryFile(trajectoryPath);
            //FileUtils.deleteDirectory(solutionFolder);
            return new SubmitResponse(report, trace, failedFieldXML);
        } catch (IOException e) {
            e.printStackTrace();
            throw new UploadException("Error while checking, please contact the developers");
        } catch (InterruptedException e) {
            e.printStackTrace();
            throw new UploadException("Error while checking, please contact the developers");
        }
    }

    private String getWorldModelFromMetainfo(String pathToMetaInfo) throws UploadException {
        try {
            File metainfo = new File(pathToMetaInfo);
            DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
            DocumentBuilder dBuilder = dbFactory.newDocumentBuilder();
            Document metainfoXML = dBuilder.parse(metainfo);

            NodeList infos = metainfoXML.getElementsByTagName("info");
            for (int i = 0; i < infos.getLength(); i++) {
                Element info = (Element) infos.item(i);
                if (info.getAttribute("key").equals("worldModel")) {
                    return StringEscapeUtils.unescapeXml(info.getAttribute("value"));
                }
            }
            throw new UploadException("Can't load 2d world model! Please contact the developers");
        } catch (Exception e) {
            e.printStackTrace();
            throw new UploadException("Can't load 2d world model! Please contact the developers");
        }
    }

    private Report parseReportFile(File file) throws UploadException {
        ObjectMapper mapper = new ObjectMapper();
        try {
            List<ReportMessage> messages = mapper.readValue(file, List.class);
            return new Report(messages);
        } catch (IOException e) {
            e.printStackTrace();
            throw new UploadException("Can't return report! Please contact the developers");
        }
    }

    private Trace parseTrajectoryFile(String filePath) throws UploadException {
        Trace trace = new Trace();
        List<Point> points = new LinkedList<Point>();
        Charset charset = Charset.forName("UTF-8");
        try (BufferedReader reader = Files.newBufferedReader(Paths.get(filePath), charset)) {
            String line = null;
            while ((line = reader.readLine()) != null) {
                points.add(parseTrajectoryLine(line));
            }
        } catch (IOException e) {
            e.printStackTrace();
            throw new UploadException("Can't return trajectory! Please contact the developers");
        }
        trace.setPoints(points);
        return trace;
    }

    private Point parseTrajectoryLine(String line) {
        String parts[] = line.split(" ");
        return new Point(Double.valueOf(parts[2]), Double.valueOf(parts[3]), Double.valueOf(parts[4]), Double.valueOf(parts[1]));
    }

}
