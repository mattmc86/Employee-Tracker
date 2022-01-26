-- File to pre-populate database
USE employees

INSERT INTO department(department_name)
VALUES ("Engineering"),("Sales"),("Customer Services"),("Finance");

INSERT INTO role (title,salary, department_id)
VALUES ("Engineer", 50000,1),("Field",25000,2),("Complaint Handler",20000,3),("Debt Manager", 25000,4);

INSERT INTO role (title,salary, department_id)
VALUES ("Senior Engineer", 50000,1),("Sales Manager",25000,2),("Complaint Manager",20000,3);


INSERT INTO employee (first_name,last_name,role_id,manager_id)
VALUES ("Jack","Wood",1,5),("Natalie","Turner",2,6),("Jill","Smith",3,7),("Steve","Lewis",4,null);