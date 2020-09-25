var express = require('express');
var router = express.Router();

var mysql = require('mysql');
var conexion = require('../database/database-connection');


router.get('/', function(req, res, next) {
	var poseeTarjeta = false;
	if(req.session.user && req.session.tarjeta) {
		poseeTarjeta = true;
	}
	res.render('tarjeta', {tarjeta: poseeTarjeta, puntos: req.session.tarjeta, user: req.session.user, logueado: req.session.user});
});

router.get('/adquirir', function(req, res, next) {
	if(req.session.user) {
		const points = Math.random()*1000;
		conexion.query(
				'update usuario set points='+points+' where name=\''+req.session.user+'\'',
				function (error, filas){
					if (error){ 
						console.log(error);
						return; 
					}
					
			});
		req.session.tarjeta = parseInt(points);
		res.write("ADQUIRIDA");
		res.end();
	} else if(!req.session.user) {
		res.write("LOGUEATE");
		res.end();
	}
});

module.exports = router;