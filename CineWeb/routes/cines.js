var express = require('express');
var router = express.Router();
var cines = require('../models/cine');
const Cine = cines.Cine;

var array_cines = [new Cine("cine-1.jpg", "El Tiro", 500, "C/Los Frailes nº2", 968752312, 5, 7, 6), new Cine("cine-2.jpg", "Thader", 800, "C/Gran vía nº23", 868967043, 5.5, 7.5, 9)];

router.get('/', function(req, res, next) {

	res.render('cines', { cines: array_cines, logueado: req.session.user});
});

module.exports = router;