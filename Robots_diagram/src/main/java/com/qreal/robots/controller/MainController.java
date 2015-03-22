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
    public ModelAndView home() throws IOException {
        User user = userDao.findByUserName(getUserName());
        ModelAndView model = new ModelAndView();
        model.addObject("user", user);
        SocketClient socketClient = new SocketClient(HOST_NAME, PORT);
        String response = socketClient.sendMessage(getUserOnlineRobots(user));
        Map<String, Boolean> onlineUserRobots = mapper.readValue(response,
                new TypeReference<Map<String, Boolean>>() {
                });

        setRobotsStatuses(user.getRobots(), onlineUserRobots);


        model.setViewName("index");
        return model;
    }

    private void setRobotsStatuses(Collection<Robot> robots, Map<String, Boolean> onlineRobots) {
        for (Robot robot : robots) {
            String status = onlineRobots.get(robot.getSecretCode()) ? "Online" : "Offline";
            robot.setStatus(status);
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
