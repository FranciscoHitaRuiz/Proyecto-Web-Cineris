class Pelicula {
	constructor(id, titulo, urlVideo, pais, genero, estreno, directores, guionistas, productores, actores, duracion, sinopsis)
	{
		this.id = id;
		this.titulo = titulo;
		this.urlVideo = urlVideo;
		this.pais = pais;
		this.genero = genero;
		this.estreno = estreno;
		this.directores = directores;
		this.guionistas = guionistas;
		this.productores = productores;
		this.actores = actores;
		this.duracion = duracion;
		this.sinopsis = sinopsis;
	}
}


class PeliculaPreview {
	constructor(id, titulo, sesiones, duracion)
	{
		this.id = id;
		this.titulo = titulo;
		this.sesiones = sesiones;
		this.duracion = duracion;
	}
	
}

//Nos genera una copia de la pelicula pero cambiando sesion
function previewFromPreview(peli, sesiones) {
	return new PeliculaPreview(peli.id, peli.titulo, sesiones, peli.duracion);
}

module.exports = {
		Pelicula,
		PeliculaPreview,
		previewFromPreview
}