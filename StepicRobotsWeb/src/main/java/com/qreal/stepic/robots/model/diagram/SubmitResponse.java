package com.qreal.stepic.robots.model.diagram;

import com.qreal.stepic.robots.model.two_d.Trace;

import java.io.Serializable;

/**
 * Created by vladzx on 09.06.15.
 */
public class SubmitResponse implements Serializable {

    public SubmitResponse(Report report, Trace trace, String failedFieldXML) {
        this.report = report;
        this.trace = trace;
        this.failedFieldXML = failedFieldXML;
    }

    public Report getReport() {
        return report;
    }

    public void setReport(Report report) {
        this.report = report;
    }

    public Trace getTrace() {
        return trace;
    }

    public void setTrace(Trace trace) {
        this.trace = trace;
    }

    public String getFailedFieldXML() {
        return failedFieldXML;
    }

    public void setFailedFieldXML(String failedFieldXML) {
        this.failedFieldXML = failedFieldXML;
    }

    private Report report;
    private Trace trace;
    private String failedFieldXML;
}
