const inputPublicar = document.getElementById('guardar');
const inputPrecio = document.getElementById('PrecioD');
const inputDescripcion = document.getElementById('caracteristicas');
const inputNombre_p = document.getElementById('Nombre_p');







function inputNoVacio(input) {
    let resultado=false;
    let contenido=input.value;
    if (contenido.length>0) {
        resultado=true;
    
    }
    else{
        alert("No puede dejar un campo vacío");
    }
    return resultado;
}


function registrarse() {
    $.ajax(
        {
            //1 - Indicar la URL de donde se obtienen los datos
            url:"../database/registrar_p.php",
            //2 - Método para el envío de los datos, puede ser 'GET' o 'POST'
            method: "POST",
            //3 - Indicar la forma que tendran los datos, en este caso es 'json'
            datatype: "json",
            //4 - Indicar los datos que se incluirán. 
            // Primero se indica el nombre del dato esperado por la página y luego el dato
            data:{
                'modo': 1,
                'Nombre_p' : inputNombre_p.value,
                'PrecioD' : inputPrecio.value,
                'caracteristicas' : inputDescripcion.value,
                'guardar' : inputPublicar.value
            },
            //5 - Establecemos una función que se ejecuta en caso de éxito en la operación
            success:function (data) {
                console.log(data);
                //let Estado=data.Respuesta.estado;
                let Datos=data.Respuesta.datos;
                if ( Datos[0] == true ) {
                    alert ("Este producto no está disponible");
                } else {
                    enviar_datos_u();
                }


                //la variable 'data' representa a los datos que vienen del servidor
            },
            //6 - Establecemos una función que se ejecuta en caso de error
            error:function(errorThrown){
                console.error(errorThrown.responseText);
            }
        }
    );
}



function enviar_datos_u(){

    //let guardar=inputPublicar.value;
    let PrecioD=inputPrecio.value;
    let caracteristicas=inputDescripcion.value;
    let Nombre_p=inputNombre_p.value;

    console.log(PrecioD+' '+caracteristicas+Nombre_p);


    $.ajax(
        {
            //1 - Indicar la URL de donde se obtienen los datos
            url:"../database/registrar_p.php",
            //2 - Método para el envío de los datos, puede ser 'GET' o 'POST'
            method: "POST",
            //3 - Indicar la forma que tendran los datos, en este caso es 'json'
            datatype: "json",
            //4 - Indicar los datos que se incluirán. 
            // Primero se indica el nombre del dato esperado por la página y luego el dato
            data:{
                'modo':2,
                'nombre_p':Nombre_p,
                'precio':PrecioD,
                'caracteristicas':caracteristicas
                
                
            },  
            //5 - Establecemos una función que se ejecuta en caso de éxito en la operación
            success:function (data) {
                console.log(data);
                alert ("El producto se registró con éxito");
                
            },
            //6 - Establecemos una función que se ejecuta en caso de error
            error:function(errorThrown){
                console.error(errorThrown.responseText);
            }
        }
    );
}

function ChequearCampos(){
    if (inputNoVacio(inputNombre_p)) {
        if (inputNoVacio(inputPrecio)) {
            if (inputNoVacio(inputDescripcion)) {
         
                enviar_datos_u();
            }
            else{
                alert ("Falta completar el/los campos");
            }
        }
        else{
            alert ("Falta completar el/los campos");
        }
    }
    else{
        alert ("Falta completar el/los campos");
    }
}










