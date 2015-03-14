package com.qreal.robots.dao;

import com.qreal.robots.dao.config.HibernateTestConfig;
import com.qreal.robots.model.auth.User;
import com.qreal.robots.model.robot.Robot;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.Set;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

/**
 * Created by dageev on 14.03.15.
 */

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = {HibernateTestConfig.class})
public class RobotDAOTest extends BaseDAOTest {


    @Autowired
    private RobotDAO robotDao;

    @Autowired
    private UserDAO userDao;


    @Test
    public void testFindByNameRobot() {
        User user = getAndSaveUser(USER_NAME, userDao);
        Robot robot = new Robot(ROBOT_NAME, user);
        robotDao.save(robot);

        Robot savedRobot = robotDao.findByName(ROBOT_NAME);

        assertNotNull(savedRobot);
        assertEquals(robot.getName(), savedRobot.getName());
    }

    @Test
    public void testSaveRobot() {
        User user = getAndSaveUser(USER_NAME2, userDao);
        Robot robot = new Robot(ROBOT_NAME, user);
        robotDao.save(robot);

        User savedUser = userDao.findByUserName(USER_NAME2);

        Set<Robot> robots = savedUser.getRobots();
        assertEquals(1, robots.size());
        assertEquals(robot.getName(), robots.iterator().next().getName());
    }

}
