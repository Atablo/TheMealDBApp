//capturamos el formulario donde el usuario hará la busqueda de comida
let formulario = document.getElementById("searchByName");
//capturamos la plantilla de cada plato y el contenedor donde irán los resultados
let plantilla = document.getElementById("meal").content;
let divResultados = document.getElementById("results");

//Ponemos todos los url necesarios para construir los diferentes url más tarde a los que haremos fetch
const urlComidas = "https://www.themealdb.com/api/json/v1/1/search.php";
const urlFotoIngredientes = "https://www.themealdb.com/images/ingredients/";
const listCategories = "https://www.themealdb.com/api/json/v1/1/list.php?c=list";

//capturamos también el mensaje donde le mostraremos un mensaje al usuario si la busqueda no existe
let mensajeWeb = document.getElementById("webMessage");

//capturamos los botones de aplicar y  reestablecer los filtros
let btnaplicarFiltros = document.getElementById("applyFilters");
let btnresetFiltros = document.getElementById("resetFilters");

//arrays para ver la correspondencia entre  la abreviación del pais y la abreviación de las banderas según la API
const region = [
  "British",
  "American",
  "French",
  "Canadian",
  "Jamaican",
  "Chinese",
  "Dutch",
  "Egyptian",
  "Greek",
  "Indian",
  "Irish",
  "Italian",
  "Japanese",
  "Kenian",
  "Malaysian",
  "Mexican",
  "Moroccan",
  "Croatian",
  "Norwegian",
  "Portuguese",
  "Russian",
  "Argentinian",
  "Spanish",
  "Slovakian",
  "Thai",
  "Arabian",
  "Vietnamese",
  "Turkish",
  "Syrian",
  "Argelian",
  "Tunisian",
  "Polish",
  "Filipino",
];

const countryFlags = [
  "gb",
  "us",
  "fr",
  "ca",
  "jm",
  "cn",
  "nl",
  "eg",
  "gr",
  "in",
  "ie",
  "it",
  "jp",
  "kn",
  "my",
  "mx",
  "ma",
  "hr",
  "no",
  "pt",
  "ru",
  "ar",
  "es",
  "sk",
  "th",
  "sa",
  "vn",
  "tr",
  "sy",
  "dz",
  "tn",
  "pl",
  "ph",
];

//lo primero que hacemos es esconder los filtros al entrar por primera vez en la página
document.querySelector("#filtros").style.display = "none";

//Aquí tenemos la funcion para resetear los filtros
btnresetFiltros.addEventListener("click", (e) => resetearFiltros());

function resetearFiltros() {
  document.getElementById("pais").getElementsByTagName("option")[0].selected = "selected";
  document.getElementById("categoria").getElementsByTagName("option")[0].selected = "selected";
  document.getElementById("etiqueta").getElementsByTagName("option")[0].selected = "selected";
}

/////////////////////////////////////////////Busqueda por nombre////////////////////////////////
//primero declaramos la variable nombreComida una vez
let nombreComida;

/*Cuando se haga click en buscar frenaremos el envío del formulario y
pondremos la variable nombreIngrediente2 a null para que no confunda esta busqueda de comida por nombre
con la que se hará luego en searchByIngredient


*/

