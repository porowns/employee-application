const { v4: uuidv4 } = require('uuid');
const moment = require('moment'); 
const joke = require('../utils/joke');
const quote = require('../utils/quote');

const db = require('../db/database');
const database = db.connect()

var DATE_FORMAT = "YYYY-MM-DD" /* Normally would use dotenv */ 

/*
Employee schema for the database 
*/
class Employee {
    constructor () { }
    async init(firstName, lastName, hireDate, role) {
        this._id = uuidv4()
        this.firstName = Employee.validateFirstName(firstName)
        this.lastName = Employee.validateLastName(lastName)
        this.hireDate = Employee.validateHireDate(hireDate)
        this.role = Employee.validateRole(role)
        this.favoriteJoke = await joke.getJoke();
        this.favoriteQuote = await quote.getQuote();
        return this
    }
    /* Save to DB */
    save() {
        this.isValid()
        database['users'][this._id] = this 
        database['roles'][this.role].addEmployee(this._id)
    }
    /* Remove from DB */
    remove() {
        delete database['users'][this._id] 
        database['roles'][this.role].removeEmployee(this._id)
    }
    /*
    Makes sure everything is valid, used when updating lazily.
    */
   isValid() {
       Employee.validateFirstName(this.firstName)
       Employee.validateLastName(this.lastName)
       Employee.validateHireDate(this.hireDate)
       Employee.validateRole(this.role)
   }
    /* 
    Validates first name. Requirements:
        - String
    */ 
    static validateFirstName (firstName) {
        if (typeof firstName === 'string') {
            return firstName
        }
        else {
            throw new Error("First name must be a string")
        }
    }
    /* 
    Validates last name. Requirements:
        - String
    */ 
    static validateLastName (lastName) {
        if (typeof lastName === 'string') {
            return lastName
        }
        else {
            throw new Error("Last name must be a string")
        }
    }

    /* 
    Validates hire date. Requirements:
        - Format 'YYYY-MM-DD'
        - Date is in the past
    */ 
    static validateHireDate (hireDate) {
        if (typeof hireDate === 'string') {
            const isValidHireDate = moment(hireDate, DATE_FORMAT).isValid();
            const hireDateInPast = moment(hireDate, DATE_FORMAT).isBefore(moment())
            if (!isValidHireDate) {
                throw new Error("Hire date must be in format: " + DATE_FORMAT)
            }
    
            if (!hireDateInPast) {
                throw new Error("Hire date must be in the past")
            }
            return hireDate;
        }
        else {
            throw new Error("Hire date must be a string")
        }
    }

    /* 
    Validates role. Requirements:
        - Role exists in DB (CEO, VP, MANAGER, LACKEY)
        - Validates when adding unique roles (e.g only 1 CEO)
    */ 
    static validateRole (role) {
        const roleObject = db.getRole(role)

        if (!roleObject) {
            throw new Error("Role must be one of the following: " + Object.keys(db.getRoles()))
        }

        if (roleObject.unique === true && roleObject.users.length > 0) {
            throw new Error("There can only be one employee of role: " + roleObject.name)
        }
        return role
    }
}

/*
Get a single employee by _id
Returns null if no employee found
*/
const getEmployee = async(_id) => {
    if (Object.keys(database['users']).includes(_id)) {
        return database['users'][_id]
    }
    else {
        return null 
    }
    
}
/*
Get all users from the database.
Fetches all users if _id is null. Returns null if not found.
*/
const getEmployees = async () => {
    return database['users']
}

/*
Add a user to the database with the supplied parameters.
*/
const addEmployee = async ({firstName, lastName, hireDate, role}) => {
    const employee = await new Employee().init(firstName, lastName, hireDate, role)
    employee.save()
    return employee
}

/*
Remove a user from the database with the supplied _id.
*/
const removeEmployee = async (_id) => {
    const employee = await getEmployee(_id)
    if (!employee) {
        return null
    }
    employee.remove()
    return employee
}

/*
Update a user in the database with the supplied _id and parameters.
Returns null if not found
*/
const updateEmployee = async (_id, fields) => {
    const oldEmployee = await getEmployee(_id)
    if (!oldEmployee) {
        return null
    }
    
    Object.keys(fields).forEach((field) => oldEmployee[field] = fields[field])
    database['roles'][oldEmployee.role].removeEmployee(oldEmployee._id)
    oldEmployee.save()
    
    return await getEmployee(_id)
    
}

module.exports = {Employee, getEmployees, getEmployee, addEmployee, removeEmployee, updateEmployee}