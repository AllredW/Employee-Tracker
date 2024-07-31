// module links
const { prompt } = require("inquirer");
const db = require("./db");

init();
loadMainPrompts();

function init() {
    console.log("Welcome to Sacred Heart Hospital");
  
    loadMainPrompts();
  }

function loadMainPrompts() {
    prompt([
      {
        type: "list",
        name: "choice",
        message: "What would you like to do?",
        choices: [
          {
            name: "View All Employees",
            value: "VIEW_EMPLOYEES",
          },
          {
            name: "Add Employee",
            value: "ADD_EMPLOYEE",
          },
          {
            name: "Update Employee Role",
            value: "UPDATE_EMPLOYEE_ROLE",
          },
          {
            name: "View All Roles",
            value: "VIEW_ROLES",
          },
          {
            name: "Add Role",
            value: "ADD_ROLE",
          },
          {
            name: "View All Departments",
            value: "VIEW_DEPARTMENTS",
          },
          {
            name: "Add Department",
            value: "ADD_DEPARTMENT",
          },
          {
            name: "Quit",
            value: "QUIT",
          },
        ],
      },
    ])
.then((res) => {
    // switch: responds to chosen option above
    switch (choice) {
        case "VIEW_EMPLOYEES":
          viewEmployees();
          break;
        // case "ADD_EMPLOYEE":
        //   addEmployee();
        //   break;
        // case "UPDATE_EMPLOYEE_ROLE":
        //   updateEmployeeRole();
        //   break;
        case "VIEW_DEPARTMENTS":
          viewDepartments();
          break;
        // case "ADD_DEPARTMENT":
        //   addDepartment();
        //   break;
        case "VIEW_ROLES":
          viewRoles();
          break;
        // case "ADD_ROLE":
        //   addRole();
        //   break;
        default:
          quit();
}
});
};
