package com.qreal.robots.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.collect.Lists;
import com.qreal.robots.model.robot.Message;
import com.qreal.robots.model.robot.RobotInfo;
import com.qreal.robots.socket.SocketClient;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import java.io.IOException;
import java.util.Collection;
import java.util.List;

/**
 * Created by ageevdenis on 02-3-15.
 */
@Controller
public class RobotController {

    public static final String HOST_NAME = "127.0.0.1";
    public static final int PORT = 9002;
    private static final ObjectMapper mapper = new ObjectMapper();

    @RequestMapping(value = "/robot", method = RequestMethod.GET)
    public ModelAndView viewRobot() {
        ModelAndView model = new ModelAndView();
        model.setViewName("robot/robot");
        return model;
    }

    @RequestMapping(value = "/create-code", method = RequestMethod.GET)
    public String createCode(Model model) throws IOException {
        SocketClient socketClient = new SocketClient(HOST_NAME, PORT);
        String robotsMessage = socketClient.sendMessage(generateGetOnlineRobotsRequest());
        List<RobotInfo> robots = mapper.readValue(robotsMessage, mapper.getTypeFactory().constructCollectionType(List.class, RobotInfo.class));
        model.addAttribute("robotsId", getRobotIds(robots));

        return "robot/createCode";
    }

    @RequestMapping(value = "/map", method = RequestMethod.GET)
    public String map(Model model) throws JsonProcessingException {
        SocketClient socketClient = new SocketClient(HOST_NAME, PORT);
        String robots = socketClient.sendMessage(generateGetOnlineRobotsRequest());

        model.addAttribute("robots", robots);
        return "robot/map";
    }


    private String generateGetOnlineRobotsRequest() throws JsonProcessingException {
        Message message = new Message("WebApp", "getOnlineRobots");
        return mapper.writeValueAsString(message);
    }

    private Collection<String> getRobotIds(List<RobotInfo> robots) {
        Collection<String> robotIds = Lists.newArrayList();
        for (RobotInfo robot : robots) {
            robotIds.add(robot.getId());
        }
        return robotIds;
    }
}
