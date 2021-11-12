
/*codigo de: 
htps://github.com/LimberghMorales/previsualizar*/


  
 /*document.getElementById('file').onchange={
    function(e){
    let reader=new FileReader();

    reader.readAsDataURL(e.target.files[0]);

    reader.onload=function(){

        let preview=document.getElementById('img_preview');
            
            image=document.createElement('img');
            image.src=reader.result;
            image.style.width="200px";
            //preview.innerHTML='';
            preview.append(image);
    }
} */

//Declaración de variables para contener elementos de la página

const labelsubir=document.getElementById('labelpublicar');
const divimgpreview=document.getElementById('img_preview');
const divfotos=document.getElementById('fotos');
const btnborrarfotos=document.getElementById('btnborrarfotos');
const input_publicar=document.getElementById('input_publicar');

const inputNombre_u=document.getElementById('nombre_u');
const inputNombre_p=document.getElementById('nombre_p');
const inputTel=document.getElementById('tel');
const inputCorreo=document.getElementById('correo');
const inputDireccion=document.getElementById('direccion');


/**
 * Permite obtener el valor de un parámetro pasado a la página mediante GET
 * @returns El dato del primer parámetro incluído en la URL
 */
 function obtenerParametroURL() {
    let paginaURL = window.location.href;
    let datos = paginaURL.split('?');
    parametro = datos[1].split('=');
    parametro = parametro[1];
    return parametro;
}

let listaDeFotos=[];
/* 
//Agrega un evento de escucha sobre el input para ejecutar una función cada vez que se seleccionan archivos*/
input_publicar.addEventListener('change',archivosAgregados);




/**
 * Función auxiliar para ejecutar con el evento de escucha
 */
 function archivosAgregados() {
    ListarArchivos(input_publicar);
}



/**
 * Esta función carga y procesa los archivos de imágen del input hacia la página
 * @param {*} inputOrigen elemento input con las imagenes
 */
function ListarArchivos(inputOrigen) {
    const lista = Array.from(inputOrigen.files);
    
    divfotos.innerHTML = "";
    listaDeFotos.length = 0;

    imgsrc = "";
    idFoto = 0;

    lista.forEach(element => {
        if (idFoto<5) {
            
        } 
        lector = new FileReader();
        


        lector.onload = function (e) {
            imgsrc = e.target.result;

            fotoTamanio = (element.size)/(1024*1024);
            
            if (fotoTamanio > 2) {
                mensaje = "Foto demasiado grande";
                estado = "NO";
            } else {
                mensaje = "OK";
                estado = "OK";
            }

            idFoto++;
            const divFoto = document.createElement('div');
            divFoto.classList.add('foto');

            imagen = document.createElement('img');
            imagen.src = imgsrc;
            imagen.style.width = '100%';
            imagen.style.height = '100%'; 

            divFoto.appendChild(imagen);
            divfotos.appendChild(divFoto);

            foto = {
                id : idFoto,
                datos : imgsrc,
                subirFoto : estado
            }

            listaDeFotos.push(foto);

        }
        imgSrc = lector.readAsDataURL(element);
        
        abrirfotos();
        //CargarDatosDeImagen(element).then( (datos)=> console.log(datos) );
       
    });
}

function cargarfoto(foto) {
    
}

function abrirfotos() {
    
    labelsubir.style.display="none";
    divimgpreview.style.display="block";


}

function borrarfotos() {
    divfotos.innerHTML = "";
    listaDeFotos.length = 0;
    labelsubir.style.display="block";
    divimgpreview.style.display="none  ";
}


function Datos_perfil() {
    
    let ci=obtenerParametroURL();

    $.ajax(
        {
            //1 - Indicar la URL de donde se obtienen los datos
            url:"../database/buscar.php",
            //2 - Método para el envío de los datos, puede ser 'GET' o 'POST'
            method: "POST",
            //3 - Indicar la forma que tendran los datos, en este caso es 'json'
            datatype: "json",
            //4 - Indicar los datos que se incluirán. 
            // Primero se indica el nombre del dato esperado por la página y luego el dato
            data:{
                'modo' : 1,
                'ci' : ci
            },
            //5 - Establecemos una función que se ejecuta en caso de éxito en la operación
            success:function (data) {
                //la variable 'data' representa a los datos que vienen del servidor
                console.log(data);

                let datos = data.Respuesta.datos[0];
                inputNombre_p.value=datos.nombre_p;
                inputTel.value=datos.telefono;
                inputCorreo.value=datos.correo_e;
                inputDireccion.value=datos.domicilio;
                inputNombre_u.value=datos.nombre_u;

            },
            //6 - Establecemos una función que se ejecuta en caso de error
            error:function(errorThrown){
                console.error(errorThrown.responseText);
            }
        }
    );

}