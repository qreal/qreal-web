package com.qreal.robots.parser

import groovy.transform.TupleConstructor

/**
 * Created by dageev on 29.03.15.
 */
@TupleConstructor
class ValidationResult {

    List<String> errors

    def hasErrors() {
        return errors.size() > 0
    }

    def addError(String error) {
        errors.add(error);
    }

}
