/*
 * Copyright Vladimir Zakharov
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.qreal.stepic.robots.model.diagram;

import java.io.Serializable;

/**
 * Created by vladimir-zakharov on 12.08.15.
 */
public class OpenResponse implements Serializable {

    private Diagram diagram;
    private String fieldXML;

    public OpenResponse(Diagram diagram, String fieldXML) {
        this.diagram = diagram;
        this.fieldXML = fieldXML;
    }

    public Diagram getDiagram() {
        return diagram;
    }

    public void setDiagram(Diagram diagram) {
        this.diagram = diagram;
    }

    public String getFieldXML() {
        return fieldXML;
    }

    public void setFieldXML(String fieldXML) {
        this.fieldXML = fieldXML;
    }

}
