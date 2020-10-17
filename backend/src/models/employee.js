const { v4: uuidv4 } = require('uuid');
const moment = require('moment'); 
const joke = require('../utils/joke');
const quote = require('../utils/quote');

var DATE_FORMAT = "YYYY-MM-DD"
var ROLES = ['CEO', 'VP', 'MANAGER', 'LACKEY']

var getEmployeeObject = async ({ firstName, lastName, hireDate, role }) => {
    const isValidHireDate = moment(hireDate, DATE_FORMAT).isValid();
    const hireDateInPast = moment(hireDate, DATE_FORMAT).isBefore(moment())
    const isValidRole = ROLES.includes(role)

    if (!isValidHireDate) {
        throw new Error("Hire date must be in format: " + DATE_FORMAT)
    }

    if (!hireDateInPast) {
        throw new Error("Hire date must be in the past")
    }

    if (!isValidRole) {
        throw new Error("Role must be one of the following: " + ROLES)
    }

    favoriteJoke = await joke.getJoke();
    favoriteQuote = await quote.getQuote();

    const employee = {
        "_id": uuidv4(),
        "firstName": firstName, 
        "lastName": lastName,
        "hireDate": hireDate, 
        "role": role, 
        "favoriteJoke": favoriteJoke,
        "favoriteQuote": favoriteQuote,
    }
    
    return employee
}

module.exports = { getEmployeeObject }