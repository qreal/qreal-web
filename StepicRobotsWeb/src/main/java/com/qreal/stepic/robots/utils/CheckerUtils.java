package com.qreal.stepic.robots.utils;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.qreal.stepic.robots.constants.PathConstants;
import com.qreal.stepic.robots.exceptions.NotExistsException;
import com.qreal.stepic.robots.exceptions.SubmitException;
import com.qreal.stepic.robots.model.diagram.Report;
import com.qreal.stepic.robots.model.diagram.ReportMessage;
import com.qreal.stepic.robots.model.diagram.SubmitResponse;
import org.apache.commons.io.FileUtils;
import org.apache.commons.lang.StringEscapeUtils;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import java.io.*;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

/**
 * Created by vladzx on 12.08.15.
 */
public class CheckerUtils {

    public static SubmitResponse submit(String taskId, String filename, String uuidStr) throws SubmitException {
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
            String fieldXML = null;
            if (failedField.exists()) {
                BufferedReader br = new BufferedReader(new FileReader(failedField));
                String pathToFailedField = br.readLine();
                fieldXML = new String(Files.readAllBytes(Paths.get(pathToFailedField)), StandardCharsets.UTF_8);
                String[] pathParts = pathToFailedField.split("/");
                String failedFilename = pathParts[pathParts.length - 1];
                String failedName = failedFilename.substring(0, failedFilename.length() - 4);
                trajectoryPath = PathConstants.tasksPath + "/" + taskId +
                        "/solutions/" + uuidStr + "/trajectories/" + nameWithoutExt + "/" + failedName;

                report = parseReportFile(new File(PathConstants.tasksPath + "/" + taskId +
                        "/solutions/" + uuidStr + "/reports/" + nameWithoutExt + "/" + failedName));
            } else {
                String pathToMetainfo = PathConstants.tasksPath + "/" + taskId + "/" + taskId + "/metaInfo.xml";

                try {
                    fieldXML = getWorldModelFromMetainfo(pathToMetainfo);
                } catch (Exception e) {
                    e.printStackTrace();
                    throw new SubmitException("Can't load 2d world model! Please contact the developers");
                }
                trajectoryPath = PathConstants.tasksPath + "/" + taskId + "/solutions/" + uuidStr + "/trajectory";

                report = parseReportFile(new File(PathConstants.tasksPath + "/" + taskId +
                        "/solutions/" + uuidStr + "/report"));
            }

            String trace = new String(Files.readAllBytes(Paths.get(trajectoryPath)));
            // TODO: fix this temporary hack for current trajectory;
            trace = trace.substring(0, trace.length() - 2) + "]";
            //FileUtils.deleteDirectory(solutionFolder);

            return new SubmitResponse(report, trace, fieldXML);
        } catch (IOException e) {
            e.printStackTrace();
            throw new SubmitException("Error while checking, please contact the developers");
        } catch (InterruptedException e) {
            e.printStackTrace();
            throw new SubmitException("Error while checking, please contact the developers");
        }
    }

    public static Report parseReportFile(File file) throws SubmitException {
        ObjectMapper mapper = new ObjectMapper();
        try {
            List<ReportMessage> messages = mapper.readValue(file, List.class);
            return new Report(messages);
        } catch (IOException e) {
            e.printStackTrace();
            throw new SubmitException("Can't return report! Please contact the developers");
        }
    }

    public static String getWorldModelFromMetainfo(String pathToMetaInfo) throws NotExistsException,
            IOException, ParserConfigurationException, SAXException {

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
            throw new NotExistsException("There is no attribute key with value worldModel in the metainfo");
    }

    public static void compress(String taskId, String pathToFolder) throws IOException, InterruptedException {
        File folder = new File(pathToFolder);
        ProcessBuilder compressorProcBuilder = new ProcessBuilder("sudo", "compressor", taskId);
        compressorProcBuilder.directory(folder);
        compressorProcBuilder.start().waitFor();
    }

    public static void decompressTask(String taskId) throws IOException, InterruptedException {
        String pathToFile = PathConstants.tasksPath + "/" + taskId;
        File folder = new File(pathToFile);
        File diagramDirectory = new File(pathToFile + "/" + taskId);

        if (!diagramDirectory.exists()) {
            ProcessBuilder processBuilder = new ProcessBuilder(PathConstants.compressorPath, taskId + ".qrs");
            processBuilder.directory(folder);

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
    }
}
