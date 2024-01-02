let formulario = document.getElementById("searchByName");
let plantilla = document.getElementById("meal").content;
let resultados = document.getElementById("results");
const urlComidas = "https://www.themealdb.com/api/json/v1/1/search.php";
const urlFotoIngredientes = "https://www.themealdb.com/images/ingredients/";

const listCategories =
  "https://www.themealdb.com/api/json/v1/1/list.php?c=list";

const urlFilters = "www.themealdb.com/api/json/v1/1/filter.php?";

let mensajeWeb = document.getElementById("webMessage");

let divResultados = document.getElementById("results");

let btnaplicarFiltros = document.getElementById("applyFilters");

let btnresetFiltros = document.getElementById("resetFilters");

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

///////////////////////////////////////////////////Imprimir platos/////////////////////////////////////////
//funcion para pintar los platos
function pintaComidas(comidas) {
  divResultados.innerHTML = "";
  const fragment = new DocumentFragment();

    comidas.meals.forEach((comida) => {
    let clone = plantilla.cloneNode(true); //copiamos toda la temlate con lo que venga dentro
    //ponemos la imgaen
    let imagen = clone.getElementById("mealImage");
    imagen.src = comida.strMealThumb;
    //le ponemos también el pais de la comida
    clone.getElementById("country").textContent = comida.strArea;
    //establecemos el tipo de comida
    clone.getElementById("type").textContent = comida.strCategory;
    //obtenemos el pais y de paso se lo ponemos
    let countryName = comida.strArea;
    clone.querySelector("strong#country").textContent = countryName;

    imagen = clone.getElementById("countryFlag");
    if (clone.querySelector("#country").textContent != "Unknown") {
      imagen.src = establishFlag(countryName);
    }
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
    imagenIngrediente1.src =
      urlFotoIngredientes + comida.strIngredient1 + ".png";

    let imagenIngrediente2 = clone.getElementById("ingredient2image");
    imagenIngrediente2.src =
      urlFotoIngredientes + comida.strIngredient2 + ".png";

    let imagenIngrediente3 = clone.getElementById("ingredient3image");
    imagenIngrediente3.src =
      urlFotoIngredientes + comida.strIngredient3 + ".png";

    let imagenIngrediente4 = clone.getElementById("ingredient4image");
    imagenIngrediente4.src =
      urlFotoIngredientes + comida.strIngredient4 + ".png";

    printTags(clone, comida);

    fragment.appendChild(clone);
  });
  divResultados.appendChild(fragment);
  

 
}
//funcio auxiliar para pintar las banderas a los platos
function establishFlag(nombrePais) {
  //tenemos que buscar el pais y obtener el indice
  let indice = region.indexOf(nombrePais);
  //con ese indice sacamos la abreviación
  let countryAbrev = countryFlags[indice];
  //y establecemos esa abreviación
  return (
    "https://www.themealdb.com/images/icons/flags/big/32/" +
    countryAbrev +
    ".png"
  );
}
//funcion auxiliar para pintar las etiquetas a los platos
function printTags(clone, comida) {
  //primero separaremos los tags
  let zonaEtiquetas = clone.querySelector(".tags");
  let strTags = comida.strTags;
  let nuevalineaEtiqueta;
  if (strTags) {
    let listaEtiquetas = strTags.split(",");
    listaEtiquetas.forEach((etiqueta) => {
      if (etiqueta) {
        nuevalineaEtiqueta =
          '<p class=" rounded-4 bg-secondary-subtle align-content-center mx-2 px-2">#' +
          etiqueta +
          "</p>";
        zonaEtiquetas.innerHTML += nuevalineaEtiqueta;
      }
    });
  } else {
    nuevalineaEtiqueta =
      '<p class="align-content-center mx-2 px-5"><bold>No tags</bold></p>';
    zonaEtiquetas.innerHTML += nuevalineaEtiqueta;
  }
}

