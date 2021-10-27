
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

let listaDeFotos=[];
/* 
//Agrega un evento de escucha sobre el input para ejecutar una función cada vez que se seleccionan archivos*/
input_publicar.addEventListener('change',archivosAgregados);
btnborrarfotos.addEventListener('click',borrarfotos);



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
            divFoto = document.createElement('div');
            divFoto.classList.add('foto');

            pIdFoto = document.createElement('p');
            pIdFoto.innerText = "Foto "+ idFoto;
            
            pTamFoto = document.createElement('p');
            pTamFoto.innerText = fotoTamanio.toFixed(2) + " MB | " + mensaje ;
            
            divFoto.appendChild(pIdFoto);
            divFoto.appendChild(pTamFoto);

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