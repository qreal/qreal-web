package com.qreal.stepic.robots.checker;

import com.qreal.stepic.robots.constants.PathConstants;
import com.qreal.stepic.robots.exceptions.NotExistsException;
import org.apache.commons.lang.StringEscapeUtils;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import java.io.*;

/**
 * Created by vladzx on 12.08.15.
 */
public class CheckerUtils {

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

}
