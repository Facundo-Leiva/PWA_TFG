--- Requisitos Para Hacer Funcionar El Sistema ---

--> Deberás instalar en tu ordenador:
    > Node: https://nodejs.org/es/download
    > PostgreSQL: https://www.postgresql.org/download/
    > Visual Studio Code (recomendado): https://code.visualstudio.com/download
    > pgAdmin4 (para configurar la base de datos): https://www.pgadmin.org/download/

--> En Visual Studio Code, o el editor de código que elijas, clona este repositorio, mediante el comando:
  git clone https://github.com/Facundo-Leiva/PWA_TFG

--> Una vez clonado, te recomiendo abrir las siguientes terminales: un CMD llamado "Backend" y otro llamado "Frontend".
  Una vez hecho esto, deberás instalar las dependencias necesarias, para ello, dirigete a los terminales creados y ejecuta los siguientes comandos:
  
  Dentro de CMD Backend: 
  cd backend
  npm install
  
  Dentro de CMD Frontend:
  cd frontend
  npm install

--> El siguiente paso será restaurar la base de datos: en el repositorio se encuentra el archivo "backup_data_base.sql",
  este contiene la base de datos necesaria para que funcione en correctas condiciones este sistema, para poder restaurar la base de datos,
  anteriormente deberías haber instalado PostgreSQL, siguiendo los pasos que te indica.
  Dentro de pgAdmin4 deberás crear una base de datos vacia, ahora buscaremos el SQL Shell que deberia haberse instalado con PostreSQL.
  Dentro del mismo, ejecutaremos el siguiente comando:
  
  \i 'C:/Users/Facun/Downloads/sistemaClonado/PWA_TFG/backup_data_base.sql'

  Este es un ejemplo, deberás remplazar los datos segun corresponda, recuerda usar '/' y comillas simples.

--> Ahora, tendrás que crear tu archivo ".env" dentro de la carpeta backend del proyecto.
  Lo que debera contener esta en el archivo ".env.example" que esta dentro del repositorio,
  podras copiar y pegar o simplemente mover este mismo archivo y cambiarle el nombre.
  Dentro del mismo, deberás cambiar los valores de la "database_url" segun corresponda en tu caso,
  y la clave de verificación de tokens "JWT", para la cual deberás introducir un codigo que podras crear
  desde "powershell" de Windows ejecutando el siguiente comando:
  
  $k=New-Object byte[] 32;[System.Security.Cryptography.RandomNumberGenerator]::Create().GetBytes($k);[Convert]::ToBase64String($k)
  
  Este código generara tu clave la cual colocarás en el archivo ".env" donde se indica.

--> Una vez llevados a cabo todos estos pasos, estaras en condiciones de hacer funcionar el sistema, para ello, sigue estos últimos pasos:
  Desde las terminales de CMD creadas anteriormente, ejecuta:
  
  Dentro de CMD Backend:
  npm run start:dev
  
  (Si funciona correctamente, deberás ver que la aplicacián Nest comienza a inicializar las dependencias del código con las funciones del sistema)
  
  Dentro de CMD Frontend:
  npm run dev
   
  (Si funciona correctamente, VITE te proveera una dirección localhost que copiarás y pegarás como URL en tu navegador, accediendo así a la página web)
  
  Ahora podrás utilizar la pagina web en desarrollo y sus funciones, además, podrás utilizar "pgAdmin4" de PostgreSQL para ver cambios en la base de datos.
  
