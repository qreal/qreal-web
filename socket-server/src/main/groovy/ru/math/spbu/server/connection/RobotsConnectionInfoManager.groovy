package ru.math.spbu.server.connection

import groovy.util.logging.Slf4j
import org.apache.commons.lang3.StringUtils

import java.util.concurrent.ConcurrentHashMap

/**
 * Created by ageevdenis on 02-3-15.
 */

@Slf4j
@Singleton
class RobotsConnectionInfoManager {

    Map<String, RobotConnectionInfo> robotConnections = new ConcurrentHashMap<>()


    def createRobotConnection(String owner, String code, def desc, Socket socket) {
        RobotConnectionInfo robotsConnectionInfo = new RobotConnectionInfo(owner: owner, description: desc, socket: socket, secretCode: code)
        def key = RobotConnectionInfo.getKey(owner, code)
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


    def addProgram(String key, String program) {
        if (!robotConnections.containsKey(key)) {
            log.error "Unable to add program. Robot is offline"
            return
        }
        RobotConnectionInfo info = robotConnections.get(key)
        info.program = program
    }

    def getOnlineRobots() {

        def list = []
        robotConnections.each { key, value ->
            list.add(key)
        }

        return list
    }

    def hasProgram(String key) {
        if (!robotConnections.containsKey(key)) {
            return false
        }
        RobotConnectionInfo robotConnectionInfo = robotConnections.get(key)
        return StringUtils.isNotBlank(robotConnectionInfo.program)
    }

    def getProgram(String key) {
        if (!robotConnections.containsKey(key)) {
            throw new IllegalArgumentException("Unable to find program for robot $key")
        }
        return robotConnections.get(key).program
    }

    def markAsRead(String key) {
        RobotConnectionInfo robotConnectionInfo = robotConnections.get(key)
        robotConnectionInfo.program = null
    }


    private static boolean isConnectionClosed(Socket socket) {
        PrintWriter out = new PrintWriter(socket.getOutputStream(), true);
        out.println("HeartBeat")
        return out.checkError();
    }

}

