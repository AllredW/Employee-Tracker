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
    let choice = res.choice;
    // switch: responds to chosen option above
    switch (choice) {
        case "VIEW_EMPLOYEES":
          viewEmployees();
          break;
        case "ADD_EMPLOYEE":
          addEmployee();
          break;
        case "UPDATE_EMPLOYEE_ROLE":
          updateEmployeeRole();
          break;
        // case "VIEW_DEPARTMENTS":
        //   viewDepartments();
        //   break;
        // case "ADD_DEPARTMENT":
        //   addDepartment();
        //   break;
        // case "VIEW_ROLES":
        //   viewRoles();
        //   break;
        // case "ADD_ROLE":
        //   addRole();
        //   break;
        default:
          quit();
}
});
};

// ***View all employees
function viewEmployees() {
    db.findAllEmployees()
      .then(({ rows }) => {
        let employees = rows;
        console.log("\n");
        console.table(employees);
      })
      .then(() => loadMainPrompts());
  }

  // ***Add an employee
function addEmployee() {
    // PROMPT: Employee name
    prompt([
      {
        name: "first_name",
        message: "What is the employee's first name?",
      },
      {
        name: "last_name",
        message: "What is the employee's last name?",
      },
    ]).then((res) => {
      let firstName = res.first_name;
      let lastName = res.last_name;
  
// PROMPT: choose new employee's role
      db.findAllRoles().then(({ rows }) => {
        let roles = rows;
        const roleChoices = roles.map(({ id, title }) => ({
          name: title,
          value: id,
        }));
  
        prompt({
          type: "list",
          name: "roleId",
          message: "What is the employee's role?",
          choices: roleChoices,
        }).then((res) => {
          let roleId = res.roleId;
//   PROMPT: assign manager to new employee
          db.findAllEmployees().then(({ rows }) => {
            let employees = rows;
            const managerChoices = employees.map(
              ({ id, first_name, last_name }) => ({
                name: `${first_name} ${last_name}`,
                value: id,
              })
            );
  
            managerChoices.unshift({ name: "None", value: null });
  
            prompt({
              type: "list",
              name: "managerId",
              message: "Who is the employee's manager?",
              choices: managerChoices,
            }) //add and render new employee to database
              .then((res) => {
                let employee = {
                  manager_id: res.managerId,
                  role_id: roleId,
                  first_name: firstName,
                  last_name: lastName,
                };
  
                db.createEmployee(employee);
              })
              .then(() =>
                console.log(`Added ${firstName} ${lastName} to the database`)
              )
              .then(() => loadMainPrompts());
          });
        });
      });
    });
  }

// ***Update an employee's role
function updateEmployeeRole() {
    // PROMPT: select an employee
    db.findAllEmployees().then(({ rows }) => {
      let employees = rows;
      const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
        name: `${first_name} ${last_name}`,
        value: id,
      }));
  
      prompt([
        {
          type: "list",
          name: "employeeId",
          message: "Which employee's role do you want to update?",
          choices: employeeChoices,
        },
      ]).then((res) => {
        // PROMPT: assign a new role to employee
        let employeeId = res.employeeId;
        db.findAllRoles().then(({ rows }) => {
          let roles = rows;
          const roleChoices = roles.map(({ id, title }) => ({
            name: title,
            value: id,
          }));
  
          prompt([
            {
              type: "list",
              name: "roleId",
              message:
                "Which role do you want to assign to the selected employee?",
              choices: roleChoices,
            },
          ])
            .then((res) => db.updateEmployeeRole(employeeId, res.roleId))
            .then(() => console.log("Updated employee's role."))
            .then(() => loadMainPrompts());
        });
      });
    });
  }

  // Exit the application
function quit() {
    console.log("Thank you for coming to Sacred Heart!");
    process.exit();
  }