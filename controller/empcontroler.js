const response = require('express');
const Employee = require('../models/employee');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const index = (req, res, next) => {
  Employee.find()
    .then((response) => {
      res.json({
        response,
      });
    })
    .catch((error) => {
      res.json({
        message: 'An Error Occured!',
      });
    });
};

const show = (req, res, next) => {
  let employeeID = req.body.employeeID;
  Employee.findById(employeeID)
    .then((response) => {
      res.json({
        response,
      });
    })
    .catch((error) => {
      res.json({
        message: 'An error occured',
      });
    });
};

const store = async (req, res, next) => {
  let hasPassword = await bcrypt.hash(req.body.password, 10);
  let employee = new Employee({
    name: req.body.name,
    age: req.body.age,
    mobileno: req.body.mobileno,
    email: req.body.email,
    password: hasPassword,
  });
  console.log(employee);
  employee
    .save()
    .then((response) => {
      res.json({ message: 'Employee Add Succesfully' });
    })
    .catch((error) => {
      res.json({
        message: 'An Error occured',
      });
    });
};

const update = (req, res, next) => {
  let employeeID = req.body.employeeID;

  let updateData = {
    name: req.body.name,
    age: req.body.age,
    mobileno: req.body.mobileno,
    email: req.body.email,
    password: req.body.password,
  };

  Employee.findByIdAndUpdate(employeeID, { $set: updateData })
    .then(() => {
      res.json({
        message: 'Employee updated Successfully',
      });
    })
    .catch((error) => {
      res.json({
        message: 'An error Occured',
      });
    });
};

const destroy = (req, res, next) => {
  let employeeID = req.body.employeeID;
  Employee.findByIdAndRemove(employeeID)
    .then(() => {
      req.json({
        message: 'Employee Deleted Succesully',
      });
    })
    .catch((error) => {
      req.json({
        message: 'An Error Occured',
      });
    });
};

const login = (req, res, next) => {
  var email = req.body.email;
  var password = req.body.password;
  Employee.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length < 1) {
        res.status(404).json({
          message: 'Auth Failed',
        });
      } else {
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
          if (!result) {
            res.status(404).json({
              message: 'Auth Failed',
            });
          }
          if (result) {
            const token = jwt.sign(
              {
                email: user[0].email,
              },
              'this is dummy key',
              {
                expiresIn: '24h',
              }
            );
            res.status(200).json({
              message: 'you are log in',
            });
          } else {
            res.status(404).json({
              message: 'Auth Failed',
            });
          }
        });
      }
    })
    .catch((err) => {
      res.json({
        error: err,
      });
    });
};

module.exports = { index, show, store, update, destroy, login };
