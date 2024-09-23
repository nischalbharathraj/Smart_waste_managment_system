CREATE DATABASE waste_management;
USE waste_management;
CREATE TABLE bins (
    bin_id INT AUTO_INCREMENT PRIMARY KEY,
    location VARCHAR(255) NOT NULL,
    fill_level INT NOT NULL,
    type ENUM('recyclable', 'non-recyclable') NOT NULL,
    last_collected DATE
);

CREATE TABLE routes (
    route_id INT AUTO_INCREMENT PRIMARY KEY,
    truck_id INT NOT NULL,
    bin_id INT,
    scheduled_date DATE,
    status ENUM('pending', 'completed') DEFAULT 'pending'
);

CREATE TABLE trucks (
    truck_id INT AUTO_INCREMENT PRIMARY KEY,
    driver_name VARCHAR(255) NOT NULL,
    capacity INT NOT NULL
);