package com.qreal.robots.socket;

import java.io.*;
import java.net.Socket;

/**
 * Created by ageevdenis on 28-2-15.
 */
public class SocketClient {

    private final String hostName;
    private final int port;

    public SocketClient(String hostName, int port) {
        this.hostName = hostName;
        this.port = port;
    }

    public String sendMessage(String message) {
        Socket socket = null;
        DataOutputStream outToServer = null;
        BufferedReader inFromServer = null;
        String result = "ERROR";
        try {
            socket = new Socket(hostName, port);

            outToServer = new DataOutputStream(socket.getOutputStream());
            inFromServer = new BufferedReader(new InputStreamReader(socket.getInputStream()));

            outToServer.writeBytes(message + "\n");
            result = getResultMessage(inFromServer);
        } catch (IOException e) {
            e.printStackTrace();
            return "ERROR ERROR ERROR";
        } finally {
            close(inFromServer);
            close(outToServer);
            close(socket);
        }
        return result;
    }

    private String getResultMessage(BufferedReader inFromServer) throws IOException {
        return inFromServer.readLine();
    }

    private void close(Closeable closeable) {
        if (closeable != null) {
            try {
                closeable.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}
