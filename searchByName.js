let formulario = document.getElementById("searchByName");
let plantilla = document.getElementById("meal").content;
let resultados = document.getElementById("results");
const urlComidas = "https://www.themealdb.com/api/json/v1/1/search.php";
let divResultados = document.getElementById("results");


function pintaComidas(comidas) {
    divResultados.innerHTML = "";
    const fragment = new DocumentFragment();

    comidas.meals.forEach(comida => {
        let clone = plantilla.cloneNode(true);//copiamos toda la temlate con lo que venga dentro
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
        //ahora le establecemos la foto usando el nombre del pais
        imagen = clone.getElementById("countryFlag");
        countryName = countryName.toLowerCase();
        let countryAbrev = countryName.substring(0, 2);
        /*
            Realmente no se cogen las dos primeras letras,pues uk es señalado como gb,y no gr
            Al igual que America no es am,si no us,eso habría que arreglarlo
        */ 
        imagen.src = "https://www.themealdb.com/images/icons/flags/big/32/" + countryAbrev + ".png";
        //le ponemos ahora el nombre
        clone.querySelector("#mealName").textContent = comida.strMeal;
        //ahora le ponemos los nombres de los 4 ingredientes principales
        clone.querySelector("#ingredient1").textContent = comida.strIngredient1;
        clone.querySelector("#ingredient2").textContent = comida.strIngredient2;
        clone.querySelector("#ingredient3").textContent = comida.strIngredient3;
        clone.querySelector("#ingredient4").textContent = comida.strIngredient4;

        fragment.appendChild(clone);

    });
    divResultados.appendChild(fragment);
}

formulario.addEventListener("submit", e => {
    e.preventDefault();
    let nombreComida = document.getElementById("mealName");
    nombreComida = nombreComida.value.trim();
    getMealsByName(nombreComida).then(
        comidas => {
            pintaComidas(comidas)
        }
    )
})

async function getMealsByName(nombreComida) {
    let urlFetch = urlComidas + "?s=" + nombreComida;
    console.log(urlFetch);
    let listaComidas = await fetch(urlFetch);
    let json = await listaComidas.json();
    return json;
}


