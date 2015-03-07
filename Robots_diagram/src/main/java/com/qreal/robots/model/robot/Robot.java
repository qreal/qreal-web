package com.qreal.robots.model.robot;

import com.qreal.robots.model.auth.User;

import javax.persistence.*;

import static javax.persistence.GenerationType.IDENTITY;

/**
 * Created by dageev on 07.03.15.
 */

@Entity
@Table(name = "robots")
public class Robot {

    private Integer id;
    private String name;
    private User user;

    public Robot() {
    }

    public Robot(User user, String name) {
        this.user = user;
        this.name = name;
    }


    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "id",
            unique = true, nullable = false)
    public Integer getId() {
        return this.id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "username", nullable = false)
    public User getUser() {
        return this.user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Column(name = "name", nullable = false, length = 45)
    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }


}
