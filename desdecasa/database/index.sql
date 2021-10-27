
drop schema if exists desdecasa;
create schema desdecasa;
use desdecasa;


CREATE TABLE `usuario` (
  `nombre` varchar(20) unique not null,
  `contraseña` varchar(15) NOT NULL,
   PRIMARY KEY (`nombre`)
);

CREATE TABLE `datospersonales` (
  `nombre` varchar(20) NOT NULL,
  `apellido` varchar (40) not null,
  `ci` int NOT NULL unique,
  `domicilio` varchar(50) DEFAULT NULL,
  `telefono` int NOT NULL,
   PRIMARY KEY (`ci`)
);

CREATE TABLE `sesion` (
  `id` int NOT NULL unique auto_increment,
  `estado` enum('conectado','no_conectado') not NULL default 'no_conectado',
  `tiempodeinicio` timestamp not null DEFAULT current_timestamp,
  `tiempodefin` int DEFAULT NULL,
   PRIMARY KEY (`id`)
);
   
CREATE TABLE `factura` (
  `codigo` int unique not null auto_increment,
  `fecha` timestamp not null default current_timdrop schema if exists desdecasa;
create schema desdecasa;
use desdecasa;


CREATE TABLE `usuario` (
  `nombre` varchar(20) unique not null,
  `contraseña` varchar(15) NOT NULL,
   PRIMARY KEY (`nombre`)
);

CREATE TABLE `datospersonales` (
  `nombre` varchar(20) NOT NULL,
  `apellido` varchar (40) not null,
  `ci` int NOT NULL unique,
  `domicilio` varchar(50) DEFAULT NULL,
  `telefono` int NOT NULL,
   PRIMARY KEY (`ci`)
);

CREATE TABLE `sesion` (
  `id` int NOT NULL unique auto_increment,
  `estado` enum('conectado','no_conectado') not NULL default 'no_conectado',
  `tiempodeinicio` timestamp not null DEFAULT current_timestamp,
  `tiempodefin` int DEFAULT NULL,
   PRIMARY KEY (`id`)
);
   
CREATE TABLE `factura` (
  `codigo` int unique not null auto_increment,
  `fecha` timestamp not null default current_timestamp,
  `importe` int(10),
   PRIMARY KEY (`codigo`)
);

CREATE TABLE `servicio` (
  `codigo` int unique not null auto_increment,
  `descripcion` varchar(50) NOT NULL,
  `zonadecobertura` varchar(20) not null,
  `precio` int not null,
   PRIMARY KEY (`codigo`)
);

CREATE TABLE `producto` (  
  codigo int unique,
  marca varchar(10) NOT NULL,
  modelo varchar(12) not null,
  caracteristicas varchar(120) not null,
  precio int(8) not null,
  PRIMARY KEY (codigo)
);


CREATE TABLE `recibe` (
  `usuario_nombre` varchar(20) unique,
  `factura_codigo` int NOT NULL,
   PRIMARY KEY (`factura_codigo`)
);

CREATE TABLE `abona` (
  `usuario_nombre` varchar(20) unique,
  `factura_codigo` int NOT NULL,
   PRIMARY KEY (`factura_codigo`)
);

CREATE TABLE `compra` (
  `usuario_nombre` varchar(20) unique,
  `producto_codigo` int NOT NULL,
  `id` varchar(20) NOT NULL,
   PRIMARY KEY (`id`)
);

CREATE TABLE `tiene` (
  `usuario_nombre` varchar(20) unique,
  `datospersonales_ci` int(8) NOT NULL,
   PRIMARY KEY (`usuario_nombre`)
);

CREATE TABLE `solicita` ( 
  `id` int unique not null auto_increment,
  `usuario_nombre` varchar(20) NOT NULL,
  `servicio_codigo` int not null,
   PRIMARY KEY (`id`)
);

CREATE TABLE `ofrece` (
  `codigo` int unique,
  `usuario_nombre` varchar(20) NOT NULL,
   PRIMARY KEY (`codigo`)
);

CREATE TABLE `vende` (
  `codigo` int unique,
  `usuario_nombre` varchar(20) NOT NULL,
   PRIMARY KEY (`codigo`)
);

CREATE TABLE `inicio` (
  `usuario_nombre` varchar(8) unique,
  `sesion_id` int NOT NULL,
   PRIMARY KEY (`sesion_id`)
);

CREATE TABLE `contiene` (
  `factura_codigo` int unique,
  `producto_codigo` int NOT NULL,
  `id` int not null,
   PRIMARY KEY (`id`)
);

CREATE TABLE `foto` (
  `ruta` varchar(20) not null,
  `fecha` timestamp NOT NULL,
  `id` int unique not null auto_increment,
   PRIMARY KEY (`id`)
);

CREATE TABLE `stiene` (
  `servicio_codigo` int not null,
  `foto_id` int unique not null,
   PRIMARY KEY (`foto_id`)
);

CREATE TABLE `ptiene` (
  producto_codigo int not null,
  `foto_id` int unique not null,
   PRIMARY KEY (`foto_id`)
);




/*Clave foranea de usuario-inicio-sesion*/

Alter table `inicio`
add constraint fk_sesion__inicio
foreign key (sesion_id)
references sesion(id)
on update cascade
on delete cascade;

Alter table `inicio`
add constraint fk_usuario_inicio
foreign key (usuario_nombre)
references usuario(nombre)
on update cascade
on delete cascade;

/*Clave foranea de usuario-recibe-factura*/

Alter table `recibe`
add constraint fk_factura_recibe
foreign key (factura_codigo)
references factura(codigo)
on update cascade
on delete cascade;

Alter table `recibe`
add constraint fk_usuario_recibe
foreign key (usuario_nombre)
references usuario(nombre)
on update cascade
on delete cascade;

/*Clave foranea de usuario-abona-factura */

Alter table `abona`
add constraint fk_usuario_abona
foreign key (usuario_nombre)
references usuario(nombre)
on update cascade
on delete cascade;

Alter table `abona`
add constraint fk_factura_abona
foreign key (factura_codigo)
references factura(codigo)
on update cascade
on delete cascade;

/*Clave foranea de usuario-tiene-datospersonales*/

Alter table `tiene`
add constraint fk_usuario_tiene
foreign key (usuario_nombre)
references usuario(nombre)
on update cascade
on delete cascade;

Alter table `tiene`
add constraint fk_datospersonales_tiene
foreign key (datospersonales_ci)
references datospersonales(ci)
on update cascade
on delete cascade;

/*Clave foranea de usuario-solicita-servicio*/

Alter table `solicita`
add constraint fk_usuario_solicita
foreign key (usuario_nombre)
references usuario(nombre)
on update cascade
on delete cascade;

Alter table `solicita`
add constraint fk_servicio_solicita
foreign key (servicio_codigo)
references servicio(codigo)
on update cascade
on delete cascade;

/*Clave foranea de usuario-compra-producto*/

Alter table `compra`
add constraint fk_usuario_compra
foreign key (usuario_nombre)
references usuario(nombre)
on update cascade
on delete cascade;

Alter table `compra`
add constraint fk_producto_compra
foreign key (producto_codigo)
references producto(codigo)
on update cascade
on delete cascade;

/*Clave foranea de factura-contiene-producto*/

Alter table `contiene`
add constraint fk_factura_contiene
foreign key (factura_codigo)
references factura(codigo)
on update cascade
on delete cascade;

Alter table `contiene`
add constraint fk_producto_contiene
foreign key (producto_codigo)
references producto(codigo)
on update cascade
on delete cascade;

/*Clave foranea de usuario-vende-producto*/

Alter table `vende`
add constraint fk_usuario_vende
foreign key (usuario_nombre)
references usuario(nombre)
on update cascade
on delete cascade;

Alter table `vende`
add constraint fk_producto_vende
foreign key (codigo)
references producto(codigo)
on update cascade
on delete cascade;

/*Clave foranea de usuario-ofrece-servicio*/

Alter table `ofrece`
add constraint fk_usuario_ofrece
foreign key (usuario_nombre)
references usuario(nombre)
on update cascade
on delete cascade;

Alter table `ofrece`
add constraint fk_servicio_ofrece
foreign key (codigo)
references servicio(codigo)
on update cascade
on delete cascade;

/*Clave foranea de servicio-stiene-fotos*/

Alter table `stiene`
add constraint fk_servicio_stiene
foreign key (servicio_codigo)
references servicio(codigo)
on update cascade
on delete cascade;

Alter table `stiene`
add constraint fk_foto_stiene
foreign key (foto_id)
references foto(id)
on update cascade
on delete cascade;


/*Clave foranea de producto-ptiene-fotos*/

Alter table `ptiene`
add constraint fk_producto_ptiene
foreign key (producto_codigo)
references producto(codigo)
on update cascade
on delete cascade;

Alter table `ptiene`
add constraint fk_foto_ptiene
foreign key (foto_id)
references foto(id)
on update cascade
on delete cascade;



/*

CREATE TABLE `administrador` ( ###
  `cod_admin` varchar(8) unique,
  `contraseña` varchar(20) NOT NULL,
  `correo` varchar(20) not null;
   PRIMARY KEY (`cod_admin`)
);
/*
create table usuario(
    nombre varchar(9) not null unique primary key,
    fecha_nac date not null default '1980-01-01'
)

insert into 
usuario
(nombre, fecha_nac)
values
('fulano','2001-10-25');

insert into 
usuario
(nombre)
values
('fulano');

*/
estamp,
  `importe` int(10),
   PRIMARY KEY (`codigo`)
);

