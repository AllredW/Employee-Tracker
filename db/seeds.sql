\c employee_tracker_db;

INSERT INTO department(name)
VALUES ('Medicine'),
       ('Surgery'),
       ('Nursing'),
       ('Adjacent'),

INSERT INTO role(title, salary, department_id)
VALUES ('Chief of Medicine', 440000, 1),
        ('Senior Attending Physician', 300000, 1),
        ('Medical Resident', 240000, 1),
        ('Medical Intern', 35000, 1),
        ('Chief of Surgery', 490000, NULL),
        ('Attending Surgeon', 130000, 2),
        ('Surgery Resident', 90000, 2),
        ('Surgery Intern', 36000, 2),
        ('Head Nurse', 117000, 3),
        ('Registered Nurse', 88000, 3),
        ('Legal Consultant', 100000, 4),
        ('Custodian', 24000, 4),
        ('Attending Pathologist', 290000, 4);
        ('Ambulance Driver', 25000, 4);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES 
        ('Bob', 'Kelso', 1, NULL),
        ('Perry', 'Cox', 2, 2),
        ('John', 'Dorian', 3, 3),
        ('Chistopher', 'Turk', 7, NULL),
        ('Elliot', 'Reed', 3, NULL),
        ('Carla', 'Espinosa', 9, NULL),
        ('Janitor', NULL, 12, NULL),
        ('Todd', 'Quinlan', 7, 2),
        ('Ted', 'Buckland', 11, 2),
        ('Laverne', 'Roberts', 10, 2),
        ('Doug', 'Murphy', 13, 2),
        ('Keith', 'Dudemeister', 4, 2),
        ('Phillip', 'Wen', 5, NULL),
        ('Lonnie', NULL, 4, NULL),
        ('Lloyd', 'Slawski', 14, 11),
        ('Seymour', 'Beardface', 6, 2),
        ('Coleman', 'Slawski', 3, 2),
        ('Hooch', NULL, 7, 4),
        ('Walter', 'Mickhead', 6, 2),
        ('Randall', 'Winston', 12, 4),
        ('Snoop Dogg Intern', 'Ronald', 4, 4),
        ('Doug', 'Townshend', 3, 4),
        ('Jason', 'Cabbagio', 4, 4);