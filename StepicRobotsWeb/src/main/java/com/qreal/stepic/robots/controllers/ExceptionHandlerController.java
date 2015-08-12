package com.qreal.stepic.robots.controllers;

import com.qreal.stepic.robots.exceptions.SubmitException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Created by vladzx on 12.08.15.
 */
@ControllerAdvice
public class ExceptionHandlerController {

    @ExceptionHandler(SubmitException.class)
    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
    @ResponseBody
    public String handleUploadException(SubmitException e) {
        return e.getMessage();
    }
}
