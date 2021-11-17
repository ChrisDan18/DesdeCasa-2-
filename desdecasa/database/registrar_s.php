<?php

include "api.php";

/* Zona de Ejecución */
   $info = new Respuesta;
    $info->estado = "";
    $info->datos= "";

    if ($_POST) {
        if (isset($_POST['modo']) ) {
            
            $modo = ValidarDatos($_POST['modo']);

            switch ($modo) {
                //Modo 1: Listado de todos los libros
                case '1':
                    $Servicio = $_POST['nombre_s'];
                    $info = Servicio_Existe($Servicio);

                    break;
                //Modo 2: Buscar libros
                case '2':
                    $info = registrar_servicio();
                    break;
                default:
                    # code...
                    break;
            }
        }
    }

    $json = TransformarEnJSON($info);
    MostrarJSON($json);
    

/*$respuesta = registrar_usuario();
$JSON = TransformarEnJSON($respuesta);
MostrarJSON($JSON);*/


function registrar_servicio(){
    
    $respuesta = new Respuesta;
    $nombre_s = ValidarDatos($_POST['nombre_s']);
    $precio = ValidarDatos($_POST['precio']);
    $descripcion = ValidarDatos($_POST['descripcion']);
    
    
    //echo ("$nombre_u,$correo_e,$contraseña,$nombre_p,$apellido,$ci,$domicilio,$telefono");

    $bdd = CrearConexion();
    $consulta1 = "Insert into servicio(nombre_s,precio,descripcion) values (?,?,?)";
    
    
    

    $sentencia = $bdd->conexion->prepare($consulta1);
    $sentencia->bind_param("sis",$nombre_s,$precio,$descripcion);
    $sentencia->execute();

    $datos = $sentencia->affected_rows;
    
       
        
    if ($datos==1) {
        $respuesta->estado="OK";
        $respuesta->datos="El servicio $nombre_s fue registrado con éxito";
    
    } 
    else {
            $respuesta->estado="ERROR";
            $respuesta->datos=array();
            array_push($respuesta->datos,"Ocurrió un error");
            array_push($respuesta->datos,error_get_last()['message']);
    }
    $bdd->conexion->close();
    return $respuesta;

}

?>