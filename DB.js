const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

router.AppUserSchema = new Schema({
  firstname: {
    type: String,
    reqire: true,
    trim: true
  },
  lastname: {
    type: String,
    reqire: true,
    trim: true
  },
  email: {
    type: String,
    reqire: true,
    trim: true
  },

  idnumber: {
    type: String,
    reqire: true,
    trim: true
  },
  nurseidnumber: {
    type: String,
    reqire: true,
    trim: true
  },
  password: {
    type: String,
    reqire: true,
    trim: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date,
    default: Date.now
  }
});

router.ShiftSchema = new Schema({

});

module.exports = router;
