const inputNombre_s=document.getElementById('nombre_s');
const inputPrecio=document.getElementById('precio');
const inputDesc=document.getElementById('descripcion');


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








function Datos_s() {
    
    let codigo=obtenerParametroURL();

    $.ajax(
        {
            //1 - Indicar la URL de donde se obtienen los datos
            url:"../database/buscar_s.php",
            //2 - Método para el envío de los datos, puede ser 'GET' o 'POST'
            method: "POST",
            //3 - Indicar la forma que tendran los datos, en este caso es 'json'
            datatype: "json",
            //4 - Indicar los datos que se incluirán. 
            // Primero se indica el nombre del dato esperado por la página y luego el dato
            data:{
                'modo' : 1,
                'codigo' : codigo
            },
            //5 - Establecemos una función que se ejecuta en caso de éxito en la operación
            success:function (data) {
                //la variable 'data' representa a los datos que vienen del servidor
                console.log(data);

                let datos = data.Respuesta.datos[0];
                inputNombre_s.value=datos.nombre_s;
                inputPrecio.value=datos.precio;
                inputDesc.value=datos.descripcion;
           

            },
            //6 - Establecemos una función que se ejecuta en caso de error
            error:function(errorThrown){
                console.error(errorThrown.responseText);
            }
        }
    );

}

function ChequearDatosS() {
    if (inputNoVacio(inputNombre_s)) {
        if (inputNoVacio(inputPrecio)) {
            if (inputNoVacio(inputDesc)) {
                 
            }
            else{
                alert ("Falta completar el/los campos")
            } 
        }
        else{
            alert ("Falta completar el/los campos")
        } 
    }
    else{
        alert ("Falta completar el/los campos")
    } 
}