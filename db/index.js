const pool = require('./connection');
// creates login profile to connect to sql server
class DB {
  constructor() {}

  async query(sql, args = []) {
    const client = await pool.connect();
    try {
      const result = await client.query(sql, args);
      return result;
    } finally {
      client.release();
    }
  }

  // Find all employees, join with roles and departments to display their roles, salaries, departments, and managers
  findAllEmployees() {
    return this.query(
      "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
    );
  }

    // Create a new employee
    createEmployee(employee) {
        const { first_name, last_name, role_id, manager_id } = employee;
        return this.query(
          'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)',
          [first_name, last_name, role_id, manager_id]
        );
      }

       // Update the given employee's role
  updateEmployeeRole(employeeId, roleId) {
    return this.query('UPDATE employee SET role_id = $1 WHERE id = $2', [
      roleId,
      employeeId,
    ]);
  }

//>>>    ROLES FUNCTIONS
// Find all roles, used with createEmployee, updateEmployeeRole
  findAllRoles() {
    return this.query(
      'SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;'
    );
  }

// Create a new role
    createRole(role) {
        const { title, salary, department_id } = role;
        return this.query(
          'INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)',
          [title, salary, department_id]
        );
      }

// >>> DEPARTMENTS FUNCTIONS
  // Find all departments
  findAllDepartments() {
    return this.query('SELECT department.id, department.name FROM department;');
  }

 // Create a new department
 createDepartment(department) {
    return this.query('INSERT INTO department (name) VALUES ($1)', [
      department.name,
    ]);
  }
}
module.exports = new DB();