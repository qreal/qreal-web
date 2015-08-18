package com.qreal.stepic.robots.model.diagram;

import java.io.Serializable;

/**
 * Created by vladzx on 09.06.15.
 */
public class SubmitResponse implements Serializable {

    public SubmitResponse(Report report, String trace, String fieldXML) {
        this.report = report;
        this.trace = trace;
        this.fieldXML = fieldXML;
    }

    public Report getReport() {
        return report;
    }

    public void setReport(Report report) {
        this.report = report;
    }

    public String getTrace() {
        return trace;
    }

    public void setTrace(String trace) {
        this.trace = trace;
    }

    public String getFieldXML() {
        return fieldXML;
    }

    public void setFieldXML(String fieldXML) {
        this.fieldXML = fieldXML;
    }

    private Report report;
    private String trace;
    private String fieldXML;
}
