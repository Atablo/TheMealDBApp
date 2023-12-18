let formulario=document.getElementById("searchByName");
let plantilla=document.getElementById("meal");
let resultados= document.getElementById("results");
const urlComidas="www.themealdb.com/api/json/v1/1/search.php?";


formulario.addEventListener("submit",e=>{
    e.preventDefault();
    nombreComida=nombreComida.trim();
    getMealsByName(nombreComidaRecortado).then(
        comidas=>{
            pintaComidas(comidas)
        }
    ).catch(error =>{
        console.log(`Error al buscar las comidas: ${error}`);
    })
})

async function getMealsByName(nombreComida){
    const urlFetch= urlComidas + "?s="+nombreComida;
    const resultados = await fetch(urlFetch);
    const json= await resultados.json();
    return json;
}
