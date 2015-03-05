DROP DATABASE IF EXISTS diagram;
CREATE DATABASE diagram;
USE diagram;

DROP TABLE IF EXISTS diagrams;
CREATE TABLE diagrams (
  diagram_id BIGINT NOT NULL AUTO_INCREMENT,
  node_index BIGINT NOT NULL,
  PRIMARY KEY (diagram_id)
);

DROP TABLE IF EXISTS nodes;
CREATE TABLE nodes (
  node_id    BIGINT       NOT NULL AUTO_INCREMENT,
  name       VARCHAR(50)  NOT NULL,
  type       VARCHAR(50)  NOT NULL,
  x          DOUBLE       NOT NULL,
  y          DOUBLE       NOT NULL,
  image      VARCHAR(255) NOT NULL,
  diagram_id BIGINT,
  PRIMARY KEY (node_id),
  FOREIGN KEY (diagram_id) REFERENCES diagrams (diagram_id)
);

DROP TABLE IF EXISTS links;
CREATE TABLE links (
  link_id    BIGINT      NOT NULL AUTO_INCREMENT,
  source     VARCHAR(50) NOT NULL,
  target     VARCHAR(50) NOT NULL,
  diagram_id BIGINT,
  PRIMARY KEY (link_id),
  FOREIGN KEY (diagram_id) REFERENCES diagrams (diagram_id)
);

DROP TABLE IF EXISTS properties;
CREATE TABLE properties (
  property_id BIGINT      NOT NULL AUTO_INCREMENT,
  name        VARCHAR(50) NOT NULL,
  value       VARCHAR(50) NOT NULL,
  type        VARCHAR(50) NOT NULL,
  position    INT         NOT NULL,
  node_id     BIGINT,
  PRIMARY KEY (property_id),
  FOREIGN KEY (node_id) REFERENCES nodes (node_id)
);

DROP TABLE IF EXISTS vertices;
CREATE TABLE vertices (
  vertex_id BIGINT NOT NULL AUTO_INCREMENT,
  x         DOUBLE NOT NULL,
  y         DOUBLE NOT NULL,
  number    INT    NOT NULL,
  link_id   BIGINT,
  PRIMARY KEY (vertex_id),
  FOREIGN KEY (link_id) REFERENCES links (link_id)
);

DROP TABLE IF EXISTS users;
CREATE TABLE users (
  username VARCHAR(45) NOT NULL,
  password VARCHAR(60) NOT NULL,
  enabled  TINYINT     NOT NULL DEFAULT 1,
  PRIMARY KEY (username)
);

DROP TABLE IF EXISTS users;
CREATE TABLE users (
  username VARCHAR(45) NOT NULL,
  password VARCHAR(60) NOT NULL,
  enabled  TINYINT     NOT NULL DEFAULT 1,
  PRIMARY KEY (username)
);

DROP TABLE IF EXISTS user_roles;
CREATE TABLE user_roles (
  user_role_id INT(11)     NOT NULL AUTO_INCREMENT,
  username     VARCHAR(45) NOT NULL,
  ROLE         VARCHAR(45) NOT NULL,
  PRIMARY KEY (user_role_id),
  UNIQUE KEY uni_username_role (ROLE, username),
  KEY fk_username_idx (username),
  CONSTRAINT fk_username FOREIGN KEY (username) REFERENCES users (username)
);

INSERT INTO users (username, password, enabled)
VALUES ('denis', '$2a$10$04TVADrR6/SPLBjsK0N30.Jf5fNjBugSACeGv1S69dZALR7lSov0y', TRUE);
INSERT INTO users (username, password, enabled)
VALUES ('alex', '$2a$10$zPpMriFYhIdC.D9miiUF7OSlrHrteATa6/sNg.T.UPK8EHr5Byw7m', TRUE);


INSERT INTO user_roles (username, ROLE)
VALUES ('denis', 'ROLE_ADMIN');
INSERT INTO user_roles (username, ROLE)
VALUES ('alex', 'ROLE_USER');