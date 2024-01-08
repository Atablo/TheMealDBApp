# Proyecto API/REST

### Uso de la api de TheMealDB

Hecho por:

- Saúl Barrajón Ortiz
- Yiyang Ji (Johnny)
- Pablo Atahonero García de Blas

</br></br></br>

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

</br>

Para acceder a la página haga click en [este enlace](https://pabloatahonerogdb.github.io/TheMealDBApp/).
