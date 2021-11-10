<?php

include 'api.php';

/* Zona de Ejecución */
$info = new Respuesta;
$info->estado = "";
$info->datos= "";

if ($_POST) {
    if (isset($_POST['modo']) ) {
        
        $modo = ValidarDatos($_POST['modo']);

        switch ($modo) {
            //Modo 1: Datos del perfil del usuario
            
            case '1':
                $ci = $_POST['ci'];
                $info = Datos_perfil($ci);

                break;
            //Modo 2: Buscar libros
            case '2':
                $info = registrar_usuario();
                break;
            default:
                # code...
                break;
        }
    }
}

$json = TransformarEnJSON($info);
MostrarJSON($json);


class Datos_U{
    public $ci;
    public $nombre_p;
    public $numero_contacto;
    public $email;
    public $direccion;
    public $descripcion;

}

function Datos_perfil($ci){
    $respuesta = new Respuesta;
    $bdd = CrearConexion();
    $consulta = "
    select 
    usuario.nombre,usuario.correo_e,usuario.foto_id,
    datospersonales.nombre,datospersonales.apellido,datospersonales.domicilio,datospersonales.telefono
    from 
    usuario inner join tiene inner join datospersonales 
    where 
    usuario.nombre=tiene.usuario_nombre and datospersonales.ci=tiene.datospersonales_ci
    and
    datospersonales.ci=?";

    $sentencia = $bdd->conexion->prepare($consulta);
        $sentencia->bind_param("s",$ci);
       $sentencia->execute();
        $datos = $sentencia->get_result();;
    
        if ($datos->num_rows > 0) {
            # code...
        }
            
        
        
        
        
        
        
        
        
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