CREATE TABLE `servicio` (
  `codigo` int unique not null auto_increment,
  `descripcion` varchar(50) NOT NULL,
  `zonadecobertura` varchar(20) not null,
  `precio` int not null,
   PRIMARY KEY (`codigo`)
);

CREATE TABLE `producto` (  
  codigo int unique,
  marca varchar(10) NOT NULL,
  modelo varchar(12) not null,
  caracteristicas varchar(120) not null,
  precio int(8) not null,
  PRIMARY KEY (codigo)
);


CREATE TABLE `recibe` (
  `usuario_nombre` varchar(20) unique,
  `factura_codigo` int NOT NULL,
   PRIMARY KEY (`factura_codigo`)
);

CREATE TABLE `abona` (
  `usuario_nombre` varchar(20) unique,
  `factura_codigo` int NOT NULL,
   PRIMARY KEY (`factura_codigo`)
);

CREATE TABLE `compra` (
  `usuario_nombre` varchar(20) unique,
  `producto_codigo` int NOT NULL,
  `id` varchar(20) NOT NULL,
   PRIMARY KEY (`id`)
);

CREATE TABLE `tiene` (
  `usuario_nombre` varchar(20) unique,
  `datospersonales_ci` int(8) NOT NULL,
   PRIMARY KEY (`usuario_nombre`)
);

