*"TP-Stock-Controller"*

**Iniciar**

Se debe crear la base de datos con nombre "Stock" en postgreSQL.
(o cambiarle el string de conexion)

Dentro de la carpeta "trabajo" se encuentra el archivo "iniciar.cmd" y su acceso directo, es un archivo de comandos de consola que inicializa el servidor y la aplicacion angular

**Detalles**

Dentro de la carpeta "guias" se encuentras unas pequeñas guias que escribi mientras realizaba la aplicacion con algunos detalles de el manejo de angular y del servidor node.

**Descripcion**
Esta es una aplicacion Angular para el control y el manejo de Stock.
Se utiliza un api Rest express con sequalize
En esta aplicacion se utiliza una base de datos PostgreSQL (puede cambiarse en el string de coneccion)


**extras y detalles del funcionamiento de la aplicacion**

El servidor utiliza el puerto 3000
La aplicacion utiliza el puerto 4200

El aumento o el control del numero de las facuras emitidas por otros proveedores o por otras empresas son controladas por los que la emiten.

Cuando se inicia la creacion de una nueva factura(de compra o de venta) se genera una nueva factura "null" en la base de datos y luego se completa al finalizar y guardad la factura actual. Esto es asi para poder utilizar el "id" de la factura para relacionarla con los items agregados en la factura.


