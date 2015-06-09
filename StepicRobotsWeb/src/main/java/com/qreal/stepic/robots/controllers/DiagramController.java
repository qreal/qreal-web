package com.qreal.stepic.robots.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.qreal.stepic.robots.converters.JavaModelConverter;
import com.qreal.stepic.robots.converters.XmlSaveConverter;
import com.qreal.stepic.robots.model.diagram.*;
import com.qreal.stepic.robots.model.two_d.Point;
import com.qreal.stepic.robots.model.two_d.Trace;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.*;

/**
 * Created by vladzx on 25.10.14.
 */
@Controller
public class DiagramController {

    @RequestMapping(value = "", method = RequestMethod.GET)
    public ModelAndView index() {
        return new ModelAndView("index");
    }

    @Autowired
    private ResourceLoader resourceLoader;

    @RequestMapping(value = "{taskId}", method = RequestMethod.GET)
    public ModelAndView showTask(@PathVariable String taskId, Model model) {
        model.addAttribute("taskId", taskId);
        return new ModelAndView("index");
    }

    @ResponseBody
    @RequestMapping(value = "/open", method = RequestMethod.POST)
    public Diagram open(@RequestBody OpenRequest request) {
        Resource resource = resourceLoader.getResource("tasks/" + request.getId());
        XmlSaveConverter converter= new XmlSaveConverter();

        try {
            File folder = resource.getFile();
            String folderPath = folder.getPath();
            File diagramDirectory = new File(folderPath + "/diagram");

            if (!diagramDirectory.exists()) {
                ProcessBuilder processBuilder = new ProcessBuilder("compressor", "diagram.qrs");
                processBuilder.directory(folder);
                processBuilder.start().waitFor();
                diagramDirectory = new File(folderPath + "/diagram");
            }

            File treeDirectory = new File(diagramDirectory.getPath() + "/tree");
            Diagram diagram = converter.convertToJavaModel(treeDirectory);
            return diagram;
        } catch (IOException e) {
            e.printStackTrace();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        return null;
    }

    @ResponseBody
    @RequestMapping(value = "/submit", method = RequestMethod.POST)
    public SubmitResponse submit(@RequestBody SubmitRequest request) {
        final String taskId = request.getId();
        JavaModelConverter javaModelConverter = new JavaModelConverter();
        String uuidStr = String.valueOf(javaModelConverter.convertToXmlSave(request.getDiagram(), resourceLoader, taskId));

        try {
            Resource resource = resourceLoader.getResource("tasks/" + request.getId() + "/solutions/" + uuidStr);
            File folder = resource.getFile();
            ProcessBuilder compressorProcBuilder = new ProcessBuilder("compressor", "diagram");
            compressorProcBuilder.directory(folder);
            compressorProcBuilder.start().waitFor();

            ProcessBuilder interpreterProcBuilder = new ProcessBuilder("2D-model",
                    "-b", "--platform", "minimal", "--report", "report.json", "--trajectory", "trajectory.fifo", "diagram.qrs");
            interpreterProcBuilder.directory(folder);
            interpreterProcBuilder.start().waitFor();

            /*Path trajectoryPath = resourceLoader.getResource("tasks/" + request.getId() +
                    "/solutions/" + uuidStr + "/trajectory.fifo").getFile().toPath();

            Report report = parseReportFile(resourceLoader.getResource("tasks/" + request.getId() +
                    "/solutions/" + uuidStr + "/report.json").getFile());*/


            Path trajectoryPath = resourceLoader.getResource("tasks/" + request.getId() + "/trajectory.fifo").getFile().toPath();

            Report report = parseReportFile(resourceLoader.getResource("tasks/" + request.getId() + "/report.json").getFile());

            Trace trace = parseTrajectoryFile(trajectoryPath);
            return new SubmitResponse(report, trace);
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