formulario.addEventListener("submit", (e) => {
  e.preventDefault();

  //Si el párrafo de la busqueda por ingrediente contiene la clase "error-feedback":
  if (
    document.querySelector("#nombreIngrediente").parentNode.parentNode.querySelector(".text-danger").classList.contains("error-feedback")
  ) {
    //Removemos el texto en el párrafo del html en caso de haberlo
    document.querySelector("#nombreIngrediente").parentNode.parentNode.querySelector(".error-feedback").textContent = "";
    //Y removemos al padre del input la clase "error" en caso de haberlo
    document.querySelector("#nombreIngrediente").parentNode.classList.remove("error");
  }

  document.querySelector("#nombreIngrediente").value = "";

  //Nombre ingrediente 2 se utiliza para utilizarlo en el filtrado de las comidas buscadas por ingredientes
  nombreIngrediente2 = null;

  let valido = true;

  //capturamos el input donde nos han introducido la comida y lo recortamos
  nombreComida = document.getElementById("mealName");

  if (!validarNombre(nombreComida)) {
    valido = false;
  }

  if (valido) {
    nombreComida = nombreComida.value.trim();

    //llamamos la metodo que nos devuelve el listado de comidas al buscar por un nombre introducido por el usuario
    getMealsByName(nombreComida)
      .then((comidas) => {
        //cuando nos hayan llegado los resultados limpiamos los filtros si los hubiera(pues quizás los hayamos utilzado en una búsqueda anterior)
        resetearFiltros();
        //Vaciamos todo el div de los resultados
        divResultados.innerHTML = "";
        /*Ahora bien,si la lista está no está vacía modificaremos pintaremos las comidas y 
        quitaremos el mensaje de error si lo tenía de antes*/
        if (comidas.meals != null) {
          pintaComidas(comidas);
          if (mensajeWeb.classList.contains("alert-danger")) {
            mensajeWeb.classList.remove("alert-danger");
            mensajeWeb.classList.add("alert-light");
          }
          /*Si la lista no está vacía
          (independientemente de que antes el mensaje web tuviese o no el color rojo que indica el error)
          mostraremos el mensaje de que se han encontrado resultados y añadiremos el cuadro para que pueda filtrar los 
          resultados*/
          mensajeWeb.querySelector("p").innerHTML = "Search results for the meal: <strong>'" + nombreComida + "'</strong>";
          document.querySelector("#filtros").style.display = "block";
        }
      })
      .catch(
        /*Si ha habido un error cambiaré el color del mensaje que aparece en la web y esconderé los filtros*/
        mensajeWeb.classList.remove("alert-light"),
        mensajeWeb.classList.add("alert-danger"),
        (mensajeWeb.querySelector("p").textContent = "No matching results for the meal: '" + nombreComida + "'"),
        (document.querySelector("#filtros").style.display = "none")
      );
    //al realizar la búsqueda borro del input el valor que me había
    document.querySelector("#mealName").value = "";
  }
});

///////////////////////////////////////////////////Imprimir platos/////////////////////////////////////////

function pintaComidas(comidas) {
  //vaciamos el elemento html donde vamosa poner los platos y creamos un fragment
  divResultados.innerHTML = "";
  const fragment = new DocumentFragment();

  /*Para cada comida creamos un clon de la plantilla o elemento <template>*/
  comidas.meals.forEach((comida) => {
    let clone = plantilla.cloneNode(true);
    /*A continuación establecemos toda la información al clon que acabamos de crear*/
    //En este caso,imagen será una variable que se reescriba varias veces en función de nuestras necesidades
    let imagen = clone.querySelector(".mealImage");
    imagen.src = comida.strMealThumb;
    //le ponemos también el pais de la comida
    clone.querySelector("strong.country").textContent = comida.strArea;
    //establecemos el tipo de comida
    clone.querySelector(".type").textContent = comida.strCategory;
    //obtenemos el pais y de paso se lo esccribimos
    let countryName = comida.strArea;
    clone.querySelector("strong.country").textContent = countryName;
    imagen = clone.querySelector(".countryFlag");

    /*Como unas comidas pueden tener un pais desconocido tenemos que contemplar ese caso,y si se da
    no tendría asignada la imagen de una bandera ,por lo que no entraría en el if de abajo*/
    if (clone.querySelector("strong.country").textContent != "Unknown") {
      /*si el pais no es desconocido llamamos a la funcion establish flag,que bsucará la correspondencia entre
      el array de paises y su abrebiatura para construir la url de la imagen de la bandera que necesitamos*/
      imagen.src = establishFlag(countryName);
    } else {
      //si el pais es desconocido es string de la imagen la quitamos pues no existe la bandera de un pais desconocido
      imagen.remove();
    }

    //le ponemos ahora el nombre de la comida
    clone.querySelector(".mealName").textContent = comida.strMeal;
    //ahora le ponemos los nombres de los 4 ingredientes principales
    clone.querySelector(".ingredient1").textContent = comida.strIngredient1;
    clone.querySelector(".ingredient2").textContent = comida.strIngredient2;
    clone.querySelector(".ingredient3").textContent = comida.strIngredient3;
    clone.querySelector(".ingredient4").textContent = comida.strIngredient4;

    /*para construir la foto de los ingredientes necesitamos saber sus nombres y con la variable urlFotoIngredientes
     podremos obtener una imagen de los ingredintes*/
    let imagenIngrediente1 = clone.querySelector(".ingredient1image");
    imagenIngrediente1.src = urlFotoIngredientes + comida.strIngredient1 + ".png";

    let imagenIngrediente2 = clone.querySelector(".ingredient2image");
    imagenIngrediente2.src = urlFotoIngredientes + comida.strIngredient2 + ".png";

    let imagenIngrediente3 = clone.querySelector(".ingredient3image");
    imagenIngrediente3.src = urlFotoIngredientes + comida.strIngredient3 + ".png";

    let imagenIngrediente4 = clone.querySelector(".ingredient4image");
    imagenIngrediente4.src = urlFotoIngredientes + comida.strIngredient4 + ".png";

    //Establecemos tambien las etiquetas con la siguiente función
    printTags(clone, comida);

    //cuando ya tenemos el clon completo lo añadimos a fragment hasta tener todos los elementos
    fragment.appendChild(clone);
  });
  //A su vez añadimos fragment al div de resultados
  divResultados.appendChild(fragment);
}

