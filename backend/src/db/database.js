const { Role } = require('../models/role');
const role = require('../models/role')
var DATABASE = {
    "users": {},
    "roles": {
      "CEO": new Role("CEO", unique=true),
      "VP": new Role("VP", unique=false),
      "MANAGER": new Role("MANAGER", unique=false),
      "LACKEY": new Role("MANAGER", unique=false)
    }
  };

  const connect = () => {
      return DATABASE
  }

  /*
  Just going to put these here since we will never be interacting with
  role objects outside of getting them.
  */
  const getRoles = () => {
    return DATABASE['roles']
  }

  const getRole = (name) => {
    if (Object.keys(DATABASE['roles']).includes(name)) {
      return DATABASE['roles'][name]
    }
    else {
      return null 
    }
  }

  module.exports = {connect, getRole, getRoles}