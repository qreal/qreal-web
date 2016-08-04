DROP DATABASE IF EXISTS editor;
CREATE DATABASE editor;
USE editor;


DROP TABLE IF EXISTS palettes;
DROP TABLE IF EXISTS nodes;

CREATE TABLE palettes (
  palette_id    BIGINT      NOT NULL AUTO_INCREMENT,
  palette_name  VARCHAR(50) NOT NULL,
  PRIMARY KEY (palette_id)
);

CREATE TABLE nodes (
  node_id     BIGINT       NOT NULL AUTO_INCREMENT,
  name        VARCHAR(50)  NOT NULL,
  image       VARCHAR(50)  NOT NULL,
  palette_id  BIGINT,
  PRIMARY KEY (node_id),
  FOREIGN KEY (palette_id) REFERENCES palettes (palette_id)
);

CREATE TABLE node_properties (
  property_id  BIGINT      NOT NULL AUTO_INCREMENT,
  name         VARCHAR(50) NOT NULL,
  value        VARCHAR(50) NOT NULL,
  type         VARCHAR(50) NOT NULL,
  node_id      VARCHAR(50),
  PRIMARY KEY (property_id),
  FOREIGN KEY (node_id) REFERENCES nodes (node_id)
)
