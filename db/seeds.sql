\c employee_tracker_db;

INSERT INTO department(name)
VALUES ('Medicine'),
       ('Surgery'),
       ('Nursing'),
       ('Adjacent');

INSERT INTO role(title, salary, department_id)
VALUES ('Chief of Medicine', 440000, 1),
        ('Senior Attending Physician', 300000, 1),
        ('Medical Resident', 240000, 1),
        ('Medical Intern', 35000, 1),
        ('Chief of Surgery', 490000, 2),
        ('Attending Surgeon', 130000, 2),
        ('Surgery Resident', 90000, 2),
        ('Surgery Intern', 36000, 2),
        ('Head Nurse', 117000, 3),
        ('Registered Nurse', 88000, 3),
        ('Legal Consultant', 100000, 4),
        ('Custodian', 24000, 4),
        ('Attending Pathologist', 290000, 4),
        ('Ambulance Driver', 25000, 4);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES 
        ('Bob', 'Kelso', 1, NULL),
        ('Perry', 'Cox', 2, 1),
        ('John', 'Dorian', 3, 2),
        ('Chistopher', 'Turk', 7, 17),
        ('Elliot', 'Reed', 3, 2),
        ('Carla', 'Espinosa', 9, 1),
        ('Janitor', '[Unknown]', 12, 1),
        ('Todd', 'Quinlan', 7, 15),
        ('Ted', 'Buckland', 11, 1),
        ('Laverne', 'Roberts', 10, 6),
        ('Doug', 'Murphy', 13, 1),
        ('Keith', 'Dudemeister', 4, 3),
        ('Phillip', 'Wen', 5, NULL),
        ('Lloyd', 'Slawski', 14, 1),
        ('Seymour', 'Beardface', 6, 13),
        ('Coleman', 'Slawski', 3, 2),
        ('Walter', 'Mickhead', 6, 13),
        ('Randall', 'Winston', 12, 1),
        ('Snoop Dogg Intern', 'Ronald', 4, 2),
        ('Doug', 'Townshend', 3, 2),
        ('Jason', 'Cabbagio', 4, 3);