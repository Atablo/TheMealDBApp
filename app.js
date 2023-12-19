window.addEventListener("load", function () {
  const nombreIngrediente = document.querySelector("#nombreIngrediente");
  const busquedaIngrediente = document.querySelector("#searchByIngredient");

  const btnNext = document.querySelector("#siguiente");
  const btnPrevious = document.querySelector("#anterior");

  const urlIngredients = "https://www.themealdb.com/api/json/v1/1/";

  async function getMealsByName(name) {
    const urlFetch = urlIngredients + "/filter.php?i=" + name;
    const response = await fetch(urlFetch);
    const json = await response.json();
    return json;
  }

  function pintaMeals(meals) {
    console.log(meals.results);
  }

  busquedaIngrediente.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log(nombreIngrediente.value);
    getMealsByName(nombreIngrediente.value.trim()).then((meals) => {
      console.log(meals);

      meals.meals.forEach((meal) => {
        console.log(meal);
      });
    });
  });

  //   const plantillaCard = document.querySelector("#template-card").content;
  //   const divCards = document.querySelector("#lista-cards");

  //   const divNavegacion = document.querySelector("#navegacion");

  //   pageCounter = 1;

  //   btnNext.addEventListener("click", (e) => {
  //     pageCounter++;
  //     getMealsByName(imgPlato.value.trim(), (page = pageCounter)).then((platos) => {
  //       pintarCards(platos);
  //     });
  //   });

  //   btnPrevious.addEventListener("click", (e) => {
  //     pageCounter--;
  //     getMealsByName(imgPlato.value.trim(), (page = pageCounter)).then((platos) => {
  //       pintarCards(platos);
  //     });
  //   });

  //   async function getCharactersByURL(URL) {
  //     const response = await fetch(URL);
  //     const json = await response.json();
  //     return json;
  //   }

  //   function pintarCards(platos) {
  //     divCards.innerHTML = "";

  //     const fragment = document.createDocumentFragment();

  //     platos.results.forEach((plato) => {
  //       plantillaCard.querySelector(".imagenPersonaje").src = personaje.image;
  //       plantillaCard.querySelector(".nombrePintado").textContent = personaje.name;
  //       plantillaCard.querySelector(".estado-especiePintado").textContent = personaje.status + " - " + personaje.species;
  //       plantillaCard.querySelector(".ubicacionPintado span").textContent = personaje.location.name;

  //       const clone = plantillaCard.cloneNode(true);
  //       fragment.appendChild(clone);
  //     });
  //     divCards.appendChild(fragment);
  //   }
});
