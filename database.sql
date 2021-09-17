CREATE DATABASE tasks_db;

CREATE TABLE tk_user (
    user_id         INT4 AUTO_INCREMENT PRIMARY KEY,
    username        VARCHAR(100),
    user_password   VARCHAR(200),
    UNIQUE (username)
)