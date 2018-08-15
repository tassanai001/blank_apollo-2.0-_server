const express = require('express');
const router = express.Router();
const appUser = require('./model/appuser');

router.context = async (headers, secrets) => {
  const user = await appUser.getMe(headers, secrets);
  return {
    headers,
    secrets,
    user,
  };
}

module.exports = router;
