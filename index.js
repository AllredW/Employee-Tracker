// module links
const { prompt } = require("inquirer");
const db = require("./db");

init();

function init() {
    console.log("Welcome to Sacred Heart Hospital");
  
    loadMainPrompts();
  }
// Options menu
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
        case "VIEW_DEPARTMENTS":
          viewDepartments();
          break;
        case "ADD_DEPARTMENT":
          addDepartment();
          break;
        case "VIEW_ROLES":
          viewRoles();
          break;
        case "ADD_ROLE":
          addRole();
          break;
        default:
          quit();
}
});
};

// ------Response functions, functions with "db.-" prefix are pulled from db/index.js -------------

// >>>EMPLOYEES FUNCTIONS
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

// >>> ROLES FUNCTIONS
// *** View all roles
function viewRoles() {
    db.findAllRoles()
      .then(({ rows }) => {
        let roles = rows;
        console.log("\n");
        console.table(roles);
      })
      .then(() => loadMainPrompts());
  }

// ***Add a role
function addRole() {
    // PROMPTS: name role, assign salary value, assign to department
    db.findAllDepartments().then(({ rows }) => {
      let departments = rows;
      const departmentChoices = departments.map(({ id, name }) => ({
        name: name,
        value: id,
      }));
  
      prompt([
        {
          name: "title",
          message: "What is the name of the role?",
        },
        {
          name: "salary",
          message: "What is the salary of the role?",
        },
        {
          type: "list",
          name: "department_id",
          message: "Which department does the role belong to?",
          choices: departmentChoices,
        },
        // render to database
      ]).then((role) => {
        db.createRole(role)
          .then(() => console.log(`Added ${role.title} to the database`))
          .then(() => loadMainPrompts());
      });
    });
  }

// >>> DEPARTMENT FUNCTIONS
// ***View all deparments
function viewDepartments() {
    db.findAllDepartments()
      .then(({ rows }) => {
        let departments = rows;
        console.log("\n");
        console.table(departments);
      })
      .then(() => loadMainPrompts());
  }

// ***Add a department
function addDepartment() {
    prompt([
      {
        name: "name",
        message: "What is the name of the department?",
      },
    ]).then((res) => {
      let name = res;
      db.createDepartment(name)
        .then(() => console.log(`Added ${name.name} to the database`))
        .catch((err) => console.log(err));
    })
    .then(() => {
      console.log("this is working");
      loadMainPrompts()
    });
  }

  // Exit the application
function quit() {
    console.log("Thank you for coming to Sacred Heart!");
    process.exit();
  }