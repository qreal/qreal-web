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

package com.qreal.robots.model.diagram;

import javax.persistence.*;
import java.io.Serializable;

/**
 * Created by vladzx on 17.11.14.
 */
@Entity
@Table(name = "vertices")
public class LinkVertex implements Serializable {

    @Id
    @Column(name = "vertex_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long vertexId;

    @Column(name = "x")
    private double x;

    @Column(name = "y")
    private double y;

    @Column(name = "number")
    private int number;

    public double getX() {
        return x;
    }

    public void setX(double x) {
        this.x = x;
    }

    public double getY() {
        return y;
    }

    public void setY(double y) {
        this.y = y;
    }

    public Long getVertexId() {
        return vertexId;
    }

    public void setVertexId(Long vertexId) {
        this.vertexId = vertexId;
    }

    public int getNumber() {
        return number;
    }

    public void setNumber(int number) {
        this.number = number;
    }
}
