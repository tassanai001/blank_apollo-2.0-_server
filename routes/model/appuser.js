const express = require('express');
const router = express.Router();
const moment = require('moment');
const jwt = require('jsonwebtoken');
const md5 = require('md5');
const dbRepo = require('../../DBRepo');

const query = dbRepo.appUserModel;
const { SECRET } = process.env;

router.login = async (param) => {
  const {  email, password } = param;

  const getUser = query.findOne({ email });
  let user = await Promise.resolve(getUser);

  if (!user) {
    throw new Error('Email not found');
  }

  const validPassword = md5(password);
  if (validPassword !== user.password) {
    throw new Error('Password is incorrect');
  }

  user.jwt = jwt.sign({ _id: user._id }, SECRET);
  return user;
}


// firstname: String!,
// lastname: String!,
// email: String!,
// idnumber: String!,
// nurseidnumber: String!,
// password: String!): TokenAppUser

router.signup = async (param) => {
  const { firstname, lastname, email, password, username, idnumber, nurseidnumber } = param;
  const existingUser = await query.findOne({ email });

  if (existingUser) {
    throw new Error('E-mail already used');
  }

  const newUser = await new dbRepo.appUserModel({
    firstname,
    lastname,
    email,
    username,
    idnumber,
    nurseidnumber,
    password: md5(password),
  });

  const user = await newUser.save();
  newUser.jwt = jwt.sign({ _id: user._id }, SECRET);

  return newUser;
}

router.getCurrent = async () => {
  const results = query.find();
  const response = await Promise.resolve(results);
  return response;
}

router.getMe = async (authorization, secrets) => {
  const bearerLength = "Bearer ".length;
  if (authorization && authorization.length > bearerLength) {
    const token = authorization.slice(bearerLength);
    const { ok, result } = await new Promise(resolve =>
      jwt.verify(token, secrets, (err, result) => {
        if (err) {
          resolve({
            ok: false,
            result: err
          });
        } else {
          resolve({
            ok: true,
            result
          });
        }
      }));

    if (ok) {
      const { _id } = result;
      const results = query.findOne({ _id });
      const response = await Promise.resolve(results);
      return response;
    } else {
      return null;
    }
  }
  return null;
}

module.exports = router;
