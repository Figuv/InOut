# InOut
# Manual Técnico
## Control Ingreso-Salida

## INTRODUCCIÓN
La aplicación web Ingreso-Salida es una solución para el control de tareas de estudiantes becados en la Universidad del Valle. Esta aplicación permite el seguimiento y control de las tareas asignadas a los estudiantes, así como la recepción de comprobantes de tarea completada para su verificación.

## Descripción del proyecto
Control Ingreso-Salida es una aplicación web que permite a los administradores asignar y controlar tareas para estudiantes becados de la universidad. Los estudiantes pueden ser asignados a equipos y tienen la capacidad de subir comprobantes de tareas completadas. Los administradores pueden revisar estos comprobantes para determinar si las tareas fueron cumplidas correctamente.

## Roles / Integrantes
La aplicación se divide en dos roles principales:

- Administradores: Encargados de asignar y controlar tareas para estudiantes becados.
- Estudiantes: Estudiantes de la universidad que poseen una beca y tienen asignadas tareas para completar.

## Arquitectura de Software
La arquitectura de software utilizada en Control Ingreso-Salida sigue un enfoque de cliente-servidor. En el lado del cliente, se utiliza una aplicación web que se ejecuta en un navegador. En el lado del servidor, se utiliza un servidor web y una base de datos para almacenar y procesar la información relacionada con las tareas y los usuarios.

## Requisitos del sistema
### Requerimientos de Hardware:
- Dispositivo móvil: Administrador y Estudiante.
### Requerimientos de Software:
- Dispositivo con conexión a internet: Smartphone, tablet, computadora.
- Sistema operativo: iOS, Android, Windows, Linux, etc.
### Requerimientos de Hardware (Servidor/Hosting/BD):
- Se requiere un servidor o servicio de hosting con capacidad suficiente para alojar la aplicación web y la base de datos correspondiente.
### Requerimientos de Software (Servidor/Hosting/BD):
- Se requiere un servidor web compatible con las tecnologías utilizadas en la aplicación, así como un sistema de gestión de bases de datos para almacenar la información necesaria.

## Instalación y configuración
La instalación y configuración de la aplicación es sencilla, ya que se trata de una aplicación web. Solo se requiere una conexión a internet y un navegador web compatible para acceder a la aplicación.

## Procedimiento de hosteo/Hosting (Configuración)
Para alojar la aplicación en la web, se utiliza la plataforma Netlify debido a su comodidad y a que su plan gratuito ofrece los recursos necesarios para el momento actual. El enlace proporcionado a continuación es donde se encuentra alojada la aplicación:
[Control Ingreso-Salida](https://thriving-fudge-100e6a.netlify.app/)

## Git
El código fuente de la aplicación se encuentra disponible en el siguiente repositorio de GitHub:
[Repositorio GitHub](https://github.com/Figyuv/InOut.git)

## Personalización y configuración
La aplicación permite la personalización de ciertos aspectos visuales, como la interfaz de usuario y los mensajes de error. Estas personalizaciones se pueden realizar modificando los archivos de estilo y configuración correspondientes.

## Seguridad
La aplicación Control Ingreso-Salida implementa medidas de autenticación y autorización para garantizar la seguridad de los usuarios. Algunas características de seguridad incluyen:

- Autenticación de usuarios para garantizar que solo los usuarios registrados puedan acceder a la aplicación.
- Autorización de funciones restringidas basadas en roles de usuario para garantizar que los estudiantes no tengan acceso a funcionalidades administrativas y viceversa.

## Depuración y solución de problemas
En caso de encontrarse con problemas o errores durante el uso de la aplicación, se recomienda revisar los registros de errores, realizar pruebas de conexión a internet y verificar la configuración del entorno. Para solucionar problemas más complejos, se puede utilizar un enfoque de depuración paso a paso y realizar pruebas exhaustivas.

## Glosario de términos
- Control Ingreso-Salida: Nombre de la aplicación.
- Administrador: Rol de usuario encargado de asignar y controlar tareas.
- Estudiante: Rol de usuario correspondiente a estudiantes becados de la universidad.
- Tareas: Actividades asignadas a los estudiantes para completar.
- Comprobantes de tarea: Documentos o evidencias subidas por los estudiantes para demostrar la finalización de una tarea.

---

### Ejecución local del proyecto
Para ejecutar el proyecto de forma local, sigue los pasos a continuación:

1. Clona el repositorio desde GitHub:
git clone https://github.com/Figyuv/InOut.git

2. Navega al directorio del proyecto:
cd InOut

3. Instala las dependencias del proyecto utilizando npm:
npm install

4. Inicia la aplicación en modo de desarrollo:
npm start

5. Inicia la aplicacion en version web
w

6. Abre tu navegador y visita `http://localhost:19006` para ver la aplicación en funcionamiento de forma local(o en su defecto, el puerto que indica la terminal).
 
Con estas adiciones, ahora el manual técnico incluye tanto el contenido original como las instrucciones para correr el proyecto localmente.