//Función auxiliar para pintar las banderas a los platos
function establishFlag(nombrePais) {
  //tenemos que buscar el pais en el array de regiones y obtener el indice
  let indice = region.indexOf(nombrePais);
  //con ese indice sacamos la abreviación
  let countryAbrev = countryFlags[indice];
  //y establecemos esa abreviación en la url que nos traerá la abreviatura correspondiente
  return "https://www.themealdb.com/images/icons/flags/big/32/" + countryAbrev + ".png";
}

//funcion auxiliar para pintar las etiquetas a los platos a la que le pasamos el clon  y la comida que hemos obtenido de la api
function printTags(clone, comida) {
  //declaramos la parte del clon donde irán las etiqueteas
  let zonaEtiquetas = clone.querySelector(".tags");
  //obtenemos todas las etqiuetas de una comida
  let strTags = comida.strTags;
  let nuevalineaEtiqueta;
  //si hay etiquetas entones las separaremos con split,y por cada una de ellas añadimos al clon una linea de html
  if (strTags) {
    let listaEtiquetas = strTags.split(",");
    listaEtiquetas.forEach((etiqueta) => {
      if (etiqueta) {
        nuevalineaEtiqueta = '<p class=" rounded-4 bg-secondary-subtle align-content-center mx-2 px-2">#' + etiqueta + "</p>";
        zonaEtiquetas.innerHTML += nuevalineaEtiqueta;
      }
    });
  } else {
    /** Si la comida no trae etiquetas entonces mostraremos un mensaje de que no hay etiquetas*/
    nuevalineaEtiqueta = '<p class="align-content-center mx-2 px-5"><bold>No tags</bold></p>';
    zonaEtiquetas.innerHTML += nuevalineaEtiqueta;
  }
}

//Funcion asincrona para obtener todas las comidas que contengan el nombre que le hemos escrito
//La url de la que haremos fetech será la variable URLComidas + ?s= + lo que queramos,pues ?s= es para declarar la variable
//en la url del nombre de comida
async function getMealsByName(nombreComida) {
  let urlFetch = urlComidas + "?s=" + nombreComida;
  let listaComidas = await fetch(urlFetch);
  let json = await listaComidas.json();
  return json;
}

////////////////////////////////////////////Obtención de todas las categorías////////////////
//funcion para obtener todas las categorías que pondremos en el filtro
async function getAllCategories() {
  const urlFetch = listCategories;
  const response = await fetch(urlFetch);
  const json = await response.json();
  return json;
}
/**Cuando tengamos toddas las categorías las añadiremos al desplegable del filtro con una linea de HTML */
getAllCategories().then((categories) => {
  categories.meals.forEach((category) => {
    let categoria = document.querySelector("#categoria");
    categoria.innerHTML += `<option value="${category.strCategory}">${category.strCategory}</option>`;
  });
});

////////////////////////////////////////////////////////Aplicación de los filtros/////////////////////////////////

//Preparamos dos arrays que nos servirán en los filtros
let arrayFiltrado = new Array();
let arrayPreparado = new Array();

