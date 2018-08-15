const express = require('express');
const router = express.Router();
const CG = require('./CG');
const DB = require('./DB');
const connection = CG;

router.appUserModel = connection.model('AppUser', DB.AppUserSchema);
router.shiftModel = connection.model('Shift', DB.ShiftSchema);


module.exports = router;