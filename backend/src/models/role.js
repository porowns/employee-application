const db = require('../db/database')
class Role {
    constructor(name, unique) {
        this.name = name 
        this.unique = unique 
        this.users = [] 
    }

    addEmployee(_id) {
        this.users.push(_id)
    }

    removeEmployee(_id) {
        this.users = this.users.filter((id) => id != _id)
    }
}

module.exports = { Role }