<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>


# Social-Wires API
1.Clonar proyecto
## Instalacciones
2. Instalar las Dependencias
```yarn install```
3. Clonar el archivo ```env.template```  y renombrarlo a   ```.env```
4. Cambiar las variables de entorno
## Running the app
5. Levantar la base de datos
```docker-compose up -d```
6. Levantar el proyecto ```yarn run start:dev```

Debido a la seguridad de la api se pasan los usuarios que crean mensajes , comentarios y reacciones se pasan por medio del backend ya que se toman de la request

Se implemeto una funcion que permite enviar un mensaje al correo del usuario registrado, dandole la bienvenida a la pagina 

