package ru.math.spbu.server.processor

import groovy.util.logging.Slf4j
import ru.math.spbu.server.connection.RobotConnectionInfo
import ru.math.spbu.server.connection.RobotsConnectionInfoManager

/**
 * Created by ageevdenis on 28-2-15.
 */
@Slf4j
class RobotConnectionProcessor implements ConnectionProcessor {

    private static final String OK = "OK"
    RobotsConnectionInfoManager connectionInfoManager = RobotsConnectionInfoManager.instance

    @Override
    def process(Socket socket, def message) {
        def result
        switch (message.type) {
            case "connect":
                result = connect(socket, message.robot)
                break;
            default: result = "Unknown type of message"
        }
        return result
    }

    def connect(Socket socket, def robot) {
        connectionInfoManager.createRobotConnection(robot.owner, robot.secretCode, robot, socket)
        String key = RobotConnectionInfo.getKey(robot.owner, robot.secretCode)
        log.info "The connection is established"
        log.info "$robot.owner's robot accepted"
        socket.withStreams { input, output ->
            def w = new BufferedWriter(new OutputStreamWriter(output))

            sendMessage "Robot accepted", w

            while (connectionInfoManager.isRobotConnected(key)) {

                while (connectionInfoManager.isRobotConnected(key) && !connectionInfoManager.hasMessage(key)) {
                    Thread.sleep(3000);
                }

                if (connectionInfoManager.hasMessage(key)) {
                    sendMessage connectionInfoManager.getMessages(key), w
                    connectionInfoManager.markAsRead(key)
                }
            }

            log.info "$robot.owner's robot disconnected"
        }


    }

    def sendMessage(msg, writer) {
        log.info "Sending: >" + msg + "<"
        writer.writeLine(msg.toString())
        writer.flush();
    }
}
