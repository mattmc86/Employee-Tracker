const inquirer = require('inquirer');
// require mysql2
// require table console, not sure where yet


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
        if (choices === 'Exit'){
            //close app TODO
        }


    })
}

//functions for each choice


