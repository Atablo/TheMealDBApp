let formulario = document.getElementById("searchByName");
let plantilla = document.getElementById("meal");
let resultados = document.getElementById("results");
const urlComidas = "www.themealdb.com/api/json/v1/1/search.php";
let nombreComida = document.getElementById("mealName");
let divResultados = document.getElementById("results");


function pintaComidas(comidas) {
    divResultados.innerHTML = "";
    const fragment = new DocumentFragment();

    comidas.forEach(comida => {

        let clone = plantilla.cloneNode(true);//copiamos toda la temlate con lo que venga dentro

        //ponemos la imgaen
        let imagen = clone.getElementById("mealImage");
        imagen.src = comida.strMealThumb;
        //establecemos el tipo de comida
        clone.querySelector("strong #type").textContent = comida.strCategory;

        //le ponemos también el pais de la comida
        clone.getElementById("type") = comida.strArea;

        //obtenemos el pais y de paso se lo ponemos
        let countryName = comida.strArea;
        clone.querySelector("strong #country").textContent = countryName;

        //ahora le establecemos la foto usando el nombre del pais
        imagen = clone.getElementById("countryFlag");
        countryName = countryName.toLoweraCase();
        let countryAbrev = countryName.substring(1, 3);
        imagen.src = "https://www.themealdb.com/images/icons/flags/big/32/" + countryAbrev + ".png";

        //le ponemos ahora el nombre
        clone.querySelector("#mealName") = comida.strMeal;

        //ahora le ponemos los nombres de los 4 ingredientes principales
        clone.querySelector("#ingredient1") = comida.strIngredient1;
        clone.querySelector("#ingredient2") = comida.strIngredient2;
        clone.querySelector("#ingredient3") = comida.strIngredient3;
        clone.querySelector("#ingredient4") = comida.strIngredient4;





        clone.querySelector("").textContent = personaje.status;
        clone.querySelector("").textContent = personaje.species;//le metemos al template el texto que queremos
        clone.querySelector("").textContent = personaje.type;//le metemos al template el texto que queremos
        clone.querySelector("").textContent = personaje.gender;//le metemos al template el texto que queremos
        clone.querySelector("").textContent = personaje.origin.name;//le metemos al template el texto que queremos
        clone.querySelector("").textContent = personaje.location.name;//le metemos al template el texto que queremos
        clone.querySelector("").textContent = personaje.created;//le metemos al template el texto que queremos texto que queremos



        fragment.appendChild(clone);

    });
}

formulario.addEventListener("submit", e => {
    e.preventDefault();
    nombreComida = nombreComida.value.trim();
    getMealsByName(nombreComida).then(
        comidas => {
            pintaComidas(comidas)
        }
    ).catch(error => {
        console.log(`Error al buscar las comidas: ${error}`);
    })
})

async function getMealsByName(nombreComida) {
    const urlFetch = urlComidas + "?s=" + nombreComida;
    const resultados = await fetch(urlFetch);
    const json = await resultados.json();
    return json;
}


