var express = require('express');
var router = express.Router();
var dbRepo = require('../DBRepo');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {title: 'Express'});
});

function test() {
  var data = {};
  data.name = 'test Name';
  data.surname = 'test Surname';
  data.email = "email-email.com";
  data.password = "test";
  var p = new dbRepo.appUserModel(data);
  p.save((err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
    }
  });
}
// test();

module.exports = router;
