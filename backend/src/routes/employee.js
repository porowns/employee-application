const express = require('express');
const employee = require('../models/employee');
const database = require('../db/database')
'use strict';

const router = express.Router();

/* GET employees listing. */
router.get('', async (req, res) => {
  const employees = await employee.getEmployees();
  return res.send(employees)
});

/* GET individual employee. */
router.get('/:id', async (req, res) => {
  const employeeObject = await employee.getEmployee(req.params.id, true)

  if (!employeeObject) {
    return res.status(404).send()
  }

  return res.send(employeeObject)
});

/* POST create employee. */
router.post('', async (req, res) => {
  const requiredFields = ['firstName', 'lastName', 'hireDate', 'role']
  const fields = Object.keys(req.body)

  const isValidFields = requiredFields.every((field) => { return fields.includes(field)})

  if (!isValidFields) {
    return res.status(400).send("Required fields: " + requiredFields)
  }

  try {
    const newEmployee = await employee.addEmployee(req.body)
    return res.status(200).send(newEmployee)
  } catch (e) {
    return res.status(400).send(e.toString())
  }
  
})

/* PATCH update employee. */
router.patch('/:id', async (req, res) => {
  const _id = req.params.id
  const validFields = ['firstName', 'lastName', 'hireDate', 'role']
  const fields = Object.keys(req.body)
  const isValidRequest = fields.every((field) => { return validFields.includes(field)})
  if (!isValidRequest) {
    return res.status(400).send("Only the following fields are allowed: " + validFields)
  }

  try {
    const updatedEmployee = await employee.updateEmployee(_id, req.body)
    if (!updatedEmployee) {
      return res.status(404).send()
    }
  
    return res.send(updatedEmployee)
  } catch (e) {
    return res.status(400).send(e.toString())
  }
  
})

/* DELETE remove employee */
router.delete('/:id', async (req, res) => {
  const deletedEmployee = await employee.removeEmployee(req.params.id)

  if (!deletedEmployee) {
    return res.status(404).send()
  }
  return res.send(deletedEmployee)
})

module.exports = router;
