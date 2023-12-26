window.addEventListener("load", function () {
  let mensajeWeb=document.getElementById("webMessage");

  const nombreIngrediente = document.querySelector("#nombreIngrediente");
  const busquedaIngrediente = document.querySelector("#searchByIngredient");

  const divIngredients = document.querySelectorAll("#divIngredients");

  const plantillaCard = document.querySelector("#meal").content;
  const divCards = document.querySelector("#results");

  const urlComidas = "https://www.themealdb.com/api/json/v1/1/search.php";
  const urlIngredients = "https://www.themealdb.com/api/json/v1/1/";
  const listIngredients = "https://www.themealdb.com/api/json/v1/1/list.php?i=list";


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

  async function getAllIngredients() {
    const urlFetch = listIngredients;
    const response = await fetch(urlFetch);
    const json = await response.json();
    return json;
  }

  getAllIngredients().then((ingredients) => {
    ingredients.meals.forEach((ingredient) => {
      datalistOptions.innerHTML += `<option value="${ingredient.strIngredient}"></option>`;
    });
  });

  async function getMealsByName(nombreComida) {
    let urlFetch = urlComidas + "?s=" + nombreComida;
    console.log(urlFetch);
    let listaComidas = await fetch(urlFetch);
    let json = await listaComidas.json();
    return json;
  }

  async function getIngredientsByName(name) {
    const urlFetch = urlIngredients + "filter.php?i=" + name;
    const response = await fetch(urlFetch);
    const json = await response.json();
    return json;
  }

  busquedaIngrediente.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log(nombreIngrediente.value);

    divCards.innerHTML = "";

    getIngredientsByName(nombreIngrediente.value.trim()).then((meals) => {

      meals.meals.forEach((meal) => {
        getMealsByName(meal.strMeal).then((meals) => {
          pintarMeals(meals);
          mensajeWeb.querySelector("p").textContent="Resultados para la búsqueda de comida con el ingrediente'"+nombreIngrediente.value+"'";
          mensajeWeb.classList.remove("alert-danger"),
          mensajeWeb.classList.add("alert-info")
        })
      });
    }).catch(
      mensajeWeb.classList.remove("alert-info"),
      mensajeWeb.classList.add("alert-danger"),
      mensajeWeb.querySelector("p").textContent="No existen resultados para la búsqueda de comida con el ingrediente'"+nombreIngrediente.value+"'",
    );
  });



  function establishFlag(nombrePais) {
    //tenemos que buscar el pais y obtener el indice
    let indice = region.indexOf(nombrePais);
    //con ese indice sacamos la abreviación
    let countryAbrev = countryFlags[indice];
    console.log(countryAbrev);
    //y establecemos esa abreviación

    return "https://www.themealdb.com/images/icons/flags/big/32/" + countryAbrev + ".png";
  }

  function pintarMeals(meals) {
    const fragment = document.createDocumentFragment();

    meals.meals.forEach((meal) => {
      console.log(meal.strMealThumb);
      //CAMBIAR TODOS LAS IDS A CLASES PORQUE SE REPITEN
      plantillaCard.querySelector("#mealImage").src = meal.strMealThumb;
      plantillaCard.querySelector("#mealName").textContent = meal.strMeal;

      plantillaCard.querySelector("#type").textContent = meal.strCategory;

      plantillaCard.querySelector("#country").textContent = meal.strArea;
      plantillaCard.querySelector("#countryFlag").src = establishFlag(meal.strArea);

      plantillaCard.querySelector("#ingredient1").textContent = meal.strIngredient1;
      plantillaCard.querySelector(
        "#ingredient1image"
      ).src = `https://www.themealdb.com/images/ingredients/${meal.strIngredient1}-small.png`;

      plantillaCard.querySelector("#ingredient2").textContent = meal.strIngredient2;
      plantillaCard.querySelector(
        "#ingredient2image"
      ).src = `https://www.themealdb.com/images/ingredients/${meal.strIngredient2}-small.png`;

      plantillaCard.querySelector("#ingredient3").textContent = meal.strIngredient3;
      plantillaCard.querySelector(
        "#ingredient3image"
      ).src = `https://www.themealdb.com/images/ingredients/${meal.strIngredient3}-small.png`;

      plantillaCard.querySelector("#ingredient4").textContent = meal.strIngredient4;
      plantillaCard.querySelector(
        "#ingredient4image"
      ).src = `https://www.themealdb.com/images/ingredients/${meal.strIngredient4}-small.png`;

      const clone = plantillaCard.cloneNode(true);
      fragment.appendChild(clone);
    });

    divCards.appendChild(fragment);

    nombreIngrediente.value = "";
  }

  divCards.addEventListener("click",evento => {
    let nombreIngrediente;
    console.log("Has hecho click en una comida");
    

/*si hacemosclick en el nombre    
    if(evento.target.parentNode.classList.contains("ingredient")){
  
      console.log("Has hecho click en el nombre del ingrediente "+ evento.target.parentNode.querySelector(".ingredient p").textContent);
      evento.stopPropagation();
    }
*/
//si hacemos click en la imagen
    /*else*/
    if(evento.target.parentNode.parentNode.classList.contains("ingredient")) {
      nombreIngrediente=evento.target.parentNode.parentNode.querySelector(".ingredient p").textContent;
      console.log("Has hecho click en la imagen del ingrediente "+ nombreIngrediente);
      divCards.innerHTML = "";

      mensajeWeb.querySelector("p").textContent="Resultados para la búsqueda de comida con el ingrediente '"+nombreIngrediente+"'";
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
});