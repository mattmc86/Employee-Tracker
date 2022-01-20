const inquirer = require('inquirer');
const express = require('express');
const mysql = require('mysql2');
const PORT = process.env.PORT || 3001;
const app = express();
// require mysql2
// require table console, not sure where yet
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: 'MattmcSQL',
      database: 'employees'
    },
    console.log(`Connected to the employees database.`)
  );

//prompts
const promptUser = () => {
    inquirer.prompt([
        {
            name: 'choices',
            type: 'list',
            message: 'Please select an option',
            choices:[
                'View All Departments',
                'View All Roles',
                'View All Employees',
                'Add a Department',
                'Add a Role',
                'Add an Employee',
                'Update an Employee',
                'Exit'
            ]
        }
    ])
    .then((answers) =>{
        const {choices} = answers;
        //if statements for each choice which will call a function
        if (choices === 'View All Departments'){
            viewAllDepartments();
        }
        if (choices === 'View All Roles'){
            viewAllRoles();
        }
        if (choices === 'View All Employees'){
            viewAllEmployees();
        }
        if (choices === 'Add a Department'){
            addDepartment();
        }
        if (choices === 'Add a Role'){
            addRole();
        }
        if (choices === 'Add an Employee'){
            addEmployee();
        }
        if (choices === 'Update an Employee'){
            updateEmployee();
        }
        // if (choices === 'Exit'){
        //     //close app TODO
        // }

    })
}

//functions for each choice

const viewAllDepartments = () =>{
    let sqlQuery = `SELECT department.id, department.department_name
                 FROM department;`
    db.promise().query(sqlQuery,(error,response)=>{
        if (error) throw error;
        console.table(response);
        promptUser();
    })
    
}

const viewAllRoles= () =>{
    let sqlQuery = `SELECT role.title, department.department_name, role.id, role.salary
                 FROM role
                 INNER JOIN department ON role.department_id=department.id;`
    db.promise().query(sqlQuery,(error,response)=>{
        if (error) throw error;
        console.table(response);
        promptUser();
    })
    
}

const viewAllEmployees= () =>{
    //below query needs to be changed, returns too many results
    let sqlQuery = `SELECT employee.id, employee.first_name, employee.last_name, employee.role_id ,employee.manager_id, role.salary, department.id
                 FROM employee, department, role
                 WHERE department.id = role.department_id
                 AND role_id = employee.role_id;`

                
    db.promise().query(sqlQuery,(error,response)=>{
        if (error) throw error;
        console.table(response);
        promptUser();
    });
    
};

//Add functions

const addDepartment = () =>{
    inquirer.prompt([
        {
            type: "input",
            name: "newDepartment",
            message: "What is the name of the new department?"
            // validation if left blank
        }
    ])
    .then((answer)=>{
        let sqlQuery = `INSERT INTO department (department_name) VALUE (newDepartment);`;
        db.query(sqlQuery, answer.newDepartment,(error,response) =>{
            if (error) throw error;
            viewAllDepartments();
        })
    })
}

const addRole = () =>{
    // variable for all departments
    inquirer.prompt([
        {
            type:"list",
            name: "currentDepartments",
            message: "Which department will the role be part of?",
            choices: 'allDepartsVariable'
        },
        {
            type: "input",
            name: "newRole",
            message: "What is the name of the new role?"
            //validate if left blank
        },
        {
            type: "input",
            name: "newSalary",
            message: "What is the salary for the new role?"
            //validate if left blank
        }
    ])
    .then((answers) =>{
        let sqlQuery = `INSERT INTO role VALUES (newRole, newSalary, currentDepartments);`;
        db.query(sqlQuery, answer.newDepartment,(error,response) =>{
            if (error) throw error;
            viewAllDepartments();
        })
    })
}

const addEmployee = () =>{
    inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'Please enter employees first name'
            // look at validation if left blank
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'Please enter employees last name'
            //look at validation if left blank
        }

        //need array of roles and save in const 
        //SELECT role.title FROM role;
        //{
        //type:"list",
        //name: "role",
        //message: "What is the employees role?",
        //choices: roles //variable created from roles array

         //need array of managers and save in const 
        //SELECT employee.first_name, employee.last_name FROM employees;
        //{
        //type:"list",
        //name: "manager",
        //message: "What is the employees manager?",
        //choices: managers //variable created from managers array

    ])
}

const updateEmployee = () => {
    //need array of employees
    //SELECT employee.first_name, employee.last_name FROM employee;
    //need array of roles
    //SELECT employee.first_name, employee.last_name FROM employee;
    inquirer.prompt([
        {
            type: "list",
            name: "chooseEmployee",
            message: "Please select an Employee",
            choices: "employeeListArray"
        }

        //select new role

        .then((answers) =>{
            let sqlQuery = '';
            db.query(sqlQuery, answers.chooseEmployee,(error,response) =>{
                if (error) throw error;
                viewAllDepartments();
            })
        })

    ])
}