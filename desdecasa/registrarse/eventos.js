

const inputNombre_u = document.getElementById('Nombre_u');
const inputCorreo = document.getElementById('Correo_e');
const inputContraseña = document.getElementById('Contraseña');
const inputConfirmarContraseña = document.getElementById('Confirmar_contraseña');

const inputNombre = document.getElementById('Nombre');
const inputApellido = document.getElementById('Apellido');
const inputCI = document.getElementById('CI');
const inputDomicilio = document.getElementById('Domicilio');
const inputTelefono = document.getElementById('Teléfono');

//FUNCION QUE CONTROLA QUE LOS CAMPO NO ESTEN VACIOS

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
            url:"../database/registrar.php",
            //2 - Método para el envío de los datos, puede ser 'GET' o 'POST'
            method: "POST",
            //3 - Indicar la forma que tendran los datos, en este caso es 'json'
            datatype: "json",
            //4 - Indicar los datos que se incluirán. 
            // Primero se indica el nombre del dato esperado por la página y luego el dato
            data:{
                'modo': 1,
                'nombre_u' : inputNombre_u.value
            },
            //5 - Establecemos una función que se ejecuta en caso de éxito en la operación
            success:function (data) {
                console.log(data);
                //let Estado=data.Respuesta.estado;
                let Datos=data.Respuesta.datos;
                //CONTROLAN QUE EL USUARIO ESTE DISPONIBLE Y ALERTA EN CASO DE QUE NO.
                if ( Datos[0] == true ) {
                    alert ("Este usuario no está disponible");
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

    let nombre_u=inputNombre_u.value;
    let correo_e=inputCorreo.value;
    let contraseña=inputContraseña.value;
    let nombre_p=inputNombre.value;
    let apellido=inputApellido.value;
    let ci=inputCI.value;
    let domicilio=inputDomicilio.value;
    let telefono=inputTelefono.value;

    console.log(nombre_u+' '+correo_e+contraseña+nombre_p+apellido+ci+domicilio+telefono);


    $.ajax(
        {
            //1 - Indicar la URL de donde se obtienen los datos
            url:"../database/registrar.php",
            //2 - Método para el envío de los datos, puede ser 'GET' o 'POST'
            method: "POST",
            //3 - Indicar la forma que tendran los datos, en este caso es 'json'
            datatype: "json",
            //4 - Indicar los datos que se incluirán. 
            // Primero se indica el nombre del dato esperado por la página y luego el dato
            data:{
                'modo':2,
                'nombre_u':nombre_u,
                'correo_e':correo_e,
                'contraseña':contraseña,
                'nombre_p':nombre_p,
                'apellido':apellido,
                'ci':ci,
                'domicilio':domicilio,
                'telefono':telefono,
            },
            //5 - Establecemos una función que se ejecuta en caso de éxito en la operación
            success:function (data) {
                console.log(data);
                alert ("El usuario se registró con éxito");
                window.location.replace('../perfil/?ci='+ci);
            },
            //6 - Establecemos una función que se ejecuta en caso de error
            error:function(errorThrown){
                console.error(errorThrown.responseText);
            }
        }
    );
}

/* Función para ir de sección 1 a la sección 2. 
Y que valide las funciones, en conjunto con HTML. */

function AbrirSeccion2(){
    if (inputNoVacio(inputNombre_u)) {
        if (inputNoVacio(inputCorreo)) {
            if (inputNoVacio(inputContraseña)) {
                if (inputNoVacio(inputConfirmarContraseña)) {
                    if (inputContraseña.value==inputConfirmarContraseña.value) {
                        $("#seccion1").toggle();
                        $("#seccion2").toggle('slow');
                    }
                    else{
                        alert ("Las contraseñas no coinciden");
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
        else{
            alert ("Falta completar el/los campos");
        }
    }
    else{
        alert ("Falta completar el/los campos");
    }
}





function AbrirSeccion1(){
    $("#seccion1").toggle('slow');
    $("#seccion2").toggle();
}



function ChequearDatosP() {
    if (inputNoVacio(inputNombre)) {
        if (inputNoVacio(inputApellido)) {
            if (inputNoVacio(inputCI)) {
                if (inputNoVacio(inputDomicilio)) {
                    if (inputNoVacio(inputTelefono)) {
                        registrarse();
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
        else{
            alert ("Falta completar el/los campos")
        } 
    }
    else{
        alert ("Falta completar el/los campos")
    } 
}

