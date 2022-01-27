//install npm i dotenv
//require('dotenv').config()

//create env File
// add passwords username to file as variables
//e.g. PASSWORD = MattmcSQL
//console.log(process.env.PASSWORD)
//host: 'localhost',
      // MySQL username,
   //   user: 'root',
      // MySQL password
   ///   password: process.env.PASSWORD,
   //   database: 'employees'

require('dotenv').config()
const inquirer = require('inquirer');
const mysql = require('mysql2');
//const consoleTable = require('console.table');
const db = mysql.createConnection(
    {
      host: 'localhost',
      port: 3306,
      // MySQL username,
      user: 'root',
      // MySQL password
      password: 'MattmcSQL',
      database: 'employees'
    },
    console.log(`Connected to the employees database.`)
  );

    db.connect((error) =>{
        if (error) throw error;
        console.log(`connected as id ${db.threadId}`);
    })

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
                'Update an Employee Role',
                'Exit'
            ]
        }
    ])
    .then((answers) =>{
        const {choices} = answers;
        //if statements for each choice which will call a function


        // switch(answers.choices) {

        //     case "viwe all departments":


        //     case "exit":
        //         db.end();
        //         break;
        // }


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
        if (choices === 'Update an Employee Role'){
            updateEmployee();
        }
        if (choices === 'Exit'){
            db.end();
        }

    })
}

//functions for each choice

const viewAllDepartments = () =>{
    let sqlQuery = `SELECT department.id, department.department_name
                 FROM department;`
    db.query(sqlQuery,(error,response)=>{
  
        if (error) throw error;
        console.table(response);
        promptUser();
    })
    
}

const viewAllRoles= () =>{
    let sqlQuery = `select role.id, role.title, role.salary, department.department_name
    from role, department
    where role.department_id = department.id;`
    db.query(sqlQuery,(error,response)=>{
    
        if (error) throw error;
        console.table(response);
        promptUser();
    })
    
}

const viewAllEmployees= () =>{
    let sqlQuery = `select employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.department_name,
    employee.manager
    from employee, role, department
    where role.department_id = department.id
    and employee.role_id = role.id;`
    db.query(sqlQuery,(error,response)=>{        
    
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
        let sqlQuery = `INSERT INTO department (department_name) VALUE ("${answer.newDepartment}");`;
        db.query(sqlQuery,(error,response) =>{
            if (error) throw error;
            viewAllDepartments();
        })
    })
}

const addRole =()=>{
    db.query("SELECT * FROM department;",(error, response) => {
        if (error) throw error;
        inquirer
        .prompt([
            {
            type: "input",
            name: "title",
            message: "What is the name of the new role?"
            //validate if left blank 
            },
            {
            type: "input",
            name: "salary",
            message: "What is the salary for the new role?"
            //validate if left blank
            },
            {
            type:"list",
            name: "department_id",
            
            choices() {
               return response.map(({ id, department_name }) => {
                    return { name: department_name, value: id } 
               
                });
            } ,
            message: "Which department will the role be part of?",         
            },
        ])
        .then((answers) =>{
            console.log(answers.department_id)
            db.query("INSERT INTO role SET ?",
            answers,(error, response)=>{
                if (error) throw error;
                console.log(`${answers.title}`)
                viewAllRoles();
            })
        })
    })
}

const addEmployee =()=>{
    db.query("SELECT * FROM role;",(error, response) => {
        if (error) throw error;
        inquirer
        .prompt([
            {
            type: 'input',
            name: 'first_name',
            message: 'Please enter employees first name'
            //validate if left blank 
            },
            {
            type: 'input',
            name: 'last_name',
            message: 'Please enter employees last name'                    
            //validate if left blank
            },
            {
            type:"list",
            name: "role_id",
            
            choices() {
               return response.map(({ id, title }) => {
                    return { name: title, value: id } 
               
                });
            } ,
            message: "What role will the employee have?",         
            },
            {
            type: 'input',
            name: 'manager',
            message: 'please enter the managers name?'
            }
        ])
        .then((answers) =>{
            console.log(answers.role_id)
            db.query("INSERT INTO employee SET ?",
            answers,(error, response)=>{
                if (error) throw error;
                console.log(`${answers.title}`)
                viewAllEmployees();
            })
        })
    })
}

const updateEmployee = () => {
    db.query("SELECT employee.first_name, employee.last_name, employee.id, role.title, role.id FROM employee LEFT JOIN role ON employee.id=role.id;",
    (error, response) => {
        if (error) throw error;
        inquirer
        .prompt([
            {
            type:"list",
            name: "employee",       
            choices() {
               return response.map(({ first_name, last_name, id}) => {
                    return { name: first_name + " " + last_name, value: id } 
               
                });
            } ,
            message: "What role will the employee have?",         
            },
            {
            type: 'list',
            name: 'role',
            choices() {
                return response.map(({id, title})=>{
                    return { name: title, value: id }
                })
            },
            message: 'please select the new role for this Employee?'
            }
        ])
        .then((answers) =>{
            //console.log(answers.role_id)
            db.query("UPDATE employee SET ? WHERE ?",
            [
                {
                    role_id: answers.role,
                },
                {
                    id: answers.employee,
                },
            ],
            function (error, response){
                if (error) throw error;
                console.log(`${answers.employee} has been updated`);
                viewAllEmployees();
            })         
        })
    })
}
(async () => {await promptUser()})()

