let inputField = document.getElementById("inputField")
let searchBtn = document.getElementById("search-btn")
let foodBox = document.getElementById("food-box")
let foodInfo = document.getElementById("food-info")
let modalBody = document.getElementById("modal-body")
let searchValue = ""
let searchedData

attachOnClick = () => {
    let mealItem = document.querySelectorAll(".meal-item")
    mealItem.forEach(item => {
        item.addEventListener('click', (s) => {
            let clickedItem = s.target.title
            let clickedItemDetails = searchedData.meals.filter(meal => meal.strMeal == clickedItem)[0]
            foodInfo.innerHTML = ''
            modalBody.innerHTML = ''
            const img = clickedItemDetails.strMealThumb
            const name = clickedItemDetails.strMeal
            var image = document.createElement('img');
            image.src = img
            image.alt = name
            image.style.width = "175px"
            image.style.height = "175px"
            image.style.display = "block"
            image.setAttribute("class", "mx-auto my-3")
            var category = document.createElement("h3");
            var node = document.createTextNode(`${name} - Ingredient`);
            category.setAttribute('class', 'text-center mt-2')
            category.appendChild(node);
            modalBody.appendChild(image)
            modalBody.appendChild(category)
            for (let i = 1; i <= 20; i++) {
                const ingredient = clickedItemDetails[`strIngredient${i}`]
                if (Boolean(ingredient)) {
                    var category = document.createElement("p");
                    var node = document.createTextNode(`${i} - ${ingredient}`);
                    category.setAttribute('class', 'mt-1 text-center')
                    category.appendChild(node);
                    // modalBody.appendChild(category)
                    modalBody.appendChild(category)
                }
            }
        })
    })
}

inputField.addEventListener('change', (s) => {
    searchValue = s.target.value
})


returnMeal = (mealsObj) => {
    if (mealsObj.meals != null) {
        foodBox.innerHTML = ''
        mealsObj.meals.map((meal, index) => {
            const img = meal.strMealThumb
            const name = meal.strMeal
            var div = document.createElement("div");
            div.setAttribute("class", 'meal-item m-4');
            div.setAttribute("data-toggle", 'modal');
            div.setAttribute("data-target", '#exampleModal');
            div.style.width = "200px";
            div.style.cursor = "pointer";
            var image = document.createElement('img');
            image.src = img
            image.title = name
            image.alt = name
            image.setAttribute("class", "img-fluid")
            var category = document.createElement("p");
            var node = document.createTextNode(name);
            category.setAttribute('class', 'text-center mt-2')
            category.setAttribute('title', name)
            category.appendChild(node);
            div.appendChild(image)
            div.appendChild(category)
            foodBox.appendChild(div)

        })
    } else {
        foodBox.innerHTML = ''
        var category = document.createElement("p");
        var node = document.createTextNode('No items found.Please try again !');
        category.setAttribute('class', 'mt-5 text-danger')
        category.appendChild(node);
        foodBox.appendChild(category)
    }
    attachOnClick()
}

searchBtn.addEventListener("click", () => {
    if (searchValue == '') {
        alert("You cant keep it empty! :( ")
        return
    }
    if (searchedData == undefined) {
        foodBox.innerHTML = ''
        var category = document.createElement("p");
        var node = document.createTextNode('Searching');
        category.setAttribute('class', 'mt-5 text-success')
        category.appendChild(node);
        foodBox.appendChild(category)
    }
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`)
        .then(response => response.json())
        .then(data => searchedData = data)
        .then(() => {
            returnMeal(searchedData)
        })
})

