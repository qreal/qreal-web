INSERT INTO users (username, password, enabled) VALUES ('user', '$2a$04$eWY0Czs5avEcJTDVRcB66.8n5mQmMnRCCTi6P/9oNAncfzyb8.D7e', TRUE);
INSERT INTO folders (folder_id, folder_name, username) VALUES (1, 'root', 'user');
INSERT INTO folders (folder_id, folder_name, folder_parent_id, username) VALUES (2, 'leftChild', 1, 'user');
INSERT INTO folders (folder_id, folder_name, folder_parent_id, username) VALUES (3, 'rightChild', 1, 'user');
INSERT INTO diagrams (diagram_id, name, folder_id) VALUES (1, 'diagram', 1);
INSERT INTO user_roles (username, ROLE) VALUES ('user', 'ROLE_USER');