//Cuando hagamos click en el botón de aplicar filtros ejecutaremos aplicarFiltrosSeleccionados
btnaplicarFiltros.addEventListener("click", aplicarFiltrosSeleccionados);
function aplicarFiltrosSeleccionados() {
  //lo primero que haré será vaciar los arrays
  arrayFiltrado = [];
  arrayPreparado = [];
  //Realizaré una busqueda por nombre como se han hecho siempre (con esto sacaremos una copia tal como la queremos del array resultante de comidas)
  getMealsByName(nombreComida).then((comidasResultantesSBN) => {
    //copiamos el array resultante de la búsqueda en arrayPreparado
    if (comidasResultantesSBN.meals) {
      comidasResultantesSBN.meals.forEach((plato) => {
        arrayPreparado.push(plato);
      });
      //una vez tengo ya preparado mi array me copio el array resultante de la búsqueda en arrayFiltrado
      arrayFiltrado = arrayPreparado.slice();

      //Ahora,si hay algún filtro que se ha modificado(es decir,que su valor no sea "--")empezaremos a aplicar filtros
      if (
        pais.options[pais.selectedIndex].value != "--" ||
        categoria.options[categoria.selectedIndex].value != "--" ||
        etiqueta.options[etiqueta.selectedIndex].value != "--"
      ) {
        arrayPreparado.forEach((plato) => {
          //si el pais seleccionado no es el del plato y su valor tampoco es "--":
          if (pais.options[pais.selectedIndex].value != plato.strArea && pais.options[pais.selectedIndex].value != "--") {
            //filtraremos dejando en el array aquellos paises que sí coincidan con el  pais seleccionado
            arrayFiltrado = arrayFiltrado.filter((plato) => plato.strArea == pais.options[pais.selectedIndex].value);
          }
          //del mismo modo trabajamos con la categoría
          if (
            categoria.options[categoria.selectedIndex].value != plato.strCategory &&
            categoria.options[categoria.selectedIndex].value != "--"
          ) {
            arrayFiltrado = arrayFiltrado.filter((plato) => plato.strCategory == categoria.options[categoria.selectedIndex].value);
          }
          /*En el caso de las etiquetas: si un plato tiene etiquetas que no son la etiqueta seleccionada ni la opción seleccionada es "--" o bien se da la condición unica de que los platos no tengan etiquetas entramos al if*/
          if (
            (plato.strTags != null &&
              !plato.strTags.toUpperCase().includes(etiqueta.options[etiqueta.selectedIndex].value.toUpperCase()) &&
              etiqueta.options[etiqueta.selectedIndex].value != "--") ||
            plato.strTags == null
          ) {
            //si la opción de etiqueta seleccionada no es "--"
            if (etiqueta.options[etiqueta.selectedIndex].value != "--") {
              //entonces hallaremos el indice del plato en nuestro array
              let indexPlato = arrayFiltrado.indexOf(plato);
              //con ese indice le sacaremos del array filtrado,pues no cumple con la etiqueta seleccionada
              if (indexPlato != -1) {
                arrayFiltrado.splice(indexPlato, 1);
              }
            }
          }
        });
      }
      //una vez hayamos filtrado las commidas lo pintaremos con la función pintaComidasFiltradas
      pintaComidasFiltradas(arrayFiltrado);
    }
  });

  //Realizaré otra búsqueda por ingrediente para los filtros
  getIngredientsByName(nombreIngrediente2).then((meals) => {
    //Si el array meals del objeto meal no está vacío:
    if (meals.meals) {
      //Por cada elemento del array meals del objeto meals =>
      meals.meals.forEach((meal) => {
        //Invocamos la función asíncrona de obtener los platos por ingrediente pasándole el nombre del plato
        getMealsByName(meal.strMeal).then((comidasResultantesSBI) => {
          //Entonces de cada elemento del array meals del objeto "comidasResultantesSBI" =>
          comidasResultantesSBI.meals.forEach((plato) => {
            //Agregamos el elemento plato al array de "arrayPreparado"
            arrayPreparado.push(plato);

            //Igualamos "arrayFiltrado" con "arrayPreparado" para que tenga los mismos elementos
            arrayFiltrado = arrayPreparado;

            //Ahora, si hay algún filtro que se ha modificado (es decir,que su valor no sea "--") empezaremos a aplicar filtros
            if (
              pais.options[pais.selectedIndex].value != "--" ||
              categoria.options[categoria.selectedIndex].value != "--" ||
              tag.options[tag.selectedIndex].value != "--"
            ) {
              //De cada elemento del arrayPreparado =>
              arrayPreparado.forEach((plato) => {
                //si el pais seleccionado no es el del plato y su valor tampoco es "--":
                if (pais.options[pais.selectedIndex].value != plato.strArea && pais.options[pais.selectedIndex].value != "--") {
                  //filtraremos dejando en el array aquellos paises que sí coincidan con el  pais seleccionado
                  arrayFiltrado = arrayFiltrado.filter((plato) => plato.strArea == pais.options[pais.selectedIndex].value);
                }
                //Del mismo modo trabajamos con la categoría:
                if (
                  categoria.options[categoria.selectedIndex].value != plato.strCategory &&
                  categoria.options[categoria.selectedIndex].value != "--"
                ) {
                  arrayFiltrado = arrayFiltrado.filter((plato) => plato.strCategory == categoria.options[categoria.selectedIndex].value);
                }
                //En el caso de las etiquetas: si un plato tiene etiquetas que no son la etiqueta seleccionada ni la opción
                //seleccionada es "--" o bien se da la condición unica de que los platos no tengan etiquetas:
                if (
                  (plato.strTags != null &&
                    !plato.strTags.includes(tag.options[tag.selectedIndex].value) &&
                    tag.options[tag.selectedIndex].value != "--") ||
                  plato.strTags == null
                ) {
                  //Si la opción de etiqueta seleccionada no es "--":
                  if (tag.options[tag.selectedIndex].value != "--") {
                    //entonces hallaremos el indice del plato en nuestro array
                    let indexPlato = arrayFiltrado.indexOf(plato);
                    //Con ese indice le sacaremos del array filtrado,pues no cumple con la etiqueta seleccionada
                    if (indexPlato != -1) {
                      arrayFiltrado.splice(indexPlato, 1);
                    }
                  }
                }
              });
            }
            //Una vez hayamos filtrado las commidas lo pintaremos con la función pintaComidasFiltradas
            pintaComidasFiltradas(arrayFiltrado);
          });
        });
      });
    }
  });
}

