//Declaro las variables del input y del botón para la busqueda de los ingredientes
const nombreIngrediente = document.querySelector("#nombreIngrediente");
const busquedaIngrediente = document.querySelector("#searchByIngredient");

//Declaro las variables para luego pintar los platos en estos
const plantillaCard = document.querySelector("#meal").content;
const divCards = document.querySelector("#results");

//Variable para almacenar las options del datalist
const datalistOptions = document.querySelector("#datalistOptions");

//url de los platos de la API
const urlIngredients = "https://www.themealdb.com/api/json/v1/1/";
const listIngredients = "https://www.themealdb.com/api/json/v1/1/list.php?i=list";

//Variable que incluirá en nombre de ingrediente que usaremos más tarde
let nombreIngrediente2;

//Array de paises
const regiones = [
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

//Array del código de paises
const banderaPaises = [
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

//Array de etiquetas
const etiquetas = [
  "Rice",
  "Sidedish",
  "Speciality",
  "Fruity",
  "Pudding",
  "Dessert",
  "Snack",
  "Treat",
  "Summer",
  "Dairy",
  "Tart",
  "Cake",
  "Sweet",
  "Breakfast",
  "Greasy",
  "Unhealthy",
  "Calorific",
  "Breakfast",
  "Bbq",
  "Bun",
  "Baking",
  "Heavy",
  "Nutty",
  "Light ",
  "Desert",
  "Caramel",
  "Soup",
  "Dinnerparty",
  "Chocolate",
  "Vegetables",
  "Egg",
  "Glazed",
  "Fish",
  "Seafood",
  "Shellfish",
  "Pie",
  "Warm",
  "Mainmeal",
  "Speciality",
  "Snack",
  "Strongflavor",
  "Alcoholic",
  "Meat",
  "Datenight",
  "Expensive",
  "Cheasy",
  "Chilli",
  "Curry",
  "Spicy",
  "Savory",
  "Stew",
  "Vegan",
  "Paella",
  "Mild",
  "Pulse",
  "Pasta",
  "Fresh",
  "Pancake",
  "Sausages",
];

//Función asíncrona para obtener los platos por nombre
async function getIngredientsByName(name) {
  //Creamos una variable que sea igual a "urlIngredients" + "filter.php?i=" + el nombre que introduzca el usuario
  const urlFetch = urlIngredients + "filter.php?i=" + name;
  //Response coge el argumento que le pasamos y contiene la respuesta
  const response = await fetch(urlFetch);
  //Que recupera el archivo json a través de la red
  const json = await response.json();
  //Y devuelve ese objeto para utilizarlo
  return json;
}

//Función asíncrona para obtener todos los ingrendientes
async function getAllIngredients() {
  //Creamos una variable que sea igual a "listIngredients"
  const urlFetch = listIngredients;
  //Response coge el argumento que le pasamos y contiene la respuesta
  const response = await fetch(urlFetch);
  //Que recupera el archivo json a través de la red
  const json = await response.json();
  //Y devuelve ese objeto para utilizarlo
  return json;
}

//Función asíncrona para obtener los platos aleatoriamente
async function showRandomMeals() {
  //Creamos una variable que sea igual a la url de la API que nos muestra un plato aleatorio
  const urlFetch = "https://www.themealdb.com/api/json/v1/1/random.php";
  //Response coge el argumento que le pasamos y contiene la respuesta
  const response = await fetch(urlFetch);
  //Que recupera el archivo json a través de la red
  const json = await response.json();
  //Y devuelve ese objeto para utilizarlo
  return json;
}

//Creamos un bucle for de 8 veces para que pinte 8 platos en la página principal al entrar
for (i = 0; i < 8; i++) {
  //Invocamos la función asíncrona de obtener platos aleatoriamente, y el objeto que nos trae
  showRandomMeals().then((meals) => {
    //Lo usamos para ejecutar la funcion de pintarMeals con ese objeto
    pintarMeals(meals);
  });
}

//Invocamos la función asíncrona de obtener todos los ingredientes
getAllIngredients().then((ingredients) => {
  //Por cada meals del objeto ingredients =>
  ingredients.meals.forEach((ingredient) => {
    //Hacemos que se acumulen opciones en el datalistOptions con el nombre del ingrediente
    datalistOptions.innerHTML += `<option value="${ingredient.strIngredient}"></option>`;
  });
});

//Hacemos un eventListener submit al botón de buscar ingredientes
busquedaIngrediente.addEventListener("submit", (e) => {
  //Cancelamos el evento del submit para que no se recargue la página
  e.preventDefault();

  //Igualo esta variable a nulo declarada en el otro archivo js para que no haya problemas entre funciones
  nombreComida = null;

  //Creo una variable bandera que sea true
  let valido = true;

  //Ponemos una validación al usuario, en caso de que no se cumpla:
  if (!validarIngrediente(nombreIngrediente)) {
    4;
    //La variable bandera se cambia a false
    valido = false;
  }

  //En caso de que la bandera sea true:
  if (valido) {
    //Limpiamos los cards o platos pintados en caso de que hubiese
    divCards.innerHTML = "";

    //Invocamos la función de resetear los filtros
    resetearFiltros();

    //Metemos el nombre introducido por el usuario en la variable "nombreIngrediente2" para más tarde (filtros)
    nombreIngrediente2 = nombreIngrediente.value.trim();

    //Invocamos la función asíncrona de obtener los platos por ingrediente pasándole el nombre introducido, quitando espacios al principio y al final
    getIngredientsByName(nombreIngrediente.value.trim())
      .then((meals) => {
        //Entonces, si el array meals del objeto meals no está vacio:
        if (meals.meals != null) {
          //Removemos la calse "alert-danger" en caso de que haya e incluimos el "alert-info" en el webMessage declarado en el otro archivo js
          webMessage.classList.remove("alert-danger");
          webMessage.classList.add("alert-light");

          //Hacemos que el mensaje dentro de la etiqueta del párrafo sea "Search results for the meal:" + el nombre del ingrediente introducido por el usuario
          webMessage.querySelector("p").textContent = "Search results for the meal: '" + nombreIngrediente.value + "'";

          //Por cada array meals del objeto meals:
          meals.meals.forEach((meal) => {
            //Invocamos la función asíncrona de obtener los platos por nombre pasándole el nombre de cada plato que hemos obtenido en la búsqueda por ingrediente
            getMealsByName(meal.strMeal).then((meals) => {
              //Entonces del objeto que nos devuelve, es decir, meals, lo usamos para pintar las cards con la información de los platos
              pintarMeals(meals);
            });
          });

          //Una vez pintado, limpiamos el cuadro de búsqueda por ingrediente
          document.querySelector("#nombreIngrediente").value = "";

          //Mostramos la caja de filtros que estaba oculto (se le indica que se encuentra oculto en el otro archivo js)
          document.querySelector("#filtros").style.display = "block";

          //En caso de que el array meals del objeto meals se encuentre vacío:
        } else {
          //Lanzamos un nuevo error que contenga el siguiente mensaje: "No matching results for the meal:" + ingrediente introducido por el usuario
          throw new Error("No matching results for the meal: '" + nombreIngrediente.value + "'");
        }
      })
      .catch((error) => {
        //Aquí recibe el error que se ha lanzado anteriormente y lo tratamos =>

        //Creamos una variable que almacene el mensaje de error separado por ":"
        const mensaje = error.toString().split(":");
        //Quitamos el "alert-light" en el webMessage
        webMessage.classList.remove("alert-light");
        //Y agregamos la clase "alert-danger" en el webMessage
        webMessage.classList.add("alert-danger");
        //Hacemos que el mensaje dentro de la etiqueta del párrafo sea "Search results for the meal:" (mensaje[1]) + el nombre del ingrediente introducido por el usuario (mensaje[2])
        webMessage.querySelector("p").textContent = mensaje[1] + ": " + mensaje[2];
      });
  }
});

//Hacemos un eventListener click a los platos de los cards
divCards.addEventListener("click", (evento) => {
  //Si se hace un click dentro del divCards, se halla el elemento clickado,
  //entonces, si el padre del padre del elemento clickado contiene la clase "ingredient":
  if (evento.target.parentNode.parentNode.classList.contains("ingredient")) {
    //Creamos una variable contenga el nombre de la imagen clickada
    let nombreIngrediente = evento.target.parentNode.parentNode.querySelector(".ingredient p").textContent;

    //Metemos el nombre introducido por el usuario en la variable "nombreIngrediente2" para más tarde (filtros)
    nombreIngrediente2 = nombreIngrediente;

    //Limpiamos los cards o platos pintados en caso de que hubiese
    divCards.innerHTML = "";

    //Hacemos que el mensaje dentro de la etiqueta del párrafo sea "Search results for the meal:" + el nombre del ingrediente clickado anteriormente
    webMessage.querySelector("p").textContent = "Search results for the meal: '" + nombreIngrediente + "'";

    //Invocamos la función asíncrona de obtener todos los ingredientes
    getIngredientsByName(nombreIngrediente).then((meals) => {
      //Por cada array meals del objeto meals:
      meals.meals.forEach((meal) => {
        //Invocamos la función asíncrona de obtener los platos por nombre pasándole el nombre de cada plato que hemos obtenido en la búsqueda por ingrediente
        getMealsByName(meal.strMeal).then((meals) => {
          //Entonces del objeto que nos devuelve, es decir, meals, lo usamos para pintar las cards con la información de los platos
          pintarMeals(meals);
        });
      });
    });

    //Mostramos la caja de filtros que estaba oculto
    document.querySelector("#filtros").style.display = "block";

    //Evitamos la propagación adicional del evento actual
    evento.stopPropagation();
  }
});

///////////////////////////////////////BORRABLE???/////////////////////////////////////////////////////
function establishFlag(nombrePais) {
  //tenemos que buscar el pais y obtener el indice
  let indice = regiones.indexOf(nombrePais);
  //con ese indice sacamos la abreviación
  let countryAbrev = banderaPaises[indice];
  //y establecemos esa abreviación

  return "https://www.themealdb.com/images/icons/flags/big/32/" + countryAbrev + ".png";
}

//Función para validar que el campo de ingrediente no se encuentre vacío
function validarIngrediente(nombreIngrediente) {
  //En caso de dejarlo vacío:
  if (!nombreIngrediente.value) {
    //Agregar al padre del input la clase "error"
    nombreIngrediente.parentNode.classList.add("error");
    //Devolver false
    return false;
  } else {
    //Sino remover al padre del input la clase "error"
    nombreIngrediente.parentNode.classList.remove("error");
    //Devolver true
    return true;
  }
}

//Funcion para pintar los platos en los cards
function pintarMeals(meals) {
  //Creamos una variable fragment, donde iremos acumulando clones de la plantilla
  const fragment = document.createDocumentFragment();

  //Para cada array meals del objeto meals:
  meals.meals.forEach((meal) => {
    //CAMBIAR TODOS LAS IDS A CLASES PORQUE SE REPITEN

    //Ponemos la imagen del plato
    plantillaCard.querySelector("#mealImage").src = meal.strMealThumb;
    //Ponemos el nombre del plato
    plantillaCard.querySelector("#mealName").textContent = meal.strMeal;

    //Ponemos la categoria del plato
    plantillaCard.querySelector("#type").textContent = meal.strCategory;

    //Ponemos el pais del plato
    plantillaCard.querySelector("#country").textContent = meal.strArea;

    //En caso de que el nombre del pais del plato sea distinto "Unknown":
    if (plantillaCard.querySelector("#country").textContent != "Unknown") {
      //Ejecutamos la función que nos pone la bandera del país
      plantillaCard.querySelector("#countryFlag").src = establishFlag(meal.strArea);
    }

    //Ponemos el nombre del primer ingrediente
    plantillaCard.querySelector("#ingredient1").textContent = meal.strIngredient1;
    //Ponemos la imagen del primer ingrediente
    plantillaCard.querySelector("#ingredient1image").src = `https://www.themealdb.com/images/ingredients/${meal.strIngredient1}-small.png`;

    //Ponemos el nombre del segundo ingrediente
    plantillaCard.querySelector("#ingredient2").textContent = meal.strIngredient2;
    //Ponemos la imagen del segundo ingrediente
    plantillaCard.querySelector("#ingredient2image").src = `https://www.themealdb.com/images/ingredients/${meal.strIngredient2}-small.png`;

    //Ponemos el nombre del tercer ingrediente
    plantillaCard.querySelector("#ingredient3").textContent = meal.strIngredient3;
    //Ponemos la imagen del tercer ingrediente
    plantillaCard.querySelector("#ingredient3image").src = `https://www.themealdb.com/images/ingredients/${meal.strIngredient3}-small.png`;

    //Ponemos el nombre del cuarto ingrediente
    plantillaCard.querySelector("#ingredient4").textContent = meal.strIngredient4;
    //Ponemos la imagen del cuarto ingrediente
    plantillaCard.querySelector("#ingredient4image").src = `https://www.themealdb.com/images/ingredients/${meal.strIngredient4}-small.png`;

    //Ejecutamos la función que nos pinta las etiquetas del plato
    printTags(plantillaCard, meal);

    //Clonamos la plantilla y la agregamos a un fragmento que ira acumulando todas las cards
    const clone = plantillaCard.cloneNode(true);
    fragment.appendChild(clone);
  });
  //Añadimos el fragmento con todas las cards al contenedor de las cards
  divCards.appendChild(fragment);
}

//Función para pintar las etiquetas de los platos
function printTags(plantillaCard, meal) {
  //Vaciamos las etiquetas en caso de que hayan
  plantillaCard.querySelector(".tags").innerHTML = "";

  //Primero separaremos los tags
  let strTags = meal.strTags;
  let nuevalineaEtiqueta;
  if (strTags) {
    let listaEtiquetas = strTags.split(",");
    listaEtiquetas.sort();
    listaEtiquetas.forEach((etiqueta) => {
      if (etiqueta) {
        nuevalineaEtiqueta = '<p class=" rounded-4 bg-secondary-subtle align-content-center mx-2 px-2">#' + etiqueta + "</p>";
        plantillaCard.querySelector(".tags").innerHTML += nuevalineaEtiqueta;
      }
    });
  } else {
    nuevalineaEtiqueta = '<p class="align-content-center mx-2 px-5"><bold>No tags</bold></p>';
    plantillaCard.querySelector(".tags").innerHTML = nuevalineaEtiqueta;
  }
}

/*
Errores:
1. Utilizar Ids está mal, cambiarlo todo a clases
*/

/////////////////////////////////////////////////////////////////////////////
///////////////////////////////FILTERS//////////////////////////////////////
////////////////////////////////////////////////////////////////////////////

///////////Código para mostrar opciones en el front//////////////////////////
//Creamos la variable pais que será el select de pais del html
let pais = document.querySelector("#pais");
//Para cada region (array de arriba) =>
regiones.forEach((region) => {
  //Iremos acumulando los option en el select con el nombre de los paises
  pais.innerHTML += `<option value="${region}">${region}</option>`;
});

//Creamos la variable tag que será el select de la etiqueta del html
let tag = document.querySelector("#etiqueta");
//Para cada etiqueta (array de arriba) =>
etiquetas.forEach((etiqueta) => {
  //Iremos acumulando los option en el select con el nombre de las etiquetas
  tag.innerHTML += `<option value="${etiqueta}">${etiqueta}</option>`;
});

/////////////////////////////////////////////////////////////////////////

/*Errores:
1. CAMBIAR TODOS LAS IDS A CLASES PORQUE SE REPITEN
*/

//PRINTTAGS NO ESTÁ COMENTADO AÚN
