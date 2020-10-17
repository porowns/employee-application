const db = require('../db/database')
class Role {
    constructor(name, unique) {
        this.name = name 
        this.unique = unique 
        this.users = [] 
    }
}

module.exports = { Role }