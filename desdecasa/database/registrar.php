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
                    $Usuario = $_POST['nombre_u'];
                    $info = Usuario_Existe($Usuario);
                    break;
                //Modo 2: Buscar libros
                case '2':
                    $datoBusqueda = ValidarDatos($_POST['busqueda']);
                    $info = BuscarLibros($datoBusqueda);
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


function registrar_usuario(){
    $respuesta = new Respuesta;
    $nombre_u = ValidarDatos($_POST['nombre_u']);
    $correo_e = ValidarDatos($_POST['correo_e']);
    $contraseña = ValidarDatos($_POST['contraseña']);
    $nombre_p = ValidarDatos($_POST['nombre_p']);
    $apellido = ValidarDatos($_POST['apellido']);
    $ci = ValidarDatos($_POST['ci']);
    $domicilio = ValidarDatos($_POST['domicilio']);
    $telefono = ValidarDatos($_POST['telefono']);
    

    $bdd = CrearConexion();
    $consulta1 = "Insert into usuario(nombre,contraseña) values (?,?)";
    $consulta2 = "Insert into datospersonales(nombre,apellido,ci,domicilio,telefono) values (?,?,?,?,?)";
    $consulta3 = "Insert into tiene(usuario_nombre,datospersonales_ci) values (?,?)";


    $sentencia = $bdd->conexion->prepare($consulta1);
        $sentencia->bind_param("ss",$nombre_u,$contraseña);
        $sentencia->execute();
        $datos = $sentencia->affected_rows();
        
        if ($datos==1) {
            $sentencia = $bdd->conexion->prepare($consulta2);
            $sentencia->bind_param("ssisi",$nombre,$apellido,$ci,$domicilio,$telefono);
            $sentencia->execute();
            $datos = $sentencia->affected_rows();
        
            if ($datos==1) {
                $sentencia = $bdd->conexion->prepare($consulta3);
                $sentencia->bind_param("ss",$usuario_nombre,$ci);
                $sentencia->execute();
                $datos = $sentencia->affected_rows();

                if ($datos==1) {
                    $respuesta->estado="OK";
                    $respuesta->datos="El usuario $nombre_u fue registrado con éxito";
                }
            }
        } else {
            $respuesta->estado="ERROR";
            $respuesta->datos="Ocurrió un error";
        }
    $bdd->conexion->close();
    return $respuesta;

}

function Usuario_Existe($Usuario){
    $respuesta = new Respuesta;
    $bdd = CrearConexion();
    $consulta = "select count(*) as conteo from usuario where nombre=?";

    $sentencia = $bdd->conexion->prepare($consulta);
        $sentencia->bind_param("s",$Usuario);
       $sentencia->execute();
        $datos = $sentencia->get_result();;
    
        
            $fila=$datos->fetch_assoc();
        
        if ($fila['conteo']==1) {
            $respuesta->estado="OK";
            $respuesta->datos=array ();
            array_push($respuesta->datos,true);
            array_push($respuesta->datos,"Este usuario ya està registrado");
        }
        else {
            $respuesta->estado="OK";
            $respuesta->datos=array ();
            array_push($respuesta->datos,false);
            array_push($respuesta->datos,"Este usuario està disponible");
        }
    
    $bdd->conexion->close();
    return $respuesta;

}

?>