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
import java.util.Set;

/**
 * Created by vladzx on 31.10.14.
 */
@Entity
@Table(name = "nodes")
public class DefaultDiagramNode implements Serializable {

    @Id
    @Column(name = "node_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long nodeId;

    @Column(name = "joint_object_id")
    private String jointObjectId;

    @Column(name = "type")
    private String type;

    @Column(name = "x")
    private double x;

    @Column(name = "y")
    private double y;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "node_id", referencedColumnName = "node_id")
    @OrderBy("position")
    private Set<Property> properties;

    public Long getNodeId() {
        return nodeId;
    }

    public void setNodeId(Long nodeId) {
        this.nodeId = nodeId;
    }

    public String getJointObjectId() {
        return jointObjectId;
    }

    public void setJointObjectId(String jointObjectId) {
        this.jointObjectId = jointObjectId;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

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

    public Set<Property> getProperties() {
        return properties;
    }

    public void setProperties(Set<Property> properties) {
        this.properties = properties;
    }
}
