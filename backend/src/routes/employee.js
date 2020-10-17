const employee = require('../models/employee')

'use strict';

const express = require('express');
const router = express.Router();

const DATABASE = {};

/* GET employees listing. */
router.get('', function(req, res) {
  return res.send(DATABASE);
});

router.get('/:id', function(req, res) {
  const _id = req.params.id
  const isValidEmployee = _id in DATABASE

  if (!isValidEmployee) {
    res.status(404).send()
  }

  res.send(DATABASE[_id])
});


router.post('', async (req, res) => {
  const requiredFields = ['firstName', 'lastName', 'hireDate', 'role']
  const fields = Object.keys(req.body)

  const isValidFields = requiredFields.every((field) => { return fields.includes(field)})

  if (!isValidFields) {
    return res.status(400).send("Required fields: " + requiredFields)
  }

  try {
    const newEmployee = await employee.getEmployeeObject(req.body)
    DATABASE[newEmployee._id] = newEmployee
    return res.status(200).send(newEmployee)
  } catch (e) {
    return res.status(400).send(e.toString())
  }
  
})

router.patch('/:id', async (req, res) => {
  const _id = req.params.id
  const validFields = ['firstName', 'lastName', 'hireDate', 'role']
  const fields = Object.keys(req.body)
  const isValidRequest = fields.every((field) => { return validFields.includes(field)})
  const isValidEmployee = _id in DATABASE

  if (!isValidRequest) {
    res.status(400).send("Only the following fields are allowed: " + validFields)
  }

  if (!isValidEmployee) {
    res.status(404).send()
  }

  fields.forEach((field) => DATABASE[_id][field] = req.body[field])

  res.send(DATABASE[_id])
})

router.delete('/:id', async (req, res) => {
  const _id = req.params.id
  const isValidEmployee = _id in DATABASE

  if (!isValidEmployee) {
    res.status(404).send()
  }

  delete DATABASE[_id]
  res.send(204)
})

module.exports = router;
