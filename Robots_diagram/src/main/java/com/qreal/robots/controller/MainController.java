package com.qreal.robots.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.collect.Lists;
import com.qreal.robots.dao.UserDAO;
import com.qreal.robots.model.auth.User;
import com.qreal.robots.model.robot.Message;
import com.qreal.robots.model.robot.Robot;
import com.qreal.robots.socket.SocketClient;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import java.io.IOException;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
        Map<String, Boolean> onlineUserRobots = getOnlineRobots(user);

        setRobotsStatus(user.getRobots(), onlineUserRobots);


        model.setViewName("index");
        return model;
    }

    private Map<String, Boolean> getOnlineRobots(User user) {
        SocketClient socketClient = new SocketClient(HOST_NAME, PORT);
        try {
            String response = socketClient.sendMessage(getUserOnlineRobots(user));
            return mapper.readValue(response,
                    new TypeReference<Map<String, Boolean>>() {
                    });
        } catch (IOException e) {
            LOG.error("Error getting online robots", e);
        }
        return new HashMap();
    }

    private void setRobotsStatus(Collection<Robot> robots, Map<String, Boolean> onlineRobots) {
        for (Robot robot : robots) {
            boolean status = onlineRobots.get(robot.getSecretCode()) != null && onlineRobots.get(robot.getSecretCode());
            robot.setStatus(status ? "Online" : "Offline");
        }
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
