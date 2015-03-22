package ru.math.spbu.server.processor

import groovy.json.JsonOutput
import ru.math.spbu.server.connection.RobotConnectionInfo
import ru.math.spbu.server.connection.RobotsConnectionInfoManager

/**
 * Created by ageevdenis on 28-2-15.
 */
class WebAppConnectionProcessor implements ConnectionProcessor {

    RobotsConnectionInfoManager robotsConnectionInfoManager = RobotsConnectionInfoManager.instance

    @Override
    def process(Socket socket, def message) {
        def result
        switch (message.type) {
            case "getOnlineRobots":
                result = getOnlineRobots(message.user, message.secretCodes);
                break;
            case "sendDiagram":
                result = sendDiagram(message.robot)
                break
            case "closeConnection":
                result = closeConnection(message.robot)
                break
            default: result = "Unknown type of connection"
        }
        return result
    }


    def closeConnection(def robot) {
        def key = RobotConnectionInfo.getKey(robot.owner, robot.code)
        robotsConnectionInfoManager.closeConnection(key)
        return "Closed connection for robot $robot.id"
    }

    def getOnlineRobots(def user, def secretCodes) {
        def map = [:]
        def robots = robotsConnectionInfoManager.getOnlineRobots()
        secretCodes.each {
            def key = RobotConnectionInfo.getKey(user, it)
            map.put(it, robots.contains(key))
        }
        return JsonOutput.toJson(map)
    }

    def sendDiagram(def robot) {
        String key = RobotConnectionInfo.getKey(robot.owner, robot.code)
        robotsConnectionInfoManager.addProgram(key, robot.program)
        return "Successfully sended"
    }
}
