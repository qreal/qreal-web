package com.qreal.robots.service.rest;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.qreal.robots.controller.MainController;
import com.qreal.robots.dao.RobotDAO;
import com.qreal.robots.dao.UserDAO;
import com.qreal.robots.model.auth.User;
import com.qreal.robots.model.robot.Message;
import com.qreal.robots.model.robot.Robot;
import com.qreal.robots.model.robot.RobotInfo;
import com.qreal.robots.parser.*;
import com.qreal.robots.socket.SocketClient;
import org.apache.commons.io.IOUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by ageevdenis on 02-3-15.
 */

@RestController
public class RobotRestService {

    private static final ObjectMapper mapper = new ObjectMapper();

    private static final Logger LOG = Logger.getLogger(RobotRestService.class);


    @Autowired
    private UserDAO userDao;

    @Autowired
    private RobotDAO robotDao;


    @ResponseBody
    @RequestMapping(value = "/sendDiagram", method = RequestMethod.POST)
    public String sendProgram(@RequestParam("robotName") String robotName, @RequestParam("program") String program) throws JsonProcessingException {
        Robot robot = robotDao.findByName(robotName);
        SocketClient socketClient = new SocketClient(MainController.HOST_NAME, MainController.PORT);
        return socketClient.sendMessage(generateSendProgramRequest(robot.getSecretCode(), program));
    }


    // TODO CHECK FOR EXISTING ROBOT
    @ResponseBody
    @RequestMapping(value = "/registerRobot", method = RequestMethod.POST)
    public String register(@RequestParam("robotName") String name, @RequestParam("secretCode") String secretCode) {
        User user = userDao.findByUserName(getUserName());
        robotDao.save(new Robot(name, secretCode, user));
        return "{\"message\":\"OK\"}";
    }


    @ResponseBody
    @RequestMapping(value = "/deleteRobot", method = RequestMethod.POST)
    public String delete(@RequestParam("robotName") String name) {
        Robot robot = robotDao.findByName(name);
        robotDao.delete(robot);
        return "{\"message\":\"OK\"}";

    }

    @ResponseBody
    @RequestMapping(value = "/saveModelConfig", method = RequestMethod.POST)
    public String saveModelConfig(@RequestParam("robotName") String name, @RequestParam("modelConfigJson") String modelConfigJson,
                                  @RequestParam("typeProperties") String typeProperties) throws IOException {
        ModelConfig modelConfig = getModelConfig(modelConfigJson, typeProperties);
        String systemConfigXml = IOUtils.toString(this.getClass().getResourceAsStream("/system-config.xml"));
        SystemConfig systemConfig = new SystemConfigParser().parse(systemConfigXml);
        ModelConfigValidator validator = new ModelConfigValidator(systemConfig);
        ValidationResult result = validator.validate(modelConfig);
        return buildResultMessage(result);

    }

    private String buildResultMessage(ValidationResult result) {
        return String.format("{\"status\":\"%s\", \"errors\":\"%s\"}", result.isOk(), result.getErrorsString());
    }

    private ModelConfig getModelConfig(String modelConfigJson, String typeProperties) throws IOException {
        List<Map<String, String>> mapList = mapper.readValue(modelConfigJson,
                new TypeReference<List<HashMap<String, String>>>() {
                });
        List<Map<String, String>> propertyList = mapper.readValue(typeProperties,
                new TypeReference<List<HashMap<String, String>>>() {
                });

        Map<String, String> map = new HashMap<>();
        for (Map lMap : mapList) {
            map.putAll(lMap);
        }

        return new ModelConfig(map, propertyList);
    }


    private String generateSendProgramRequest(String secretCode, String program) throws JsonProcessingException {
        RobotInfo robotInfo = new RobotInfo(getUserName(), secretCode, program);
        Message message = new Message("WebApp", "sendDiagram", robotInfo);
        return mapper.writeValueAsString(message);
    }

    private String getUserName() {
        return SecurityContextHolder.getContext().getAuthentication().getName();

    }


}