CREATE TABLE `solicita` ( 
  `id` int unique not null auto_increment,
  `usuario_nombre` varchar(20) NOT NULL,
  `servicio_codigo` int not null,
   PRIMARY KEY (`id`)
);

CREATE TABLE `ofrece` (
  `codigo` int unique,
  `usuario_nombre` varchar(20) NOT NULL,
   PRIMARY KEY (`codigo`)
);

CREATE TABLE `vende` (
  `codigo` int unique,
  `usuario_nombre` varchar(20) NOT NULL,
   PRIMARY KEY (`codigo`)
);

CREATE TABLE `inicio` (
  `usuario_nombre` varchar(8) unique,
  `sesion_id` int NOT NULL,
   PRIMARY KEY (`sesion_id`)
);

CREATE TABLE `contiene` (
  `factura_codigo` int unique,
  `producto_codigo` int NOT NULL,
  `id` int not null,
   PRIMARY KEY (`id`)
);

CREATE TABLE `foto` (
  `ruta` varchar(20) not null,
  `fecha` timestamp NOT NULL,
  `id` int unique not null auto_increment,
   PRIMARY KEY (`id`)
);

CREATE TABLE `stiene` (
  `servicio_codigo` int not null,
  `foto_id` int unique not null,
   PRIMARY KEY (`foto_id`)
);

CREATE TABLE `ptiene` (
  producto_codigo int not null,
  `foto_id` int unique not null,
   PRIMARY KEY (`foto_id`)
);




/*Clave foranea de usuario-inicio-sesion*/

Alter table `inicio`
add constraint fk_sesion__inicio
foreign key (sesion_id)
references sesion(id)
on update cascade
on delete cascade;

