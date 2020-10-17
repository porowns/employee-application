const { v4: uuidv4 } = require('uuid');
const moment = require('moment'); 
const joke = require('../utils/joke');
const quote = require('../utils/quote');

const db = require('../db/database');
const database = db.connect()

var DATE_FORMAT = "YYYY-MM-DD"

/*
Employee schema for the database 
*/
class Employee {
    constructor () { }

    async init(firstName, lastName, hireDate, role) {
        this._id = uuidv4()
        this.firstName = Employee.validatefirstName(firstName)
        this.lastName = Employee.validateLastName(lastName)
        this.hireDate = Employee.validateHireDate(hireDate)
        this.role = Employee.validateRole(role)
        this.favoriteJoke = await joke.getJoke();
        this.favoriteQuote = await quote.getQuote();
        return this
    }

    static validatefirstName = (firstName) => {
        if (typeof firstName === 'string') {
            return firstName
        }
        else {
            throw new Error("First name must be a string")
        }
    }

    static validateLastName = (lastName) => {
        if (typeof lastName === 'string') {
            return lastName
        }
        else {
            throw new Error("Last name must be a string")
        }
    }

    static validateHireDate = (hireDate) => {
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

    static validateRole = (role) => {
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
    database['users'][employee._id] = employee
    database['roles'][role]['users'].push(employee._id)
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
    delete database['users'][_id]
    return employee
}

/*
Update a user in the database with the supplied _id and parameters.
Returns null if not found
*/
const updateEmployee = async (_id, fields) => {
    const employee = await getEmployee(_id)
    if (!employee) {
        return null
    }
    Object.keys(fields).forEach((field) => database['users'][_id][field] = fields[field])
    return await getEmployee(_id)
}

module.exports = {Employee, getEmployees, getEmployee, addEmployee, removeEmployee, updateEmployee}