// ************* CARRUSEL ***************

const fila = document.querySelector('.contenedor-carrusel');
const peliculas = document.querySelectorAll('.pelicula');
const flechIzq = document.getElementById('flecha-izq');
const flechDer = document.getElementById('flecha-der');

// Añadimos un listener a las flechas

if(flechDer != null) {
	flechDer.addEventListener('click', () => {
		fila.scrollLeft += fila.offsetWidth;
		const indActv = document.querySelector('.activo');
		if(indActv.nextSibling) {
			indActv.nextSibling.classList.add('activo');
			indActv.classList.remove('activo');
		}
	});
}


if(flechIzq != null) {
	flechIzq.addEventListener('click', () => {
		fila.scrollLeft -= fila.offsetWidth;
		const indActv = document.querySelector('.activo');
		if(indActv.previousSibling) {
			indActv.previousSibling.classList.add('activo');
			indActv.classList.remove('activo');
		}
	});
}


// Paginación
const numPags = peliculas.length;
const indicadores = document.querySelector('.indicadores');
if(indicadores != null) {
	for(let i = 0; i < numPags; i++) {
		const indicador = document.createElement('button');

		if(i == 0) {
			indicador.classList.add('activo');
		}

		indicador.addEventListener('click', () => {
			fila.scrollLeft = i * fila.offsetWidth;
			document.querySelector('.indicadores .activo').classList.remove('activo');
			indicador.classList.add('activo');
		})

		indicadores.appendChild(indicador);
	}

}


// *************** NAVI ***************

// Modificamos el color de los elementos de la barra de navegación cuando nos situamos sobre ellos
var color_ant;
$(".navi div").hover(function() {
	color_ant = $(this).children().css("color");
	$(this).children().css("color", "#2F2F2F");},
	function() {
		$(this).children().css("color", color_ant);
	});


// ************** MENÚ HAMBURGUESA **************

$("#btn-hamb").click(function() {
	if($(".menu-hamburguesa .lista-nav").css("left") == "-310px") {
		$(".menu-hamburguesa .lista-nav").css("left", "-5px");
	} else {
		$(".menu-hamburguesa .lista-nav").css("left", "-310px");
	}
	
});


// ************** INICIO DE SESIÓN Y REGISTRO ************


// Estética

$(".caja-nav h2").each(function () {
	$(this).hover(function () {
		if($(this).attr('class').split(' ')[1] == "activo-tab") {
			$(this).css("cursor", "default");
		}
	}, function() {
			$(this).css("cursor", "pointer");	
		});
});

$(".caja-nav h2").each(function () {
	$(this).click(function () {
		
			const activos = $(".caja-nav .activo-tab").removeClass("activo-tab");
			activos.addClass("no-activo-tab");
			$(this).removeClass("no-activo-tab");
			$(this).addClass("activo-tab");
			const inicio = $(".caja-login #inicio");
			const registro = $(".caja-login #registro");
			if($(this).attr('class').split(' ')[0] == "inicio") {
				
				inicio.removeClass("no-activo-contenido");
				inicio.addClass("activo-contenido");
				
				registro.removeClass("activo-contenido");
				registro.addClass("no-activo-contenido");
			} else {
				registro.removeClass("no-activo-contenido");
				registro.addClass("activo-contenido");

				inicio.removeClass("activo-contenido");
				inicio.addClass("no-activo-contenido");
			}
		
	});
});

//Procesamiento

function validar(cadena) {
	var er = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
	if(er.test(cadena.toString())) return true;
	return false;
}


function passwordCorrecta() {
	if(validar($("#passwordReg").val()) && $("#rePasswordReg").val() == $("#passwordReg").val()) {
		return true;
	}
	return false;
}

//Comprobamos que la contraseña cumpla con la especificación

$("#passwordReg").on("change paste keyup", function() {
	var cadena = $(this).val();
	if(validar(cadena)) {
		$(this).css("border", "solid green");
	}
	else $(this).css("border", "solid red");
});

//Comprobamos que la repetición de la contraseña coincida con la contraseña anteriormente escrita

$("#rePasswordReg").on("change paste keyup", function() {
	if($(this).val() == $("#passwordReg").val()) $(this).css("border", "solid green");
	else $(this).css("border", "solid red");
});