Alter table `inicio`
add constraint fk_usuario_inicio
foreign key (usuario_nombre)
references usuario(nombre)
on update cascade
on delete cascade;

/*Clave foranea de usuario-recibe-factura*/

Alter table `recibe`
add constraint fk_factura_recibe
foreign key (factura_codigo)
references factura(codigo)
on update cascade
on delete cascade;

Alter table `recibe`
add constraint fk_usuario_recibe
foreign key (usuario_nombre)
references usuario(nombre)
on update cascade
on delete cascade;

/*Clave foranea de usuario-abona-factura */

Alter table `abona`
add constraint fk_usuario_abona
foreign key (usuario_nombre)
references usuario(nombre)
on update cascade
on delete cascade;

Alter table `abona`
add constraint fk_factura_abona
foreign key (factura_codigo)
references factura(codigo)
on update cascade
on delete cascade;

/*Clave foranea de usuario-tiene-datospersonales*/

Alter table `tiene`
add constraint fk_usuario_tiene
foreign key (usuario_nombre)
references usuario(nombre)
on update cascade
on delete cascade;

Alter table `tiene`
add constraint fk_datospersonales_tiene
foreign key (datospersonales_ci)
references datospersonales(ci)
on update cascade
on delete cascade;

/*Clave foranea de usuario-solicita-servicio*/

Alter table `solicita`
add constraint fk_usuario_solicita
foreign key (usuario_nombre)
references usuario(nombre)
on update cascade
on delete cascade;

Alter table `solicita`
add constraint fk_servicio_solicita
foreign key (servicio_codigo)
references servicio(codigo)
on update cascade
on delete cascade;

/*Clave foranea de usuario-compra-producto*/

Alter table `compra`
add constraint fk_usuario_compra
foreign key (usuario_nombre)
references usuario(nombre)
on update cascade
on delete cascade;

Alter table `compra`
add constraint fk_producto_compra
foreign key (producto_codigo)
references producto(codigo)
on update cascade
on delete cascade;

/*Clave foranea de factura-contiene-producto*/

Alter table `contiene`
add constraint fk_factura_contiene
foreign key (factura_codigo)
references factura(codigo)
on update cascade
on delete cascade;

Alter table `contiene`
add constraint fk_producto_contiene
foreign key (producto_codigo)
references producto(codigo)
on update cascade
on delete cascade;

/*Clave foranea de usuario-vende-producto*/

Alter table `vende`
add constraint fk_usuario_vende
foreign key (usuario_nombre)
references usuario(nombre)
on update cascade
on delete cascade;

Alter table `vende`
add constraint fk_producto_vende
foreign key (codigo)
references producto(codigo)
on update cascade
on delete cascade;

/*Clave foranea de usuario-ofrece-servicio*/

Alter table `ofrece`
add constraint fk_usuario_ofrece
foreign key (usuario_nombre)
references usuario(nombre)
on update cascade
on delete cascade;

Alter table `ofrece`
add constraint fk_servicio_ofrece
foreign key (codigo)
references servicio(codigo)
on update cascade
on delete cascade;

/*Clave foranea de servicio-stiene-fotos*/

Alter table `stiene`
add constraint fk_servicio_stiene
foreign key (servicio_codigo)
references servicio(codigo)
on update cascade
on delete cascade;

Alter table `stiene`
add constraint fk_foto_stiene
foreign key (foto_id)
references foto(id)
on update cascade
on delete cascade;


/*Clave foranea de producto-ptiene-fotos*/

Alter table `ptiene`
add constraint fk_producto_ptiene
foreign key (producto_codigo)
references producto(codigo)
on update cascade
on delete cascade;

Alter table `ptiene`
add constraint fk_foto_ptiene
foreign key (foto_id)
references foto(id)
on update cascade
on delete cascade;



/*

CREATE TABLE `administrador` ( ###
  `cod_admin` varchar(8) unique,
  `contraseña` varchar(20) NOT NULL,
  `correo` varchar(20) not null;
   PRIMARY KEY (`cod_admin`)
);
/*
create table usuario(
    nombre varchar(9) not null unique primary key,
    fecha_nac date not null default '1980-01-01'
)

insert into 
usuario
(nombre, fecha_nac)
values
('fulano','2001-10-25');

insert into 
usuario
(nombre)
values
('fulano');

*/
