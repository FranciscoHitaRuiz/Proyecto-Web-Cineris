var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var conexion = require('../database/database-connection');

const log = function (peticion, respuesta) {	
	var user = peticion.body.userLog;
	var password = peticion.body.passwordLog;
	conexion.query(
		'select name, password, points from usuario where name=\''+user+'\' and password=\''+password+'\'',
		function (error, filas){
			if (error){ 
				console.log(error);
				return; 
			}
			if(filas.length > 0) {
				peticion.session.user = user;
				peticion.session.tarjeta = filas[0].points;
				respuesta.write("LOGUEADO");
				respuesta.end();
			} else {
				respuesta.write("ERROR");
				respuesta.end();
			}
	});
}

router.route('/')
	.get(function(req, res, next) {	
		res.render('login', {inicio_tab: "activo-tab", registro_tab: "no-activo-tab", inicio_contenido: "activo-contenido", registro_contenido: "no-activo-contenido"});
	})
	.post(log);

module.exports = router;