document.addEventListener('DOMContentLoaded', function () {
    // Escuchamos el evento de carga del documento
    document.getElementById('searchByArea').addEventListener('submit', async function (event) {
        // Evitamos la presentación del formulario por defecto
        event.preventDefault();

        // Obtenemos el nombre del país desde el campo de entrada
        var countryName = document.getElementById('nombrePais').value;

        try {
            // Realizamos una solicitud para obtener los datos de las comidas según el país
            var response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${countryName}`);
            var data = await response.json();

            // Loggeamos el array completo de datos
            console.log('Array completo de datos:', data);

            if (data.meals) {
                // Obtenemos la plantilla utilizando document.querySelector
                var mealTemplate = document.querySelector('#meal');

                // Limpiamos las cartas de comidas existentes
                divResultados.innerHTML = '';

                // Iteramos sobre las comidas y las añadimos al cuerpo del documento
                for (const meal of data.meals) {
                    try {
                        // Obtenemos datos adicionales mediante el idMeal
                        const additionalData = await fetchAdditionalData(meal.idMeal);

                        // Loggeamos los datos adicionales
                        console.log('Datos adicionales:', additionalData);

                        // Pasamos los datos adicionales junto con la comida y la plantilla
                        appendMealCard(meal, mealTemplate, additionalData);
                    } catch (error) {
                        console.error('Error al obtener datos adicionales:', error);
                    }
                }
            } else {
                // Mostramos un mensaje de error en el tercer elemento de retroalimentación de error
                setErrorMessage('No se encontraron comidas para el país especificado.', 3);
            }
        } catch (error) {
            // Mostramos un mensaje de error en el tercer elemento de retroalimentación de error
            console.error('Error en la API:', error);
            setErrorMessage('Error al obtener datos. Por favor, inténtalo de nuevo más tarde.', 3);
        }
    });

    // Función para obtener datos adicionales mediante el idMeal
    async function fetchAdditionalData(idMeal) {
        try {
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`);
            const additionalData = await response.json();
            return additionalData;
        } catch (error) {
            throw new Error('Error al obtener datos adicionales:', error);
        }
    }

    // Función para añadir una carta de comida al cuerpo del documento
    function appendMealCard(meal, template, additionalData) {
        try {
            // Clonamos el contenido de la plantilla
            var mealCard = template.content.cloneNode(true);

            // Establecemos los datos de la comida en la carta
            mealCard.querySelector('.mealImage').src = meal.strMealThumb;
            mealCard.querySelector('.type').textContent = additionalData.meals.strCategory;
            mealCard.querySelector('.country').textContent = additionalData.strArea;
            mealCard.querySelector('.countryFlag').src = additionalData.strMealThumb;
            mealCard.querySelector('.mealName').textContent = meal.strMeal;

            // Añadimos imágenes e ingredientes a la carta
            for (var i = 1; i <= 4; i++) {
                var ingredientImage = mealCard.querySelector(`.ingredient${i}image`);
                var ingredientName = mealCard.querySelector(`.ingredient${i}`);
                ingredientImage.src = additionalData.meals[`strIngredient${i}Thumb`];
                ingredientName.textContent = additionalData.meals[`strIngredient${i}`];
            }

            // Mostramos los datos adicionales en la carta
            var additionalInfoElement = mealCard.querySelector('.additionalInfo');
            if (additionalInfoElement) {
                additionalInfoElement.textContent = JSON.stringify(additionalData);
            }

            // Añadimos la carta de comida al cuerpo del documento
            divResultados.appendChild(mealCard);
        } catch (error) {
            console.error('Error al añadir la carta de comida:', error);
        }
    }

    // Función para establecer un mensaje de error
    function setErrorMessage(message, errorFeedbackIndex) {
        // Encontramos el elemento de retroalimentación de error basado en su nodo padre
        var errorFeedbackElement = document.querySelectorAll('.error-feedback')[errorFeedbackIndex - 1];

        // Establecemos el contenido de texto para el elemento de retroalimentación de error específico
        if (errorFeedbackElement) {
            errorFeedbackElement.textContent = message;
        }
    }
});
