var express = require('express');
var router = express.Router();
var cines = require('../models/cine');
var CineRes = cines.CineRes;
var peliculas = require('../models/pelicula');
var PeliculaPreview = peliculas.PeliculaPreview;

//Sesiones

const sesion1 = ["16:00", "17:30", "19:00"];
const sesion2 = ["15:30", "18:00", "20:00"];
const sesion3 = ["19:00", "21:30", "00:00"];
const sesion4 = ["18:00", "20:30", "23:00"];
const sesion5 = ["17:00", "17:45", "21:00"];

let sesiones = [sesion1, sesion2, sesion3, sesion4, sesion5];

//Películas

const peli_1 = new PeliculaPreview(1, "The King's Man: La primera misión", sesion1, "120 minutos");
const peli_2 = new PeliculaPreview(2, "Candyman", sesion2, "101 minutos");
const peli_3 = new PeliculaPreview(3, "Tenet", sesion3, "120 minutos");
const peli_4 = new PeliculaPreview(4, "Way Down", sesion4, "97 minutos");

var array_pelis = [peli_1, peli_2, peli_3, peli_4];

//Fechas de la semana

var semana = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

var today = new Date();
var aux = new Date(today);
var fechas = [];
aux.setDate(aux.getDate()-1);
for(let i = 0; i < semana.length; i++) {
	aux.setDate(aux.getDate()+1);
	fechas[i] = semana[aux.getDay()]+' - '+(aux.getDate())+'/'+(aux.getMonth()+1)+'/'+aux.getFullYear();
}


let actual = -1; //Indica la sesión a asignar

function sig(n) {
	if(actual != n-1) {
		actual++;
	} else actual = 0;
	return actual;
}

// Programación semanal

var programacion = [];


for(let i = 0; i < fechas.length; i++) {
	let pelis_dia = [];
	for(let j = 0; j < array_pelis.length; j++) {
		pelis_dia[j] = peliculas.previewFromPreview(array_pelis[j], sesiones[sig(sesiones.length)]);
	}
	programacion[fechas[i]] = pelis_dia;
}

// Cines

var array_cines = [new CineRes(1, "Thader"), new CineRes(2, "El Tiro"), new CineRes(1, "Thader"), new CineRes(2, "El Tiro"), new CineRes(1, "Thader")];


router.get('/', function(req, res, next) {
	res.render('previa-cartelera', {"cines": array_cines, logueado: req.session.user});
});

router.get('/:id', function(req, res, next) {
	const id = req.params.id;
	res.render('cartelera', { "cine": array_cines[id-1].nombre,fechasWeb: Object.keys(programacion), pelis: programacion[fechas[0]], logueado: req.session.user});
});

router.get('/:id/:index', function(req, res, next) {
	const id = req.params.id;
	const index = req.params.index;
	res.render('cartelera-lista-pelis', {pelis: programacion[fechas[index]], layout: false});	
});

module.exports = router;