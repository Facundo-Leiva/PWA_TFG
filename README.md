--- Requisitos Para Hacer Funcionar El Sistema ---

--> Deberas instalar en tu ordenador:
    > Node: https://nodejs.org/es/download
    > PostgreSQL: https://www.postgresql.org/download/
    > Visual Studio Code (recomendado): https://code.visualstudio.com/download
    > pgAdmin4 (opcional, para ver cambios en la base de datos): https://www.pgadmin.org/download/

--> En Visual Studio Code, o el editor de codigo que elijas, clona este repositorio, mediante el comando:
  git clone https://github.com/Facundo-Leiva/PWA_TFG

--> Una vez clonado, te recomiendo abrir las siguientes terminales: un CMD llamado "Backend" y otro llamado "Frontend".
  Una vez hecho esto, deberas instalar las dependencias necesarias, para ello, dirigete a los terminales creados y ejecuta los siguientes comandos:
  
  Dentro de CMD Backend: 
  cd backend
  npm install
  
  Dentro de CMD Frontend:
  cd frontend
  npm install

--> El siguiente paso sera restaurar la base de datos: en el repositorio se encuentra el archivo "backup_data_base.sql",
  este contiene la base de datos necesaria para que funcione en correctas condiciones este sistema, para poder restaurar la base de datos,
  anteriormente deberias haber instalado PostgreSQL, siguiendo los pasos que te indica.
  Dentro de pgAdmin4 podras crear una base de datos vacia, sino, desde una terminal CMD nueva, ejecuta el siguiente comando:

  ...

--> Ahora, tendras que crear tu archivo ".env" dentro de la carpeta backend del proyecto.
  Lo que debera contener esta en el archivo ".env.example" que esta dentro del repositorio,
  podras copiar y pegar o simplemente mover este mismo archivo y cambiarle el nombre.
  Dentro del mismo, deberas cambiar los valores de la "database_url" segun corresponda en tu caso,
  y la clave de verificacion de tokens "JWT", para la cual deberas introducir un codigo que podras crear
  desde "powershell" de Windows ejecutando el siguiente comando:
  
  $k=New-Object byte[] 32;[System.Security.Cryptography.RandomNumberGenerator]::Create().GetBytes($k);[Convert]::ToBase64String($k)
  
  Este codigo generara tu clave la cual colocaras en el archivo ".env" donde se indica.

--> Una vez llevados a cabo todos estos pasos, estaras en condiciones de hacer funcionar el sistema, para ello, sigue estos ultimos pasos:
  Desde las terminales de CMD creadas anteriormente, ejecuta:
  
  Dentro de CMD Backend:
  npm run start:dev
  
  (Si funciona correctamente, deberas ver que la aplicacion Nest comienza a inicializar las dependencias del codigo con las funciones del sistema)
  
  Dentro de CMD Frontend:
  npm run dev
   
  (Si funciona correctamente, VITE te proveera una direccion localhost que copiaras y pegaras como URL en tu navegador, accediendo asi a la pagina web)
  
  Ahora podras utilizar la pagina web en desarrollo y sus funciones, ademas, podras utilizar "pgAdmin4" de PostgreSQL para ver cambios en la base de datos.
  
