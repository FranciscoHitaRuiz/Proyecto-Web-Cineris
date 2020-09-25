var express = require('express');
var router = express.Router();

/* GET home page. */

const peliculas = [{id: "4286"}, {id: "4264"}, {id: "4497"}, {id: "4523"}, {id: "4529"}];

router.get('/', function(req, res, next) {
  res.render('index', {logueado: req.session.user, "peliculas": peliculas});
});

module.exports = router;
