const searchMeal = async (e) => {
  e.preventDefault();

  const input = document.querySelector(".input");
  const title = document.querySelector(".title");
  const info = document.querySelector(".info");
  const img = document.querySelector(".img");
  const ingredientsOutput = document.querySelector(".ingredients");

  const showMealInfo = (meal) => {
    const { strMeal, strMealThumb, strInstructions } = meal;
    title.textContent = strMeal;
    img.style.backgroundImage = `url(${strMealThumb})`;
    info.textContent = strInstructions;

    const ingredents = [];

    for (let i = 1; i <= 20; i++) {
      if (meal[`strIngredient${i}`]) {
        ingredents.push(
          `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
        );
      } else {
        break;
      }
    }

    const html = `
    <span>${ingredents
      .map((ing) => `<li class="ing">${ing}</li>`)
      .join("")}</span>`;

    ingredientsOutput.innerHTML = html;
  };

  const showAlert = () => {
    alert("Meal not found");
  };

  const fetchMealDate = async (val) => {
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${val}`
    );

    const { meals } = await res.json();
    return meals;
  };

  const val = input.value.trim();

  if (val) {
    const meals = await fetchMealDate(val);

    if (!meals) {
      showAlert();
      return;
    }
    meals.forEach(showMealInfo);
  } else {
    alert("PLease try searching for meal");
  }
};

const form = document.querySelector("form");
form.addEventListener("submit", searchMeal);

const magnifier = document.querySelector("magnifier");
magnifier.addEventListener("click", searchMeal);
