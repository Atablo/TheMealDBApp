let formulario = document.getElementById("searchByName");
let plantilla = document.getElementById("meal").content;
let resultados = document.getElementById("results");
const urlComidas = "https://www.themealdb.com/api/json/v1/1/search.php";
const urlFotoIngredientes = "https://www.themealdb.com/images/ingredients/";
let divResultados = document.getElementById("results");

//arrays para ver la correspondencia entre  la abreviación del pais y la abreviación de las banderas
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
  "Poli",
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

function pintaComidas(comidas) {
  divResultados.innerHTML = "";
  const fragment = new DocumentFragment();

  comidas.meals.forEach((comida) => {
    let clone = plantilla.cloneNode(true); //copiamos toda la temlate con lo que venga dentro
    //ponemos la imgaen
    let imagen = clone.getElementById("mealImage");
    console.log(imagen);
    imagen.src = comida.strMealThumb;
    //le ponemos también el pais de la comida
    clone.getElementById("country").textContent = comida.strArea;
    //establecemos el tipo de comida
    clone.getElementById("type").textContent = comida.strCategory;
    //obtenemos el pais y de paso se lo ponemos
    let countryName = comida.strArea;
    clone.querySelector("strong#country").textContent = countryName;

    imagen = clone.getElementById("countryFlag");
    imagen.src = establishFlag(countryName);
    //ahora le establecemos la foto usando el nombre del pais con el siguiente método

    //le ponemos ahora el nombre de la comida
    clone.querySelector("#mealName").textContent = comida.strMeal;
    //ahora le ponemos los nombres de los 4 ingredientes principales
    clone.querySelector("#ingredient1").textContent = comida.strIngredient1;
    clone.querySelector("#ingredient2").textContent = comida.strIngredient2;
    clone.querySelector("#ingredient3").textContent = comida.strIngredient3;
    clone.querySelector("#ingredient4").textContent = comida.strIngredient4;

    //para construir la foto de los ingredientes necesitamos saber sus nombres
    let imagenIngrediente1 = clone.getElementById("ingredient1image");
    imagenIngrediente1.src = urlFotoIngredientes + comida.strIngredient1 + ".png";

    let imagenIngrediente2 = clone.getElementById("ingredient2image");
    imagenIngrediente2.src = urlFotoIngredientes + comida.strIngredient2 + ".png";

    let imagenIngrediente3 = clone.getElementById("ingredient3image");
    imagenIngrediente3.src = urlFotoIngredientes + comida.strIngredient3 + ".png";

    let imagenIngrediente4 = clone.getElementById("ingredient4image");
    imagenIngrediente4.src = urlFotoIngredientes + comida.strIngredient4 + ".png";

    fragment.appendChild(clone);
  });
  divResultados.appendChild(fragment);
}

formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  let nombreComida = document.getElementById("mealName");
  nombreComida = nombreComida.value.trim();
  getMealsByName(nombreComida).then((comidas) => {
    pintaComidas(comidas);
  });
});

async function getMealsByName(nombreComida) {
  let urlFetch = urlComidas + "?s=" + nombreComida;
  console.log(urlFetch);
  let listaComidas = await fetch(urlFetch);
  let json = await listaComidas.json();
  return json;
}

function establishFlag(nombrePais) {
  //tenemos que buscar el pais y obtener el indice
  let indice = region.indexOf(nombrePais);
  //con ese indice sacamos la abreviación
  let countryAbrev = countryFlags[indice];
  console.log(countryAbrev);
  //y establecemos esa abreviación

  return "https://www.themealdb.com/images/icons/flags/big/32/" + countryAbrev + ".png";
}
