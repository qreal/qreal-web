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
	node_id BIGINT NOT NULL AUTO_INCREMENT,
	name VARCHAR(50) NOT NULL,
	x DOUBLE NOT NULL,
	y DOUBLE NOT NULL,
	image VARCHAR(255) NOT NULL,
	diagram_id BIGINT,
	PRIMARY KEY (node_id),
	FOREIGN KEY (diagram_id) REFERENCES diagrams(diagram_id)
);

DROP TABLE IF EXISTS links;
CREATE TABLE links (
	link_id BIGINT NOT NULL AUTO_INCREMENT,
	source VARCHAR(50) NOT NULL,
	target VARCHAR(50) NOT NULL,
	diagram_id BIGINT,
	PRIMARY KEY (link_id),
	FOREIGN KEY (diagram_id) REFERENCES diagrams(diagram_id)
);

DROP TABLE IF EXISTS properties;
CREATE TABLE properties (
	property_id BIGINT NOT NULL AUTO_INCREMENT,
	name VARCHAR(50) NOT NULL,
	value VARCHAR(50) NOT NULL,
  position INT NOT NULL,
	node_id BIGINT,
	PRIMARY KEY (property_id),
	FOREIGN KEY (node_id) REFERENCES nodes(node_id)
);

DROP TABLE IF EXISTS vertices;
CREATE TABLE vertices (
  vertex_id BIGINT NOT NULL AUTO_INCREMENT,
  x DOUBLE NOT NULL,
  y DOUBLE NOT NULL,
  number INT NOT NULL,
  link_id BIGINT,
	PRIMARY KEY (vertex_id),
	FOREIGN KEY (link_id) REFERENCES links(link_id)
);