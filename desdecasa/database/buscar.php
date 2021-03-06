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
    public $nombre_u;
    public $nombre_p;
    public $correo_e;
    public $foto_id;
    public $apellido;
    public $domicilio;
    public $telefono;

}

function Datos_perfil($ci){
    $respuesta = new Respuesta;
    $bdd = CrearConexion();
    $consulta = "
    select 
    datospersonales.ci as 'ci',
    usuario.nombre as 'nombre_u',
    usuario.correo_e as 'correo_e',
    usuario.foto_id as 'foto_id',
    datospersonales.nombre as 'nombre_p',
    datospersonales.apellido as 'apellido',
    datospersonales.domicilio as 'domicilio',
    datospersonales.telefono as 'telefono'
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
            $respuesta->estado = "OK";
            $respuesta->datos = array();

            while ( $fila=$datos->fetch_assoc() ) {
                $Usuario = new Datos_u;
                $Usuario->ci = $fila['ci'];
                $Usuario->nombre_u = $fila['nombre_u'];
                $Usuario->apellido = $fila['apellido'];
                $Usuario->foto_id = $fila['foto_id'];
                $Usuario->nombre_p = $fila['nombre_p'];
                $Usuario->telefono = $fila['telefono'];
                $Usuario->correo_e = $fila['correo_e'];
                $Usuario->domicilio = $fila['domicilio'];

                array_push($respuesta->datos, $Usuario);
            }
        }
        
    $bdd->conexion->close();
    return $respuesta;

}

    





?>