function crea_query_string(parametros) {
	resultado = "";
	$.each(parametros, function(idx, param) {
		resultado += param + "=" + encodeURIComponent($('#' + param).val())
				+ "&";
	});
	return resultado + "nocache=" + Math.random();
}

$(".btnLogin").click(function(e) {
	e.preventDefault();
	$.ajax({
		url : '/login',
		type : 'POST',
		async : true,
		data : crea_query_string([
			"userLog", "passwordLog"]),
		success : function(result,status, xhr) {
			if(result == "LOGUEADO") {
				window.location = "/";
			} else if(result == "ERROR") {
				var sessionCheck = $("#session-check");
				if(sessionCheck) sessionCheck.remove();
				$("#userLog").before("<em id=\"session-check\" style=\"color: red;\">Hay un error en el usuario o la contraseña</em>");
				$("#userLog").css("border", "solid red");
				$("#passwordLog").css("border", "solid red");
			}
			console.log("Se ha logueado correctamente ");
		},
		error : function(xhr,status, error) {
			console.log("Ha habido un error al loguearse");
		}
	});
});

$(".btnRegistro").click(function(e){
	e.preventDefault();
	if(passwordCorrecta()) {
		$.ajax({
		url : '/register',
		type : 'POST',
		async : true,
		data : crea_query_string([
			"userReg", "passwordReg"]),
		success : function(result,status, xhr) {
			if(result == "DUPLICADO") {
				$("#userReg").after("<em style=\"color: red;\">Ya existe ese nombre de usuario</em><br>");
				$("#userReg").css("border", "solid red");
			}
			
			if(result == "REGISTRADO") {
				console.log("Se ha registrado con éxito");
				$(".inicio").click();
			}
				
			
		},
		error : function(xhr,status, error) {
			console.log("Ha ocurrido un error al registrarse");
		}
	});
	}
});

$("#userReg").blur(function() {
	const name = $(this).val();
	if(name) {
		$.ajax({
		url : '/register',
		type : 'GET',
		async : true,
		data : crea_query_string([
			"userReg"]),
		success : function(result,status, xhr) {
			if(result == "DUPLICADO") {
				var checkText = $("#check-text");
				if(checkText) checkText.remove();
				$("#userReg").after("<em id=\"check-text\" style=\"color: red;\">Ya existe ese nombre de usuario</em>");
				$("#userReg").css("border", "solid red");
			} else if(result == "LIBRE") {
				var checkText = $("#check-text");
				if(checkText) checkText.remove();
				$("#userReg").after("<em id=\"check-text\" style=\"color: green;\">Nombre de usuario disponible</em>");
				$("#userReg").css("border", "solid green");
			}
		},
		error : function(xhr,status, error) {
			console.log("Ha ocurrido un error al registrarse");
		}
	});
	}
});

// Logout

$("#logout").click(function() {
	$.ajax({
		url : '/logout',
		type : 'GET',
		async : false,
		success : function(result,status, xhr) {
			if(result == "LOGOUT") {
				console.log("Sesión cerrada");
			}
		},
		error : function(xhr,status, error) {
			console.log("Ha ocurrido un error al cerrar sesión");
			console.log(error);
		}
	});
	window.location = "/";
});



// ************************** BOTÓN TARJETA DE FIDELIDAD **************************

$("#btn-tarjeta").click(function() {
	$.ajax({
		url : '/tarjeta/adquirir',
		type : 'GET',
		async : true,
		success : function(result,status, xhr) {
			if(result == "ADQUIRIDA") {
				window.location = "/tarjeta";
				console.log("Adquirida");
			} else if(result == "LOGUEATE") {
				window.location = "/login";
				console.log("Logueate");
			}
		},
		error : function(xhr,status, error) {
			console.log("Ha ocurrido un error al adquirir la tarjeta");
		}
	});
});

$( ".desplegable-fecha" ).change(function() {
	let index = $(".desplegable-fecha").prop('selectedIndex');
	console.log(window.location.pathname);
	$.ajax({
		url : window.location.pathname+'/'+(index-1),
		type : 'GET',
		async : true,
		success : function(result,status, xhr) {
			$(".cartelera-list").remove();
			$(".desplegable-fecha").after(result);		
		},
		error : function(xhr,status, error) {			
		}
	});
});