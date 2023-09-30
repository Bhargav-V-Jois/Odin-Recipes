// API Url 36efbeff238746f3a5813cca4c35afe0 8f44ddf412b743a3939984daaf6888f0
let api_url = `https://api.spoonacular.com/recipes/random?number=9&tags=vegetarian,dessert&apiKey=36efbeff238746f3a5813cca4c35afe0`;

let dietType = '', categoryType = '';

document.getElementById("diet").addEventListener('change', function changeDiet(event){
    dietType = event.target.value;
    api_url = `https://api.spoonacular.com/recipes/random?number=9&tags=${dietType},${categoryType}&apiKey=36efbeff238746f3a5813cca4c35afe0`;
    getAPI(api_url);
});

document.getElementById("cate").addEventListener('change', function changeCate(event){
    categoryType = event.target.value;
    api_url = `https://api.spoonacular.com/recipes/random?number=9&tags=${dietType},${categoryType}&apiKey=36efbeff238746f3a5813cca4c35afe0`;
    getAPI(api_url);
});

// Recipes Data
let recipesToDisplay = [];

// Defining async funcion
async function getAPI(url){

    // Storing Response
    const response = await fetch(url);

    // Storing Data in form of JSON
    var data = await response.json();
    var recipes = data.recipes;
    recipesToDisplay = recipes;
    if(response){
        hideLoader();
    }
    show(recipes);
}

// Calling that async function
getAPI(api_url);

// Function to hide the loader
function hideLoader(){
    document.getElementById('loading').style.display = 'none';
}

// Function to define innerHTML for HTML Table
function show(recipes){

    let card = ``;
    for (let recipe in recipes){
        card += `<div class="recipe-card">
                    <div class="recipe-image">
                        <img src = "${recipes[recipe].image}" alt=${recipes[recipe].title}/>
                    </div>
                    <h2 onclick="showRecipe(${recipe})">${recipes[recipe].title}</h2>
                    <div class="add-info">
                        <p class="p-left">Servings: ${recipes[recipe].servings}</p>
                        <p class="p-right">Time Required: ${recipes[recipe].readyInMinutes} Min</p>
                    </div>
                </div>`;
    }

    // Setting innerHTML as tab variable
    document.getElementById("recipes").innerHTML = card;
}

// Function to Show the Details of the recipe
function showRecipe(recipeID){

    console.log(recipesToDisplay[recipeID], recipeID);

    // Get ingredients
    let ingredients =   ``;
    for (let ingredient of recipesToDisplay[recipeID].extendedIngredients){
        ingredients +=  `
                        <li>${ingredient.original}</li>`;

    }

    // Get step by step instructions
    let steps =   ``;
    for (let step of recipesToDisplay[recipeID].analyzedInstructions[0].steps){
        steps +=    `
                    <li><strong>Step ${step.number}:</strong> ${step.step}</li><hr>`;
    }

    // Combine all details
    let detailsCard =   `<div class="detail-card">
                            <h2>${recipesToDisplay[recipeID].title}</h2><hr>
                            <img src="${recipesToDisplay[recipeID].image}" alt="${recipesToDisplay[recipeID].title}"/><hr>
                            <p>${recipesToDisplay[recipeID].summary}</p>
                            <h3>Ingredients:</h3>
                            <ol>
                                ${ingredients}
                            </ol>
                            <h3>Steps:</h3>
                            <ul>
                                ${steps}
                            </ul>
                            <h3>Instruction Summary:</h3>
                            <p>${recipesToDisplay[recipeID].instructions}</p>
                            <a href="${recipesToDisplay[recipeID].spoonacularSourceUrl}" alt="Source Link">Source</a> 
                        </div>`;

    // Put the recipe detail in Documnet
    document.getElementById("recipe-details").innerHTML = detailsCard;
    document.getElementById("recipe-details").style.display = "block";
    document.getElementById("blocker").style.display = "block";
    window.scrollTo(0,0);
}

function hidePopup() {
    document.getElementById("recipe-details").style.display = "none";
    document.getElementById("blocker").style.display = "none";
}