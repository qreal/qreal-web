package com.qreal.stepic.robots.model.checker;

import java.util.UUID;

/**
 * Created by vladimir-zakharov on 31.08.15.
 */
public class UploadedSolution {

    public UploadedSolution(UUID uuid, String filename) {
        this.uuid = uuid;
        this.filename = filename;
    }

    public UUID getUuid() {
        return uuid;
    }

    public String getFilename() {
        return filename;
    }

    private UUID uuid;
    private String filename;
}
