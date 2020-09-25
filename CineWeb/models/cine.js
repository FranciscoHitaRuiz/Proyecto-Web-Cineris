class Cine {
	constructor(img, nombre, aforo, direccion, telf, precioSemana, precioFines, salas)
	{
		this.img = img;
		this.nombre = nombre;
		this.aforo = aforo;
		this.direccion = direccion;
		this.telf = telf;
		this.precioSemana = precioSemana;
		this.precioFines = precioFines;
		this.salas = salas;
	}
}

class CineRes {
	constructor(id, nombre)
	{
		this.id = id;
		this.nombre = nombre;
	}
}

module.exports = {
		Cine,
		CineRes
};