var mysql = require('mysql');
var conexion = mysql.createConnection(
		{
			host:'localhost',
			port:'3306',
			user:'Hita',
			password:'123456',
			database: 'cineris'
		});

conexion.connect(function (error){
	if (error) {
		console.log('Problemas de conexion con mysql');
		throw error;
	}
});

module.exports = conexion;