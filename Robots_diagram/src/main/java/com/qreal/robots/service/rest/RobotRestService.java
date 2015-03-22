package com.qreal.robots.service.rest;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.qreal.robots.dao.RobotDAO;
import com.qreal.robots.dao.UserDAO;
import com.qreal.robots.model.auth.User;
import com.qreal.robots.model.robot.Message;
import com.qreal.robots.model.robot.Robot;
import com.qreal.robots.model.robot.RobotInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

/**
 * Created by ageevdenis on 02-3-15.
 */

@RestController
public class RobotRestService {


    public static final String HOST_NAME = "127.0.0.1";
    public static final int PORT = 9002;
    private static final ObjectMapper mapper = new ObjectMapper();
    @Autowired
    private UserDAO userDao;

    @Autowired
    private RobotDAO robotDao;


    @ResponseBody
    @RequestMapping(value = "/sendDiagram", method = RequestMethod.POST)
    public String sendProgram(@RequestParam("robotName") String robotName, @RequestParam("program") String program) throws JsonProcessingException {
        Robot robot = robotDao.findByName(robotName);
        //  SocketClient socketClient = new SocketClient(HOST_NAME, PORT);
        return "{\"message\":\"OK\"}";

        //   return socketClient.sendMessage(generateSendProgramRequest(robot.getSecretCode(), program));
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


    private String generateSendProgramRequest(String secretCode, String program) throws JsonProcessingException {
        RobotInfo robotInfo = new RobotInfo(secretCode, program);
        Message message = new Message("WebApp", "sendProgram", robotInfo);
        return mapper.writeValueAsString(message);
    }

    private String getUserName() {
        return SecurityContextHolder.getContext().getAuthentication().getName();

    }


}
