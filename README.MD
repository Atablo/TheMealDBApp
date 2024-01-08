# Proyecto API/REST

### Uso de la api de TheMealDB

Hecho por:

- Saúl Barrajón Ortiz
- Yiyang Ji (Johnny)
- Pablo Atahonero García de Blas

</br></br></br>


<h2>Funcionalidades destacables de la aplicación</h2>

<p>En nuestra aplicación un usuario puede realizar las siguientes funciones: </br>
-Buscar una comida por su nombre o por parte de su nombre. </br>
-Filtrar por tres, dos o incluso un parámetro las comidas resultantes de las búsquedas por su nombre. </br>
-Buscar comidas que incluyan un ingrediente introducido. </br>
-Buscar comidas que incluyan un ingrediente que se ha seleccionado desde una de las cartas que nos muestra una comida. </br>
-Filtrar por tres, dos o incluso un parámetro las comidas resultantes de las búsquedas por uno de sus ingredientes. </br>
-Volver a la página principal gracias al logo situado en la cabecera de la barra de navegación. </br>
Además la aplicación proporcionará un feedback cuando haya un error en la búsqueda, no existan alimentos con los parámetros de búsqueda especificados o no se haya introducido bien el término a buscar en cualquiera de las dos búsquedas.</p>


</br></br>


<h2>Funcionamiento a nivel de usuario de la aplicación</h2>

<p>Disponemos de la página principal, en la cabecera tenemos una imagen de logo, como elemento de navegación, que permite ir a la página principal. Seguido 2 tipos de búsqueda, que son:</p></br>

<ul>
<li>Búsqueda de platos por nombre: permite que el usuario introduzca un nombre y realice la búsqueda de todos los platos que incluyan el nombre introducido. En caso de dejarlo vacío se le avisará al usuario de introducir algo, y está controlado de forma que el usuario introduzca únicamente letras (espacios incluidos). </li>

<li>Búsqueda de platos por ingrediente: permite que el usuario introduzca un nombre y realice la búsqueda de todos los platos que contengan el ingrediente introducido. En caso de dejarlo vacío se le avisará al usuario de introducir algo, y está controlado de forma que el usuario introduzca únicamente letras (espacios incluidos). También hay un datalist que ayudará al usuario a rellenar el campo, que incluye todos los ingredientes de la API.</li>

</ul>

</br>

<p>Siguiendo con el contenido, se le muestra al usuario un cuadro de introducción, seguido de 8 platos aleatorios como presentación de la página, donde se incluye información como es la imagen del plato, la categoría, el país, el nombre, los 4 ingredientes principales y las etiquetas del plato. </br>
El usuario puede hacer clic en las imágenes de los ingredientes, mostrándole todos los platos que se pueden realizar con dicho ingrediente.</p>

<p>Cuando el usuario realiza cualquier búsqueda o realiza clic en alguno de los ingredientes, le aparecerá un cuadro de filtros, donde permiten al usuario buscar un o varios platos específicos que cumplan el requisito seleccionado. Los filtros que hemos implementado han sido 3, y son: </br>
-Filtro por país: el filtro permite que se muestren únicamente los platos del país seleccionado. </br>
-Filtro por categoría: el filtro permite que se muestren únicamente los platos con la categoría seleccionada. </br>
-Filtro por etiquetas: el filtro permite que se muestren únicamente los platos con la etiqueta seleccionada. </br>
Estos filtros permiten al usuario utilizarlos tanto por separado como de manera simultánea.
</p>


</br></br>


<h2>Funciones principales de nuestro código de javaScript</h2>

**Métodos del archivo “searchByName.js”**: </br>
-function resetearFiltros: es una función que da funcionalidad a un botón que resetea los filtros, dejándolos como antes de introducir parámetros en ellos. </br>
-function pintaComidas: función que sirve para pintar los array de platos que se han obtenido en formato JSON en los cards por pantalla. </br>
-function establishFlag: función que sirve para establecer la ruta de la imagen de la bandera asociado a un cierto país. </br>
-function printTags: función que imprime todas las etiquetas de una comida en su determinado card. </br>
-function getMealsByName: función asíncrona que nos devuelve un listado de comida en función a un input dado por el usuario gracias a uno de los links que nos proporciona la API. </br>
-function getAllCategories: función asíncrona que nos devuelve un listado de las categorías existentes en la base de datos gracias a uno de los links que nos proporciona la API en que nos devuelve un listado completo de las categorías presentes en la base de datos. </br>
-function aplicarFiltrosSeleccionados: ésta es una función que filtra los resultados obtenidos de una búsqueda. Parte de la búsqueda que se ha realizado y de ahí comenzamos a limpiar una copia del array que hemos obtenido de la búsqueda. </br>
-function pintaComidasFiltradas: esta es una función que sirve para imprimir el array anteriormente mencionado una vez esté limpio. Esta función se ha hecho porque  “pintaComidas” trabaja con un array con 2 anidamientos,mientras que esta función trabaja con un array que contiene un solo anidamiento. </br>

**Funciones del archivo “searchByIngredient.js”**: </br>
-function getIngredientsByName: función asíncrona que nos devuelve un objeto de arrays haciendo uso del nombre introducido en el campo de búsqueda por nombre. </br>
-function getAllIngredients: función asíncrona que nos devuelve un objeto de arrays de todos los ingredientes que hay en la base de datos de la API. </br>
-function showRandomMeals: función asíncrona que nos devuelve un objeto que contiene un plato aleatorio. </br>
-function validarIngrediente: función que sirve para comprobar que el dato introducido en el campo de búsqueda por ingrediente sea válido(no es un espacio,no es un carácter especial ni un número). </br>
-function validarNombre: función que sirve para comprobar que el dato introducido en el campo de búsqueda por nombre sea válido. </br>
-function pintarMeals: función que sirve para pintar los array de platos que se han obtenido en formato JSON en los cards por pantalla. </br>
-function printTags: función que sirve para pintar las etiquetas por pantalla a las distintas comidas en sus cards.

</br>

Para acceder a la página haga click en [este enlace](https://pabloatahonerogdb.github.io/TheMealDBApp/).
