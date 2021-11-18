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
                $codigo = $_POST['codigo'];
                $info = Datos_s($codigo);

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


class Datos_U{
    public $codigo;
    public $nombre_s;
    public $precio;
    public $descripcion;
  

}

function Datos_s($codigo){
    $respuesta = new Respuesta;
    $bdd = CrearConexion();
    $consulta = "
    select 
    servicio.codigo as 'codigo',
    servicio.nombre_s as 'nombre_s',
    servicio.precio as 'precio',
    servicio.caracteristicas as 'descripcion',
    from 
    servicio inner join tiene inner join servicio
    where 
    servicio.nombre_s=tiene.servicio_nombre_s and servicio.codigo=tiene.servicio_codigo
    and
    servicio.codigo=?";

    $sentencia = $bdd->conexion->prepare($consulta);
        $sentencia->bind_param("s",$codigo);
       $sentencia->execute();
        $datos = $sentencia->get_result();;
    
        if ($datos->num_rows > 0) {
            $respuesta->estado = "OK";
            $respuesta->datos = array();

            while ( $fila=$datos->fetch_assoc() ) {
                $Servicio = new Datos_u;
                $Servicio->codigo = $fila['codigo'];
                $Servicio->nombre_s = $fila['nombre_s'];
                $Servicio->precio = $fila['precio'];
                $Servicio->descripcion = $fila['descripcion'];
              

                array_push($respuesta->datos, $Servicio);
            }
        }
        
    $bdd->conexion->close();
    return $respuesta;

}

    





?>