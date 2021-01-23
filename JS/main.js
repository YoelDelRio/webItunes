/**
 * 
 */

var state = false;
var xhr = new XMLHttpRequest();
var url_Itunes = 'https://itunes.apple.com/search/?media=music&term=';

function busqueda (){
	//recojo el texto escrito por el usuario
	let buscar_nombre = document.getElementById("textobusqueda").value;
	
	console.log ("busqueda = " + buscar_nombre);
	//si el texto es mayor a 3 caracteres comienza la busqueda
	if(buscar_nombre.length > 3){
		
		let url = url_Itunes + buscar_nombre;
		
		console.log ("url = " + url);
		// traemos la respuesta del servidor
		xhr.open("GET", url);
		// pasar la lista a mostrar resultados
		xhr.onreadystatechange = mostrarResultados;
		// cierra la conexxion con el servidor
		xhr.send(null);
		}
	
	}
	
function mostrarBusqueda (lista_busqueda_js)
	{
	
	
	console.log (lista_busqueda_js.results.length);
	console.log (lista_busqueda_js.results.length);
	
	
		var table = document.createElement('table'), tr, td, tr_titles,th_preview,th_cancion,th_artista,th_colleccion; 
		
		tr_titles = document.createElement('tr');
		
		th_preview= document.createElement('th'); 
		tr_titles.appendChild(th_preview); 
		th_preview.innerHTML ='Reproducción';
		console.log(th_preview);
		
		th_cancion= document.createElement('th'); 
		tr_titles.appendChild(th_cancion); 
		th_cancion.innerHTML ='Cancion';
		console.log(th_cancion);
		
	    th_artista= document.createElement('th'); 
	    tr_titles.appendChild(th_artista); 
	    th_artista.innerHTML ='Artista';
		console.log(th_artista);
		
		th_colleccion= document.createElement('th'); 
		tr_titles.appendChild(th_colleccion); 
		th_colleccion.innerHTML ='Album';
		console.log(th_colleccion);
		
		table.appendChild(tr_titles);
		 
		for (let i = 0; i < lista_busqueda_js.results.length; i++) { 
		tr = document.createElement('tr'); 
		
		let td_tra_view = document.createElement('td'); 
		tr.appendChild(td_tra_view); 
		td_tra_view.innerHTML ="<audio src="+lista_busqueda_js.results[i].trackViewUrl+" preload='auto' controls></audio>";
		console.log(td_tra_view);

		let td_tra_name = document.createElement('td'); 
		tr.appendChild(td_tra_name); 
		td_tra_name.innerHTML =lista_busqueda_js.results[i].trackName;
		console.log(td_tra_name);
		
		let td_art_name = document.createElement('td'); 
		tr.appendChild(td_art_name); 
		td_art_name.innerHTML =lista_busqueda_js.results[i].artistName;
		console.log(td_art_name);
		
		let td_col_name = document.createElement('td'); 
		tr.appendChild(td_col_name); 
		td_col_name.innerHTML =lista_busqueda_js.results[i].collectionName;
		console.log(td_col_name); 
		
		table.appendChild(tr); 
		} 
		document.getElementById('id_resultado').appendChild(table);
		} 
		
function crearTabla (lista_busqueda){
	
	
	//pasart de json a objeto js
	let busqueda_js = lista_busqueda;
	
	let tabla_u = document.getElementById ("tlistacanciones");
	let ttW = document-getElementById ("ttrackViewUrl")
	let ttN = document.getElementById ("ttrackName");
	let taN = document.getElementById ("tartistName");
	let tcN = document.getElementById ("tcollectionName");
	
	ttW.innerHTML = busqueda_js.results.trackViewUrl;
	ttN.innerHTML = busqueda_js.trackName;
	taN.innerHTML = busqueda_js.results.artistName;
	tcN.innerHTML = busqueda_js.collectionName;
	
	
}

function listaVacia (){
	let error = document.getElementById ("id_listaVacia");
	error.innerHTML = 'hola';
}

function limpiarBusqueda()
{
	let elemento_ul = document.getElementById ("id_resultado");//cojo el padre
	elemento_ul.innerHTML="";
	
	
	//let tabla_u = document.getElementById ("tusuario");
	//tabla_u.hidden = true;
}
	
	
function mostrarResultados()
{
	console.log(xhr.status);
	console.log(xhr.readyState);
	if (xhr.readyState == 4) {
		limpiarBusqueda();
		console.log("La respuesta del servidor ha llegado");
		if (xhr.status == 200) 
		{
			console.log("200 - Lista recibida");
			//como el servidor no me trae una lista vacia
			//parseo el JSON aqui, y si es 0 el numero de resultados que trae
			// invoco listaVacia() y le doy una alerta al usuario
			console.log (xhr.responseText);
			let lista_busqueda_js = JSON.parse (xhr.responseText);
			if(lista_busqueda_js.resultCount == 0){
				listaVacia();
			}else{
			mostrarBusqueda (lista_busqueda_js);
			}
		} else if (xhr.status == 204) {
			console.log("204 - Lista vacia");
			
			
									  }
		else if (xhr.status == 500) {
			console.log("500 -Ha habido un error. Intentelo más tarde");
									}
	}
}


/**  if(!state){
 var x =document.getElementById('id_formulario');
x.style.display="block";
}
else{
	 document.getElementById("id_resultado").style.display="block";
}*/

