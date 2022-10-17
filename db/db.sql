CREATE DATABASE IF NOT EXISTS ecommerce;

USE ecommerce;

drop table t_productos;

CREATE TABLE t_productos (
    id INT(11) NOT NULL AUTO_INCREMENT, 
    fechaAltaProducto DATETIME DEFAULT NULL, 
    nombreProducto varchar (255) NOT NULL,
    descripcionProducto varchar (255) NOT NULL,
    marcaProducto varchar (255) NOT NULL, /*Debría se una clave foránea, por simplicidad, dejamos como varchar*/
    modeloProducto varchar (255) NOT NULL, /*Debría se una clave foránea, por simplicidad, dejamos como varchar*/
    categoriaProducto varchar (255) NOT NULL, /*Debría se una clave foránea, por simplicidad, dejamos como varchar*/
    precioProducto decimal (18, 2) NOT NULL,
    nombreVendedor varchar (255) NOT NULL,  /*Debría se una clave foránea, por simplicidad, dejamos como varchar*/
    estadoProducto varchar (100) NOT NULL,  /*Debría se una clave foránea, por simplicidad, dejamos como varchar*/
    imagenProducto varchar (255) NOT NULL,
    stockDisponible INT(5) NOT NULL, 
    PRIMARY KEY(id) );
    

show tables;
describe t_productos;

insert into t_productos 
values (1,'20220101', "Monitor gamer Samsung F24T35 led 24", "Este monitor de 24' te va a resultar cómodo para estudiar, trabajar o ver una película en tus tiempos de ocio. Asimismo, su resolución de 1920 x 1080 te permite disfrutar de momentos únicos gracias a una imagen de alta fidelidad.", "Samsung", "F24T35", "Monitores", 51299, "ElectronicaRC", "Nuevo", "https://www.computershopping.com.ar/Images/Productos/Grandes/LF27T350FHL_Foto0g.jpg", 100 );
 
insert into t_productos 
values (2,'20220102', "Celular Moto G41 128 GB dorado amanecer 4 GB RAM", "Fotografía profesional en tu bolsillo
Descubrí infinitas posibilidades para tus fotos con las 3 cámaras principales de tu equipo. Poné a prueba tu creatividad y jugá con la iluminación, diferentes planos y efectos para obtener grandes resultados.", "Motorola ", "G41", "Celulares y Smartphones", 49999, "ElectronicaRC", "Nuevo", "https://tiendacentro.com/wp-content/uploads/2022/05/MotoG41-NegroOnix-Dual.webp", 50 );
 

select * from t_productos