//Por último tenemos esta función que pinta la comida filtrada,pues en el anterior pintaComidas el array que le pasabamos tenía 3 niveles de anidamiento(comidas.meals.meals),mientras que este pintaComidas trabaja con 2(comidas.meals)
function pintaComidasFiltradas(comidas) {
  divResultados.innerHTML = "";
  const fragment = new DocumentFragment();

  comidas.forEach((comida) => {
    let clone = plantilla.cloneNode(true);
    let imagen = clone.querySelector(".mealImage");
    imagen.src = comida.strMealThumb;
    clone.querySelector(".country").textContent = comida.strArea;
    clone.querySelector(".type").textContent = comida.strCategory;
    let countryName = comida.strArea;
    clone.querySelector("strong.country").textContent = countryName;

    imagen = clone.querySelector(".countryFlag");
    if (clone.querySelector(".country").textContent != "Unknown") {
      imagen.src = establishFlag(countryName);
    }

    clone.querySelector(".mealName").textContent = comida.strMeal;
    clone.querySelector(".ingredient1").textContent = comida.strIngredient1;
    clone.querySelector(".ingredient2").textContent = comida.strIngredient2;
    clone.querySelector(".ingredient3").textContent = comida.strIngredient3;
    clone.querySelector(".ingredient4").textContent = comida.strIngredient4;

    //para construir la foto de los ingredientes necesitamos saber sus nombres
    let imagenIngrediente1 = clone.querySelector(".ingredient1image");
    imagenIngrediente1.src = urlFotoIngredientes + comida.strIngredient1 + ".png";

    let imagenIngrediente2 = clone.querySelector(".ingredient2image");
    imagenIngrediente2.src = urlFotoIngredientes + comida.strIngredient2 + ".png";

    let imagenIngrediente3 = clone.querySelector(".ingredient3image");
    imagenIngrediente3.src = urlFotoIngredientes + comida.strIngredient3 + ".png";

    let imagenIngrediente4 = clone.querySelector(".ingredient4image");
    imagenIngrediente4.src = urlFotoIngredientes + comida.strIngredient4 + ".png";

    printTags(clone, comida);

    fragment.appendChild(clone);
  });
  divResultados.appendChild(fragment);
}
