-- File to pre-populate database

INSERT INTO department(department_name)
VALUES ("Engineering"),("Sales"),("Customer Services"),("Finance");

INSERT INTO role (title,salary,department_id)
VALUES ("Engineer", 50000, 1),("Field",25000,2),("Complaint Handler",20000,3),("Debt Manager", 25000,4);

INSERT INTO employee (first_name,last_name,role_id,manager_id)
VALUES ("Jack","Wood",1,1),("Natalie","Turner",2,2),("Jill","Smith",3,1),("Steve","Lewis",4,null);
