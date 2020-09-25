var express = require('express');
var router = express.Router();
var peliculas = require('../models/pelicula');
var Pelicula = peliculas.Pelicula;

const peli_1 = new Pelicula(1, "The King's Man: La primera misión", "https://www.youtube.com/embed/nVNhA3QZdfM", "Reino Unido - Estados Unidos", "Acción - Aventura - Comedia", "18/09/2020", "Matthew Vaughn", "Dave Gibbons, Jane Goldman, Mark Millar, Matthew Vaughn", "20th Century Fox, 20th Century Studios, Marv Films", "Aaron Taylor-johnson, Gemma Arterton, Harris Dickinson, Harris Dickinson, Ralph Fiennes, Gemma Arterton, Rhys Ifans, Matthew Goode, Tom Hollander, Daniel Brühl, Djimon Hounsou, Charles Dance, Matthew Goode, Ralph Fiennes, Tom Hollander", "120 minutos", "Cuando un grupo formado por los tiranos y las mentes criminales más malvadas de la historia se une para desencadenar una guerra que matará a millones de personas, un hombre tendrá que luchar a contrarreloj para detenerlos. Descubre los orígenes de la primera agencia de inteligencia independiente en The King’s Man: La Primera Misión, una película dirigida por Matthew Vaughn que se estrenará el 14 de febrero. THE KING’S MAN: LA PRIMERA MISIÓN llegará a los cines el 14 de febrero.");
const peli_2 = new Pelicula(2, "Candyman", "https://www.youtube.com/embed/tlwzuZ9kOQU", "Estados Unidos", "Terror - Suspense", "12/06/2020", "Nia Dacosta", "Clive Barker, Jordan Peele, Win Rosenfeld", "Universal Pictures International", "Cassie Kramer, Colman Domingo, Nathan Stewart-jarrett, Teyonah Parris, Tony Todd, Yahya Abdul-mateen Ii", "101 minutos", "Cabrini Green, el mismo vecindario donde comenzó la leyenda, es ahora un barrio de Chicago gentrificado. Una década después de que la última torre de Cabrini fuese derruída, Anthony McCoy (Yahya Abdul-Mateen) y su novia Brianna Cartwright (Teyonah Parris), se instalan en un apartamento de lujo de este barrio, completamente diferente a lo que fue y repleto de millennials que desconocen su oscuro pasado. Un pasado lleno de historias oscuras, entre ellas, la de Candyman, un fantasma con un gancho en vez de mano que aparece si su nombre se pronuncia cinco veces frente a un espejo.");
const peli_3 = new Pelicula(3, "Tenet", "https://www.youtube.com/embed/9UfIRXjoO3I", "Estados Unidos", "Acción - Aventura - Drama - Thriller", "17/07/2020", "Christopher Nolan", "Christopher Nolan", "Syncopy, Warner Bros. Pictures", "Aaron Taylor-johnson, Elizabeth Debicki, John David Washington, Kenneth Branagh, Michael Caine, Robert Pattinson", "120 minutos", "Está descrita oficialmente como una película de acción épica que se desarrolla alrededor del mundo del espionaje internacional.");
const peli_4 = new Pelicula(4, "Way Down", "https://www.youtube.com/embed/Jm4wq5tupiI", "España", "Acción - Suspense", "27/11/2020", "Jaume Balagueró", "Andrés M. Koppel, Borja González, Michel Gaztambide, Rafa Martínez, Rowan Athale", "Telecinco Cinema", "Astrid Bergès-frisbey, Famke Janssen, Freddie Highmore, Liam Cunningham, Luis Tosar, Sam Riley", "97 minutos", "Hay un banco completamente distinto a cualquier otro, absolutamente inexpugnable. Nadie ha podido robar ese banco, no existen planos ni datos, y nadie sabe de qué manera se ha construido la cámara acorazada de su interior. El ingeniero Thom Laybrick no tiene miedo a nada, lo único que piensa es en entrar en esa cámara acorazada y robar un misterioso objeto que hay en su interior. Un objeto que sólo estará ahí durante 10 días. Durante este tiempo, una esperadísima final de fútbol se celebrará en España, por lo que Laybrick tendrá una oportunidad de oro para entrar en el banco sin que nadie lo vea.");

var array_pelis = [peli_1, peli_2, peli_3, peli_4, peli_1, peli_2, peli_3, peli_4, peli_1, peli_2, peli_3, peli_4];

router.get('/', function(req, res, next) {
	res.render('pelis', { pelis: array_pelis, logueado: req.session.user});
});

router.get('/:id', function(req, res, next) {
	const id = req.params.id;
	let peliElegida;
	for(p of array_pelis) {
		if(p.id == id) {
			peliElegida = p;
			break;
		}
	}
	res.render('peli', { peli: peliElegida, logueado: req.session.user});
});


module.exports = router;
