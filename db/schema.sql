-- creates database for employee information, connects to that database
DROP DATABASE IF EXISTS employee_tracker_db;
CREATE DATABASE employee_tracker_db;

\c employee_tracker_db

-- create table for workplace departments, with id number and department name
CREATE TABLE department (
  id SERIAL PRIMARY KEY,
  name VARCHAR(225) UNIQUE NOT NULL
);

-- create table for workplace roles(positions), with id, title, salary, and reference id to department
CREATE TABLE role (
  id SERIAL PRIMARY KEY,
  title VARCHAR(225) UNIQUE NOT NULL,
  department_id INTEGER NOT NULL,
  salary DECIMAL NOT NULL,
  CONSTRAINT fk_department
--   FOREIGN KEY references department.id value
    FOREIGN KEY (department_id)
    REFERENCES department(id) ON DELETE CASCADE
);

-- create table for employees, with employee id, first/last names, and employee role
CREATE TABLE employee (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(225) NOT NULL,
  last_name VARCHAR(225) NOT NULL,
  role_id INTEGER NOT NULL,
CONSTRAINT fk_role
-- FOREIGN KEYS reference roles id number, and references other employees within table as target employee's manager
    FOREIGN KEY (role_id)
    REFERENCES role(id)
    ON DELETE CASCADE,
      manager_id INTEGER,
CONSTRAINT fk_manager
    FOREIGN KEY (manager_id)
    REFERENCES employee(id)
    ON DELETE SET NULL
);