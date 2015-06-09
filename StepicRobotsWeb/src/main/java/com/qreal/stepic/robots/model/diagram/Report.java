package com.qreal.stepic.robots.model.diagram;

import java.io.Serializable;
import java.util.List;

/**
 * Created by vladzx on 09.06.15.
 */
public class Report implements Serializable {

    public Report(List<ReportMessage> messages) {
        this.messages = messages;
    }

    public List<ReportMessage> getMessages() {
        return messages;
    }

    public void setMessages(List<ReportMessage> messages) {
        this.messages = messages;
    }

    private List<ReportMessage> messages;
}
