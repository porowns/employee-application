const { Role } = require('../models/role');
const role = require('../models/role')
var DATABASE = {
    "users": {},
    "roles": {
      "CEO": new Role("CEO", unique=true), /* CEO can only have 1 employee */ 
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

  /* Get all roles */
  const getRoles = () => {
    return DATABASE['roles']
  }

  /* Get an individual role */
  const getRole = (name) => {
    if (Object.keys(DATABASE['roles']).includes(name)) {
      return DATABASE['roles'][name]
    }
    else {
      return null 
    }
  }

  module.exports = {connect, getRole, getRoles}