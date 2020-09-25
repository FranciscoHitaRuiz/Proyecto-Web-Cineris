const express = require('express');
const router = express.Router();
var mysql = require('mysql');
var conexion = require('../database/database-connection');

const register = function(peticion, respuesta) {
	var existe = false;
	var user = peticion.body.userReg;
	var pass = peticion.body.passwordReg;
	var datosregistro = { name: user, password: pass};
	//Primero comprobamos que el usuario no exista ya
	conexion.query('select name from usuario where name=\''+user+'\'',
	function (error, filas){
		if (error){ 
			console.log(error);
			return; 
		}
		console.log(filas);
		if(filas.length == 0) {
				conexion.query('insert into usuario set ?',
						datosregistro,	
						function (error, resultado){
							if (error){
								console.log(error);
								return; 
							}
							respuesta.write("REGISTRADO");
							respuesta.end();
						});	
		} else {
			respuesta.write("DUPLICADO");
			respuesta.end();
		}
		
	});		
}

function existeUsuario(req, res) {
	var user = req.query.userReg;
	conexion.query('select name from usuario where name=\''+user+'\'',
	function (error, filas){
		if (error){ 
			console.log(error);
			return; 
		}
		if(filas.length > 0) {
			res.write("DUPLICADO");
			res.end();
		} else {
			res.write("LIBRE");
			res.end();
		}
	})
}


router.route('/')
	.get(function(req, res, next) {
			if(req.query.userReg) {
				existeUsuario(req, res);
			}
			else res.render('login', {inicio_tab: "no-activo-tab", registro_tab: "activo-tab", inicio_contenido: "no-activo-contenido", registro_contenido: "activo-contenido"});
	})
	.post(register);


module.exports = router;