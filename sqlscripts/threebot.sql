--Create database
CREATE DATABASE IF NOT EXISTS `threebot` DEFAULT CHARACTER SET utf8 COLLATE utf8_bin;

--Make main table
CREATE TABLE user_scripts ( 
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, 
    UUID VARCHAR(36) NOT NULL UNIQUE, 
    username VARCHAR(16) NOT NULL,
    joindate DATETIME,
    --More stuff to be added later...
    --firstwords
    --quote
    --last seen
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP)