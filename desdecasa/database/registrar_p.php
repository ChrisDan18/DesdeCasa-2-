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
                    $Producto = $_POST['nombre_p'];
                    $info = Producto_Existe($Producto);

                    break;
                //Modo 2: Buscar libros
                case '2':
                    $info = registrar_producto();
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


function registrar_producto(){
    
    $respuesta = new Respuesta;
    $nombre_p = ValidarDatos($_POST['nombre_p']);
    $precio = ValidarDatos($_POST['precio']);
    $caracteristicas = ValidarDatos($_POST['caracteristicas']);
    

    $bdd = CrearConexion();
    $consulta1 = "Insert into producto(nombre_p,precio,caracteristicas) values (?,?,?)";
    

    $sentencia = $bdd->conexion->prepare($consulta1);
    $sentencia->bind_param("sis",$nombre_p,$precio,$caracteristicas);
    $sentencia->execute();

    $datos = $sentencia->affected_rows;
    
       
        
    if ($datos==1) {
        $respuesta->estado="OK";
        $respuesta->datos="El producto $nombre_p fue registrado con éxito";
    
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