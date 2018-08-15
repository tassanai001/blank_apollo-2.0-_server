const express = require('express');
const router = express.Router();
const moment = require('moment');
const jwt = require('jsonwebtoken');
const md5 = require('md5');
const dbRepo = require('../../DBRepo');

const query = dbRepo.appUserModel;

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
