package com.qreal.robots.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.collect.Lists;
import com.qreal.robots.dao.UserDAO;
import com.qreal.robots.model.auth.User;
import com.qreal.robots.model.robot.Message;
import com.qreal.robots.model.robot.Robot;
import com.qreal.robots.model.robot.RobotInfo;
import com.qreal.robots.model.robot.RobotWrapper;
import com.qreal.robots.socket.SocketClient;
import org.apache.commons.io.IOUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import java.io.IOException;
import java.util.Collections;
import java.util.List;
import java.util.Set;

/**
 * Created by dageev on 07.03.15.
 */

@Controller
public class MainController {

    public static final String HOST_NAME = "127.0.0.1";
    public static final int PORT = 9002;

    private static final Logger LOG = Logger.getLogger(MainController.class);

    private static final ObjectMapper mapper = new ObjectMapper();

    @Autowired
    private UserDAO userDao;


    @RequestMapping("/")
    public ModelAndView home() {
        User user = userDao.findByUserName(getUserName());
        ModelAndView model = new ModelAndView();
        model.addObject("user", user);
        // model.addObject("robotsWrapper", getFullRobotInfo(user.getRobots(), getOnlineRobots(user)));
        model.addObject("robotsWrapper", getFakeList(user));


        model.setViewName("index");
        return model;
    }

    private List<RobotWrapper> getFullRobotInfo(Set<Robot> robots, List<RobotInfo> onlineUserRobots) {
        List<RobotWrapper> robotsWrapper = Lists.newArrayList();
        for (Robot robot : robots) {
            for (RobotInfo robotInfo : onlineUserRobots) {
                boolean found = false;
                if (robot.getSecretCode().equals(robotInfo.getSecretCode())) {
                    found = true;
                    robotsWrapper.add(new RobotWrapper(robot, robotInfo, "Online"));
                }
                if (!found) {
                    robotsWrapper.add(new RobotWrapper(robot, "Offline"));
                }
            }
            "initScript" ()

        }
        return robotsWrapper;
    }

    private List<RobotWrapper> getFakeList(User user) {
        List<RobotWrapper> robotWrappers = Lists.newArrayList();

        Robot robot = new Robot("Robot", "SecretCode", user);
        try {
            String modelConfig = IOUtils.toString(this.getClass().getResourceAsStream("/model-config.xml"));
            String systemConfig = IOUtils.toString(this.getClass().getResourceAsStream("/system-config.xml"));
            RobotInfo robotInfo = new RobotInfo("SecretCode", systemConfig, modelConfig);
            robotWrappers.add(new RobotWrapper(robot, robotInfo, "Online"));
        } catch (IOException e) {
            e.printStackTrace();
        }
        return robotWrappers;
    }

    private List<RobotInfo> getOnlineRobots(User user) {
        SocketClient socketClient = new SocketClient(HOST_NAME, PORT);
        try {
            String response = socketClient.sendMessage(getUserOnlineRobots(user));
            return mapper.readValue(response,
                    new TypeReference<List<RobotInfo>>() {
                    });
        } catch (IOException e) {
            LOG.error("Error getting online robots", e);
        }
        return Collections.emptyList();
    }


    private String getUserOnlineRobots(User user) throws JsonProcessingException {
        List<String> secretCodes = Lists.newArrayList();
        for (Robot robot : user.getRobots()) {
            secretCodes.add(robot.getSecretCode());
        }

        Message message = new Message("WebApp", "getOnlineRobots", user.getUsername(), secretCodes);
        return mapper.writeValueAsString(message);
    }


    private String getUserName() {
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }

}