/////////////////////////////////////////////Busqueda por nombre////////////////////////////////
//Buscar por nombre
let nombreComida;
formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  nombreComida = document.getElementById("mealName");
  nombreComida = nombreComida.value.trim();
  getMealsByName(nombreComida)
    .then((comidas) => {
      resetearFiltros();
      divResultados.innerHTML = "";
      if (comidas.meals != null) {  
        pintaComidas(comidas)
        if (mensajeWeb.classList.contains("alert-danger")) {
          mensajeWeb.classList.remove("alert-danger");
          mensajeWeb.classList.add("alert-light");
        }
        mensajeWeb.querySelector("p").textContent =
          "Search results for the meal: '" + nombreComida + "'";
          document.querySelector("#filtros").style.display = "block"; 
      }

     
      
    })
    .catch(
      //pinto el mensaje de su color
      mensajeWeb.classList.remove("alert-light"),
      mensajeWeb.classList.add("alert-danger"),
      (mensajeWeb.querySelector("p").textContent =
        "No matching results for the meal: '" + nombreComida + "'"),
        document.querySelector("#filtros").style.display = "none"
      
    );
  document.querySelector("#mealName").value = "";
});

//Funcion para obtener todas las comidas que contengan el nombre que le hemos escrito
async function getMealsByName(nombreComida) {
  let urlFetch = urlComidas + "?s=" + nombreComida;
  let listaComidas = await fetch(urlFetch);
  let json = await listaComidas.json();
  return json;
}

////////////////////////////////////////////Obtención de todas las categorías////////////////
//funcion para obtener todas las categorías
async function getAllCategories() {
  const urlFetch = listCategories;
  const response = await fetch(urlFetch);
  const json = await response.json();
  return json;
}
getAllCategories().then((categories) => {
  categories.meals.forEach((category) => {
    let categoria = document.querySelector("#categoria");
    categoria.innerHTML += `<option value="${category.strCategory}">${category.strCategory}</option>`;
  });
});

/*Cada vez que se pulsa aplicar filtros se limpia la comida
Cuando el usuario seleccione una región o una categoría o ambos a la vez --> Lista de los nombres de platos que cumplen esas categorías.

Todos esos platos tenemos que meterlos en un array -> ArrayFiltradoPorRegiónYPorCategoría.Aquí ya están los platos filtrados por categoría y región

Esos platos deberemos hacer un recorrido y quitarles aquellos que no cumplan las etiquetas con un pop

Por último deberemos ver si el strMeal contiene el string introducido por el usuario,si no lo contiene hacemos pop

Si no imprimos la lista*/
let arrayFiltrado = new Array();
let arrayPreparado = new Array();

btnaplicarFiltros.addEventListener("click", aplicarFiltrosSeleccionados);

