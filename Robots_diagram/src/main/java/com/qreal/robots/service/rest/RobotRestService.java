package com.qreal.robots.service.rest;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.qreal.robots.model.robot.Message;
import com.qreal.robots.model.robot.RobotInfo;
import com.qreal.robots.socket.SocketClient;
import org.springframework.web.bind.annotation.*;

/**
 * Created by ageevdenis on 02-3-15.
 */

@RestController
public class RobotRestService {


    private static final ObjectMapper mapper = new ObjectMapper();
    public static final String HOST_NAME = "127.0.0.1";
    public static final int PORT = 9002;


    @ResponseBody
    @RequestMapping(value = "/sendProgram", method = RequestMethod.POST)
    public String sendProgram(@RequestParam("id") String id, @RequestParam("program") String program) throws JsonProcessingException {

        SocketClient socketClient = new SocketClient(HOST_NAME, PORT);
        return socketClient.sendMessage(generateSendProgramRequest(id, program));
    }

    private String generateSendProgramRequest(String id, String program) throws JsonProcessingException {
        RobotInfo robotInfo = new RobotInfo(id, program);
        Message message = new Message("WebApp", "sendProgram", robotInfo);
        return mapper.writeValueAsString(message);
    }

}
