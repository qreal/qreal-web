package com.qreal.robots.controller;

import com.qreal.robots.dao.UserDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

/**
 * Created by dageev on 07.03.15.
 */

@Controller
public class MainController {

    @Autowired
    private UserDAO userDao;


    @RequestMapping("/")
    public ModelAndView home() {
        ModelAndView model = new ModelAndView();
        model.addObject("user", userDao.findByUserName(getUserName()));
        model.setViewName("index");
        return model;
    }


    private String getUserName() {
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }

}
