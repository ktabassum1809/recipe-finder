 const textbox = document.getElementById("textBox");
console.log(textbox);

async function getData() {
  try {
    const spinner = document.getElementById("spinner");
    spinner.style.visibility = "visible";
   
    let userValue = document.getElementById("textBox").value.trim();
    console.log(userValue);
   
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${userValue}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    
    meals.innerHTML = ''; // Clear previous results
    setTimeout(() => {
      spinner.style.visibility = "hidden"; // Hide the spinner
     
    }, 1000); 
    data.meals.forEach((element) => {
      console.log(element.strMeal);
      const divMealName = document.createElement("div");

      const pName = document.createElement("p");
      pName.textContent = element.strMeal;

      const imgMeal = document.createElement("img");
      imgMeal.src = element.strMealThumb;
      imgMeal.style.width = "250px";
      imgMeal.style.height = "200px";
      imgMeal.style.marginTop = "10px";

      const recipeButton = document.createElement("button");
      recipeButton.textContent = "Recipe";

      recipeButton.style.backgroundColor = "red";
      recipeButton.style.color = "white";
      recipeButton.style.width = "100px";
      recipeButton.style.height = "50px";
      recipeButton.style.borderRadius = "5px";
      recipeButton.style.margin = "10px";
      recipeButton.style.padding = "10px";
      recipeButton.style.outline = "none";
      recipeButton.style.border = "none";
      recipeButton.style.cursor = "pointer";
      recipeButton.classList.add("recipeButton");
      divMealName.style.border = "2px solid black";
      divMealName.style.margin = "10px";
      divMealName.style.padding = "10px";
      divMealName.style.color = "black";
      divMealName.style.width = "270px";
      divMealName.style.backgroundColor = "white";
      divMealName.style.boxShadow = "0 4px 8px rgba(255, 255, 255, 0.5)";
      divMealName.style.textAlign = "center";
      divMealName.style.outline = "2px solid black";
      divMealName.style.borderRadius = "7px";
      const meals = document.querySelector("#meals");
      meals.appendChild(divMealName);
      divMealName.appendChild(pName);
      divMealName.appendChild(imgMeal);
      divMealName.appendChild(recipeButton);

     

      document.getElementById("textBox").value = "";
      //-----------------------------------------------------------
      recipeButton.addEventListener("click", async function () {
        try {
          meals.style.display = "none";
          const response = await fetch(
            `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${element.idMeal}`
          );
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data1 = await response.json();
          console.log(data1);
          
          const recipeDiv = document.createElement("div");
          const closeButton = document.createElement('button');
          closeButton.innerHTML = '<i class="fa-solid fa-square-xmark fa-lg"></i>';
          closeButton.style.backgroundColor = 'black';
          closeButton.style.border = 'none';
          closeButton.style.width = '70px';
          closeButton.style.fontSize = '35px';
          closeButton.style.marginLeft = '500px';
          recipeDiv.appendChild(closeButton);
          closeButton.addEventListener('click', () => {
            recipeDiv.style.display = 'none';
          });
          recipeDiv.style.border = "1px solid #ccc";
          recipeDiv.style.margin = "20px auto";
          recipeDiv.style.padding = "20px";
          recipeDiv.style.backgroundColor = "#f9f9f9";
          recipeDiv.style.width = "80%";
          recipeDiv.style.maxWidth = "600px";
          recipeDiv.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
          recipeDiv.style.borderRadius = "10px";
          recipeDiv.style.overflowY = "auto";
          recipeDiv.style.maxHeight = "600px";
     
          const main = document.querySelector("main");
          main.appendChild(recipeDiv);

          data1.meals.forEach((element) => {
            const mealName = document.createElement("h2");
            mealName.innerText = element.strMeal;
            mealName.style.textAlign = "center";
            mealName.style.color = "#333";

            const img = document.createElement("img");
            img.src = element.strMealThumb;
            img.style.width = "100%";
            img.style.height = "auto";
            img.style.borderRadius = "10px";
            img.style.marginTop = "20px";

            const h3 = document.createElement("h3");
            h3.innerText = "Ingredients";
            h3.style.color = "#555";
            h3.style.marginTop = "20px";

            const instruction = document.createElement("div");
            instruction.innerText = element.strInstructions;
            instruction.style.textAlign = "left";
            instruction.style.marginTop = "20px";
            instruction.style.fontSize = "18px";
            instruction.style.lineHeight = "2";
            instruction.style.color = "#666";

            const youtubeLink = document.createElement("a");
            youtubeLink.href = element.strYoutube;
            youtubeLink.style.textDecoration = "none";
            youtubeLink.target = "_blank";
            youtubeLink.innerText = "Watch Video";
            youtubeLink.style.display = "block";
            youtubeLink.style.marginTop = "20px";
            youtubeLink.style.color = "#007BFF";
            youtubeLink.style.fontWeight = "bold";
            youtubeLink.style.textAlign = "center";
            recipeDiv.appendChild(mealName);
            recipeDiv.appendChild(img);
            const ingredients = [
              element.strIngredient1,
              element.strIngredient2,
              element.strIngredient3,
              element.strIngredient4,
              element.strIngredient5,
              element.strIngredient6,
              element.strIngredient7,
              element.strIngredient8,
              element.strIngredient9,
              element.strIngredient10,
            ];
            ingredients.forEach((ingredient) => {
              if (ingredient) {
                const pIngredient = document.createElement("p");
                pIngredient.innerText = ingredient;
                pIngredient.classList.add("ingredient");
                pIngredient.style.margin = "5px 0";
                recipeDiv.appendChild(pIngredient);
              }
            });

            recipeDiv.appendChild(h3);
            recipeDiv.appendChild(instruction);
            recipeDiv.appendChild(youtubeLink);

            
          });
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      });
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

const button = document.getElementById("search");
button.addEventListener("click", getData); 

