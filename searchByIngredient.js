const nombreIngrediente = document.querySelector("#nombreIngrediente");
const busquedaIngrediente = document.querySelector("#searchByIngredient");

let webMessage = document.getElementById("webMessage");

const plantillaCard = document.querySelector("#meal").content;
const divCards = document.querySelector("#results");

const datalistOptions = document.querySelector("#datalistOptions");

const urlIngredients = "https://www.themealdb.com/api/json/v1/1/";
const listIngredients = "https://www.themealdb.com/api/json/v1/1/list.php?i=list";

const listCategories = "https://www.themealdb.com/api/json/v1/1/list.php?c=list";
const urlFilters = "www.themealdb.com/api/json/v1/1/filter.php?";

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

async function getIngredientsByName(name) {
  const urlFetch = urlIngredients + "filter.php?i=" + name;
  const response = await fetch(urlFetch);
  const json = await response.json();
  return json;
}

async function getAllIngredients() {
  const urlFetch = listIngredients;
  const response = await fetch(urlFetch);
  const json = await response.json();
  return json;
}

async function getAllCategories() {
  const urlFetch = listCategories;
  const response = await fetch(urlFetch);
  const json = await response.json();
  return json;
}

async function getFilters() {
  const urlFetch = urlFilters;
  const response = await fetch(urlFetch);
  const json = await response.json();
  return json;
}

// let pais = document.querySelector("#pais");
// regiones.forEach((region) => {
//   pais.innerHTML += `<option value="value1">${region}</option>`;
// });

getAllCategories().then((categories) => {
  categories.meals.forEach((category) => {
    let categoria = document.querySelector("#categoria");
    categoria.innerHTML += `<option value="value1">${category.strCategory}</option>`;
  });
});

getAllIngredients().then((ingredients) => {
  ingredients.meals.forEach((ingredient) => {
    datalistOptions.innerHTML += `<option value="${ingredient.strIngredient}"></option>`;
  });
});

busquedaIngrediente.addEventListener("submit", (e) => {
  e.preventDefault();

  let valido = true;

  if (!validarIngrediente(nombreIngrediente)) {
    valido = false;
  }

  if (valido) {
    divCards.innerHTML = "";

    getIngredientsByName(nombreIngrediente.value.trim())
      .then((meals) => {
        console.log(meals.meals);

        if (meals.meals != null) {
          webMessage.classList.remove("alert-danger");
          webMessage.classList.add("alert-info");

          webMessage.querySelector("p").textContent =
            "Resultados para la búsqueda de comida con el ingrediente '" + nombreIngrediente.value + "'";

          meals.meals.forEach((meal) => {
            getMealsByName(meal.strMeal).then((meals) => {
              console.log(meals.meals);
              pintarMeals(meals);
            });
          });
          nombreIngrediente.value = "";

          document.querySelector("#filtros").style.display = "block";
        } else {
          throw new Error("No existen resultados para la búsqueda de comida con el ingrediente '" + nombreIngrediente.value + "'");
        }
      })
      .catch((error) => {
        const mensaje = error.toString().split(":");
        webMessage.classList.remove("alert-info");
        webMessage.classList.add("alert-danger");
        webMessage.querySelector("p").textContent = mensaje[1];
      });
  }
});

divCards.addEventListener("click", (evento) => {
  if (evento.target.parentNode.parentNode.classList.contains("ingredient")) {
    let nombreIngrediente = evento.target.parentNode.parentNode.querySelector(".ingredient p").textContent;

    divCards.innerHTML = "";

    webMessage.querySelector("p").textContent = "Resultados para la búsqueda de comida con el ingrediente '" + nombreIngrediente + "'";
    getIngredientsByName(nombreIngrediente).then((meals) => {
      meals.meals.forEach((meal) => {
        getMealsByName(meal.strMeal).then((meals) => {
          pintarMeals(meals);
        });
      });
    });
    evento.stopPropagation();
  }
});

function establishFlag(nombrePais) {
  //tenemos que buscar el pais y obtener el indice
  let indice = regiones.indexOf(nombrePais);
  //con ese indice sacamos la abreviación
  let countryAbrev = banderaPaises[indice];
  //y establecemos esa abreviación

  return "https://www.themealdb.com/images/icons/flags/big/32/" + countryAbrev + ".png";
}

function validarIngrediente(nombreIngrediente) {
  if (!nombreIngrediente.value) {
    nombreIngrediente.parentNode.classList.add("error");
    return false;
  } else {
    nombreIngrediente.parentNode.classList.remove("error");
    return true;
  }
}

function pintarMeals(meals) {
  const fragment = document.createDocumentFragment();

  meals.meals.forEach((meal) => {
    //CAMBIAR TODOS LAS IDS A CLASES PORQUE SE REPITEN
    plantillaCard.querySelector("#mealImage").src = meal.strMealThumb;
    plantillaCard.querySelector("#mealName").textContent = meal.strMeal;

    plantillaCard.querySelector("#type").textContent = meal.strCategory;

    plantillaCard.querySelector("#country").textContent = meal.strArea;

    if (plantillaCard.querySelector("#country").textContent != "Unknown") {
      plantillaCard.querySelector("#countryFlag").src = establishFlag(meal.strArea);
    }

    plantillaCard.querySelector("#ingredient1").textContent = meal.strIngredient1;
    plantillaCard.querySelector("#ingredient1image").src = `https://www.themealdb.com/images/ingredients/${meal.strIngredient1}-small.png`;

    plantillaCard.querySelector("#ingredient2").textContent = meal.strIngredient2;
    plantillaCard.querySelector("#ingredient2image").src = `https://www.themealdb.com/images/ingredients/${meal.strIngredient2}-small.png`;

    plantillaCard.querySelector("#ingredient3").textContent = meal.strIngredient3;
    plantillaCard.querySelector("#ingredient3image").src = `https://www.themealdb.com/images/ingredients/${meal.strIngredient3}-small.png`;

    plantillaCard.querySelector("#ingredient4").textContent = meal.strIngredient4;
    plantillaCard.querySelector("#ingredient4image").src = `https://www.themealdb.com/images/ingredients/${meal.strIngredient4}-small.png`;

    plantillaCard.querySelector(".tags").innerHTML = "";
    printTags(plantillaCard, meal);

    const clone = plantillaCard.cloneNode(true);
    fragment.appendChild(clone);
  });

  divCards.appendChild(fragment);
}

function printTags(plantillaCard, meal) {
  //primero separaremos los tags
  let strTags = meal.strTags;
  let nuevalineaEtiqueta;
  if (strTags) {
    let listaEtiquetas = strTags.split(",");
    listaEtiquetas.forEach((etiqueta) => {
      if (etiqueta) {
        nuevalineaEtiqueta = '<p class=" rounded-4 bg-secondary-subtle align-content-center mx-2 px-2">#' + etiqueta + "</p>";
        plantillaCard.querySelector(".tags").innerHTML = nuevalineaEtiqueta;
      }
    });
  } else {
    nuevalineaEtiqueta = '<p class="align-content-center mx-2 px-5"><bold>No tags</bold></p>';
    plantillaCard.querySelector(".tags").innerHTML = nuevalineaEtiqueta;
  }
}

document.querySelector("#filtros").style.display = "none";

/*
Errores:
1. Utilizar Ids está mal, cambiarlo todo a clases
*/