function aplicarFiltrosSeleccionados() {
  arrayFiltrado = [];
  arrayPreparado = [];
  getMealsByName(nombreComida).then((comidasResultantesSBN) => {
    //con esto sacaremos una copia tal como la queremos del array resultante de comidas
    comidasResultantesSBN.meals.forEach((plato) => {
      arrayPreparado.push(plato);
    });
    //una vez tengo ya preparado mi array me creo el array que usaré después copiandolo del array resultante de la búsqueda
    arrayFiltrado = arrayPreparado.slice();

    if (
      pais.options[pais.selectedIndex].value != "--" ||
      categoria.options[categoria.selectedIndex].value != "--" ||
      etiqueta.options[etiqueta.selectedIndex].value != "--"
    ) {
      arrayPreparado.forEach((plato) => {
        if (pais.options[pais.selectedIndex].value != plato.strArea && pais.options[pais.selectedIndex].value != "--") {
          //copiaremos el array que me ha resultado de las comidas de antes
          arrayFiltrado = arrayFiltrado.filter(
            (plato) => plato.strArea == pais.options[pais.selectedIndex].value
          );
        }
        if (categoria.options[categoria.selectedIndex].value != plato.strCategory && categoria.options[categoria.selectedIndex].value != "--"
        ) {
          arrayFiltrado = arrayFiltrado.filter((plato) => plato.strCategory == categoria.options[categoria.selectedIndex].value
          );
        }
        if ((plato.strTags != null && (!(plato.strTags.includes(etiqueta.options[etiqueta.selectedIndex].value))) && etiqueta.options[etiqueta.selectedIndex].value != "--") || plato.strTags == null) {
          //obtenemos el indice dle plato
          if (etiqueta.options[etiqueta.selectedIndex].value != "--") {

            let indexPlato = arrayFiltrado.indexOf(plato);
            //quitamos el plato que no tenga esa etiqueta
            if (indexPlato != -1) {
              arrayFiltrado.splice(indexPlato, 1);
            }

          }

        }
      })
    }

    /*
      arrayTrasPais = [];
      //vamosa establecer el arrayTras mirar lo del pais
      comidasResultantesSBN.meals.forEach((plato) => {
    
        if (pais.options[pais.selectedIndex].value == plato.strArea) {
          //copiaremos el array que me ha resultado de las comidas de antes
          arrayTrasPais.push(plato)
          //recorremos el arrayTrasPais quitando los que no cumplen la condicion del pais
        }
      })
    
      arrayTrasPyCategoria=[];
      arrayTrasPais.forEach((plato)=>{
        if (categoria.options[categoria.selectedIndex].value == plato.strCategory) {
          arrayTrasPyCategoria.push(plato);
        }
      })
    
      arrayTrasPCyTag=[];
      arrayTrasPyCategoria.forEach((plato)=>{ 
        if (plato.strTags.include(etiqueta.options[etiqueta.selectedIndex].value)) {
          arrayTrasPCyTag.push(plato);
        }
      })
      console.log(arrayTrasPais);
      console.log(arrayTrasPyCategoria);
      console.log(arrayTrasPCyTag);*/
    pintaComidasFiltradas(arrayFiltrado);
  });
}


function pintaComidasFiltradas(comidas) {
  divResultados.innerHTML = "";
  const fragment = new DocumentFragment();

  comidas.forEach((comida) => {
    let clone = plantilla.cloneNode(true); //copiamos toda la temlate con lo que venga dentro
    //ponemos la imgaen
    let imagen = clone.getElementById("mealImage");
    imagen.src = comida.strMealThumb;
    //le ponemos también el pais de la comida
    clone.getElementById("country").textContent = comida.strArea;
    //establecemos el tipo de comida
    clone.getElementById("type").textContent = comida.strCategory;
    //obtenemos el pais y de paso se lo ponemos
    let countryName = comida.strArea;
    clone.querySelector("strong#country").textContent = countryName;

    imagen = clone.getElementById("countryFlag");
    if (clone.querySelector("#country").textContent != "Unknown") {
      imagen.src = establishFlag(countryName);
    }
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
    imagenIngrediente1.src =
      urlFotoIngredientes + comida.strIngredient1 + ".png";

    let imagenIngrediente2 = clone.getElementById("ingredient2image");
    imagenIngrediente2.src =
      urlFotoIngredientes + comida.strIngredient2 + ".png";

    let imagenIngrediente3 = clone.getElementById("ingredient3image");
    imagenIngrediente3.src =
      urlFotoIngredientes + comida.strIngredient3 + ".png";

    let imagenIngrediente4 = clone.getElementById("ingredient4image");
    imagenIngrediente4.src =
      urlFotoIngredientes + comida.strIngredient4 + ".png";

    printTags(clone, comida);

    fragment.appendChild(clone);
  })
  divResultados.appendChild(fragment);
}

async function getFilters() {
  const urlFetch = urlFilters;
  const response = await fetch(urlFetch);
  const json = await response.json();
  return json;
}

btnresetFiltros.addEventListener("click",e=> resetearFiltros());

function resetearFiltros() {
  document.getElementById('pais').getElementsByTagName('option')[0].selected = 'selected'
  document.getElementById('categoria').getElementsByTagName('option')[0].selected = 'selected'
  document.getElementById('etiqueta').getElementsByTagName('option')[0].selected = 'selected'
}





