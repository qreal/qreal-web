package com.qreal.stepic.robots.checker;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.qreal.stepic.robots.constants.PathConstants;
import com.qreal.stepic.robots.exceptions.SubmitException;
import com.qreal.stepic.robots.model.diagram.Report;
import com.qreal.stepic.robots.model.diagram.ReportMessage;
import com.qreal.stepic.robots.model.diagram.SubmitResponse;
import org.apache.commons.io.FileUtils;
import org.springframework.context.MessageSource;

import java.io.*;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import java.util.Locale;
import java.util.Map;

/**
 * Created by vladzx on 24.08.15.
 */
public class Checker {

    private MessageSource messageSource;

    public Checker(MessageSource messageSource) {
        this.messageSource = messageSource;
    }

    public SubmitResponse submit(String taskId, String filename, String uuidStr,
                                        Locale locale) throws SubmitException {
        String nameWithoutExt = filename.substring(0, filename.length() - 4);
        try {
            File taskFields = new File(PathConstants.TASKS_PATH + "/" + taskId + "/fields");
            File solutionFolder = new File(PathConstants.TASKS_PATH + "/" + taskId + "/solutions/" + uuidStr);

            if (taskFields.exists()) {
                File solutionFields = new File(solutionFolder.getPath() + "/fields/" + nameWithoutExt);
                FileUtils.copyDirectory(taskFields, solutionFields);
            }

            ProcessBuilder interpreterProcBuilder = new ProcessBuilder(PathConstants.CHECKER_PATH, filename);
            Map<String, String> environment = interpreterProcBuilder.environment();

            if (locale.equals(new Locale("en", ""))) {
                environment.put("LANG", "en_US.utf8");
            } else {
                environment.put("LANG", "ru_RU.utf8");
            }
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

            File failedField = new File(PathConstants.TASKS_PATH + "/" + taskId +
                    "/solutions/" + uuidStr + "/failed-field");
            String fieldXML = null;
            if (failedField.exists()) {
                BufferedReader br = new BufferedReader(new FileReader(failedField));
                String pathToFailedField = br.readLine();
                fieldXML = new String(Files.readAllBytes(Paths.get(pathToFailedField)), StandardCharsets.UTF_8);
                String[] pathParts = pathToFailedField.split("/");
                String failedFilename = pathParts[pathParts.length - 1];
                String failedName = failedFilename.substring(0, failedFilename.length() - 4);
                trajectoryPath = PathConstants.TASKS_PATH + "/" + taskId +
                        "/solutions/" + uuidStr + "/trajectories/" + nameWithoutExt + "/" + failedName;

                report = parseReportFile(new File(PathConstants.TASKS_PATH + "/" + taskId +
                        "/solutions/" + uuidStr + "/reports/" + nameWithoutExt + "/" + failedName), locale);
            } else {
                String pathToMetainfo = PathConstants.TASKS_PATH + "/" + taskId + "/" + taskId + "/metaInfo.xml";

                try {
                    fieldXML = CheckerUtils.getWorldModelFromMetainfo(pathToMetainfo);
                } catch (Exception e) {
                    e.printStackTrace();
                    throw new SubmitException(messageSource.getMessage("label.twoDModelError", null, locale));
                }
                trajectoryPath = PathConstants.TASKS_PATH + "/" + taskId + "/solutions/" + uuidStr + "/trajectory";

                report = parseReportFile(new File(PathConstants.TASKS_PATH + "/" + taskId +
                        "/solutions/" + uuidStr + "/report"), locale);
            }

            String trace = new String(Files.readAllBytes(Paths.get(trajectoryPath)));
            //FileUtils.deleteDirectory(solutionFolder);

            return new SubmitResponse(messageSource.getMessage("label.successUpload", null, locale),
                    report, trace, fieldXML);
        } catch (IOException e) {
            e.printStackTrace();
            throw new SubmitException(messageSource.getMessage("label.checkingError", null, locale));
        } catch (InterruptedException e) {
            e.printStackTrace();
            throw new SubmitException(messageSource.getMessage("label.checkingError", null, locale));
        }
    }

    private Report parseReportFile(File file, Locale locale) throws SubmitException {
        ObjectMapper mapper = new ObjectMapper();
        try {
            List<ReportMessage> messages = mapper.readValue(file, List.class);
            return new Report(messages);
        } catch (IOException e) {
            e.printStackTrace();
            throw new SubmitException(messageSource.getMessage("label.reportError", null, locale));
        }
    }

}
