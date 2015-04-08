package ru.math.spbu.server.connection

import groovy.json.JsonOutput
import groovy.util.logging.Slf4j

import java.util.concurrent.ConcurrentHashMap

/**
 * Created by ageevdenis on 02-3-15.
 */

@Slf4j
@Singleton
class RobotsConnectionInfoManager {

    Map<String, RobotConnectionInfo> robotConnections = new ConcurrentHashMap<>()


    def createRobotConnection(String owner, String name, String code, def desc, Socket socket) {
        RobotConnectionInfo robotsConnectionInfo = new RobotConnectionInfo(owner: owner, robotJson: desc,
                name: name, socket: socket, secretCode: code, messages: [])
        def key = RobotConnectionInfo.getKey(owner, name)
        robotConnections.put(key, robotsConnectionInfo)
    }

    def closeConnection(String key) {
        RobotConnectionInfo robotsConnectionInfo = robotConnections.get(key)
        robotsConnectionInfo.socket.close()
        robotConnections.remove(key)
    }

    boolean isRobotConnected(String key) {
        if (!robotConnections.containsKey(key)) {
            return false
        }
        RobotConnectionInfo robotsConnectionInfo = robotConnections.get(key)
        if (isConnectionClosed(robotsConnectionInfo.socket)) {
            robotConnections.remove(key)
            return false
        }
        return true
    }

    def getRobot(String key) {
        return robotConnections.get(key)
    }


    def addMessage(String key, Message message) {
        if (!robotConnections.containsKey(key)) {
            log.error "Unable to add message. Robot is offline"
            return
        }
        RobotConnectionInfo info = robotConnections.get(key)
        info.messages.add(message)
    }

    def hasMessage(String key) {
        if (!robotConnections.containsKey(key)) {
            return false
        }
        RobotConnectionInfo robotConnectionInfo = robotConnections.get(key)
        return robotConnectionInfo.messages.size() > 0;
    }

    def getMessages(String key) {
        if (!robotConnections.containsKey(key)) {
            throw new IllegalArgumentException("Unable to find messages for robot $key")
        }
        return JsonOutput.toJson(robotConnections.get(key).messages)
    }

    def markAsRead(String key) {
        RobotConnectionInfo robotConnectionInfo = robotConnections.get(key)
        robotConnectionInfo.messages = []
    }


    private static boolean isConnectionClosed(Socket socket) {
        PrintWriter out = new PrintWriter(socket.getOutputStream(), true);
        out.println("HeartBeat")
        return out.checkError();
    }

}

