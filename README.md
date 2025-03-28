# Vuetify (Default)

Esta es la plataforma de eCommerce de la empresa soluciones AF.

----- feature sprint1

#Commit setUp
Se crea los archivos del proyecto con Vuetify, se crean componentes para el proyecto y se configura la barra de navegación.

![image](https://github.com/user-attachments/assets/2a564f46-8c9c-48ff-ab26-48fde738fa12)

#Commit home top page
Se agregan imagenes de ejemplo para la maquetación del proyecto, se agrega un carrusel y un listado de articulos de referencia.

![image](https://github.com/user-attachments/assets/ff4e2a62-7b6e-4b1e-b8a3-91a703e95f9b)

#commit home botton page
Se agrega la lógica de manejo de productos populares y otros productos presentados modificando Featured, Popular y Index.

![image](https://github.com/user-attachments/assets/61609c4b-5d61-4698-83c7-5db9f960d8ca)

#commit client and footer
Se crea el componente de cliente, con las ofertas del dia y un apartado extra con productos que tienen el boton de compra, 
se coloca el pie de pagina por defecto de vutefy.

![image](https://github.com/user-attachments/assets/60b8cfc5-1291-4ea0-a732-ab1a08249130)

#Merge Feature/sprint1 to main
Se hace merge de la primera entrega a la rama principal del proyecto.

-----

----- feature sprint2 

#Commit Login page 
Se instala Pinia para el manejo de usuario en la aplicación. Se crea una pantalla para inicio de sesión, registrar usuario, 
olvido contraseña básica con validaciones simples.

#Commit Adjustment login and notification
Se ajusta los formularios del login, mejorandose aspectos visuales, imagenes, labels, entre otros. Se crea una pantalla de notificación
que funciona de manera transversal a toda la aplicación con el objetivo de mostrar las alertas de una manera agradable para el usuario.

#Commit Login page rules
Se instala el paquete date-fns, se termina de configurar pinia para el manejo de usuarios, se agrega reglas de validación para los
formularios, se mejora aspectos visuales de la pantalla de login. 

Pantalla inicial de login con sus respectivas validaciones y opciones.

![image](https://github.com/user-attachments/assets/24394bb3-4a9f-4704-83b1-4cc66e5fe10c)

Pantalla de registro de usuario con las validaciones del formulario, mensajes de notificaciones.

![image](https://github.com/user-attachments/assets/64f9d7bc-0f11-4e33-94d4-634e792480fb)

Pantalla de recuperación de clave mediante código OTP paso 1 diligenciamento del correo.

![image](https://github.com/user-attachments/assets/533fcb5f-a9b6-47f6-9aed-9354967faea5)

Pantalla de recuperación de clave mediante código OTP paso 2 verificación otp con un sistema de 3 intentos disponibles.

![image](https://github.com/user-attachments/assets/cf48dd56-b541-4e29-938c-12b0e7784769)

Pantalla de recuperación de clave mediante código OTP paso 3 restablecer contraseña.

![image](https://github.com/user-attachments/assets/26e03e48-ffcb-4a52-af5f-553edcf2b550)

Pantalla inicial del ecommerce luego de iniciar sesión donde se muestra la información del usuario logeado.

![image](https://github.com/user-attachments/assets/460facae-e19c-404f-9382-6794d1cb5cc7)

#Merge Feature/sprint2 to main
Se hace merge de la segunda entrega a la rama principal del proyecto.

-----

----- feature sprint3

#Commit Manage routes and environments
Se installa Axios para realizar las peticiones http que van a alimentar el frontend. Se crea archivos de ambientes de dev y producción, 
allí se podrán especificar las rutas de las apis que van a ser consumidas, por el momento se manejará con json web server con el archivo
db.json. Se cambian los datos estaticos a los creados en el archivo db json.

Cargue de información de inicio a través de peticiones http
![image](https://github.com/user-attachments/assets/9861f8e4-8aee-4699-b7ef-e0952389f15f)

Barra de navegación

![image](https://github.com/user-attachments/assets/96a92808-16e8-4b2a-a19b-37940fe8a89b)

#Commit Mapping endpoints to static methods
Se instala uuid, se crea modelos de request y response para el manejo de peticiones, se alimenta la funcionalidad de la pantalla de inicio
con las peticiones creadas mediante json server, se finaliza la lógica de inicio de sesión, creación de usuario y recuperación de clave mediante los endpoints correspondientes.

Peticiones de obtener usuarios, crear usuario y actualizar clave de usuario
![image](https://github.com/user-attachments/assets/2cad51a4-1f54-4f1c-8177-61bf6b1b6f5f)

Cuerpo de las peticiones
![image](https://github.com/user-attachments/assets/36aa2a05-8150-4b67-bd3a-47026d0daba5)

#Commmit Manage products
Se crea la pantalla de administración de productos donde se visualiza los productos y permite hacer el crud mediante json web server.
Adicionalmente, se configura el lenguaje del proyecto a español, se crea un modelo para productos y se agregan validaciones, modales
para facilitar el manejo de productos.

Pantalla de gestión de productos
![image](https://github.com/user-attachments/assets/77910523-7e7a-4e89-a1fc-720d23cd17aa)

Filtrado de productos por nombre
![image](https://github.com/user-attachments/assets/a4b71019-c3f0-4fff-8e42-f61f683b932a)

Modal de agregar productos con validaciones
![image](https://github.com/user-attachments/assets/dba1f367-63a7-402e-bbab-6065b4186a15)

Modal de editar producto

![image](https://github.com/user-attachments/assets/ac4b5ed5-f87b-409c-8281-2e74e83d17a6)

Modal de confirmar la eliminación de un producto
![image](https://github.com/user-attachments/assets/d78f7ed2-81b1-47b8-86ba-1bb28e011e68)

Peticiones CRUD con json web server
![image](https://github.com/user-attachments/assets/e0621687-3d22-4187-9cd0-f73889443d53)

#Merge feature/sprint3 to main

-----

----- feature sprint5

#Commit Connections backend, fix pages, buy and resume page added
Se modifica los ambientes para almacenar las rutas de los endpoints, se crea modelos de requests y responses para las peticiones del
backend, se corrigen los nombres y las peticiones para dejar de utilizar json web server y comunicarse con el web api. Se agregan
las nuevas rutas de las páginas, un interceptor que valida la expiración del token que redirige al login, se toma en cuenta los roles 
de los usuarios como permisos de la plataforma. Se agregan el sistema de ordenes de compra y venta que funciona sin pasarelas de pago.

Crud de productos el campo categoria ahora es un desplegable obtenido desde la db
![image](https://github.com/user-attachments/assets/457b3f15-7c7e-44bb-81cc-03b2f7ec9609)

Página para realizar las ordenes y/o compra de productos, carrito agregado en la barra de navegacion
![image](https://github.com/user-attachments/assets/398a1667-f05e-4978-b857-b67aefaaac3a)

Interceptor que redirige al inicio si el usuario no esta logeado o no tiene permisos, en este caso administrar productos
![image](https://github.com/user-attachments/assets/0d985d76-b5c3-41e8-913c-dc94cc8a3674)

Agregar productos al carrito, si el producto ya existe entonces se suma a la cantidad en el carro
![image](https://github.com/user-attachments/assets/c0be4dac-539a-4ac2-88bb-96c4f74bbf1c)

Carrito de compra para el usuario logeado con sus posibles acciones
![image](https://github.com/user-attachments/assets/79c6e5c2-47c2-4f99-8373-d48c8a3c9cfd)

Se reduce en dos la cantidad del primer producto, se agrega uno al tercero, se borra el cuarto y se realiza el pago
![image](https://github.com/user-attachments/assets/c54158d7-cfb7-4024-9726-29b79cacff68)

Resumen de las peticiones realizadas por el front con foco en la de realizar la compra
![image](https://github.com/user-attachments/assets/cf303a4c-3841-4aa7-a50c-3901c80f9680)

#Merge feature/sprint5 to main

-----

----- feature sprint5

#Commit Chatbot integration
Se crea un nuevo componente para la integración del chatbot de openAi para la plataforma ecommerce que va a funcionar
a través de un iframe que podrá ser accedido desde cualquier parte del aplicativo.


-----
Copyright (c) 2016-present Vuetify, LLC
