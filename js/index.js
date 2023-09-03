//! HTML ELEMENTS
// let mainContainer = document.getElementById("mainContainer");
// let contactContainer = document.getElementById("contactContainer");
// let searchContainer = document.getElementById("searchContainer");

// ======================================================================
//! Meals Apis
const filterBaseUrl = `https://www.themealdb.com/api/json/v1/1/filter.php`;
const listBaseUrl = `https://www.themealdb.com/api/json/v1/1`;
const apiUrls = {
  area: {
    list: `${listBaseUrl}/list.php?a=list`,
    filter: `${filterBaseUrl}`,
  },
  categories: {
    list: `${listBaseUrl}/categories.php`,
    filter: `${filterBaseUrl}`,
  },
  search: {
    filter: `${listBaseUrl}/search.php`,
  },
  ingredients: {
    list: `${listBaseUrl}/list.php?i=list`,
    filter: `${filterBaseUrl}`,
    details: `${listBaseUrl}/lookup.php`,
  },
};
// ========================================================================

//! Functions to get data from Api

async function getCategories() {
  let response = await fetch(apiUrls.categories.list);
  let data = await response.json();
  return data.categories;
}

async function getMealsByCategory(category) {
  let response = await fetch(`${apiUrls.categories.filter}?c=${category}`);
  let data = await response.json();
  return data.meals;
}

async function getAreas() {
  let response = await fetch(apiUrls.area.list);
  let data = await response.json();
  return data.meals;
}
async function getMealsByArea(area) {
  let response = await fetch(`${apiUrls.area.filter}?a=${area}`);
  let data = await response.json();
  return data.meals;
}

async function searchMeals(q) {
  let response = await fetch(`${apiUrls.search.filter}?s=${q}`);
  let data = await response.json();
  return data.meals;
}

async function searchMealsByFirstLetter(q) {
  let response = await fetch(`${apiUrls.search.filter}?f=${q}`);
  let data = await response.json();
  return data.meals;
}

async function getIngredients() {
  let response = await fetch(`${apiUrls.ingredients.list}`);
  let data = await response.json();
  return data.meals;
}

async function getMealsByIngredient(ingredient) {
  let response = await fetch(`${apiUrls.ingredients.filter}?i=${ingredient}`);
  let data = await response.json();
  return data.meals;
}

async function getMealDetailsByIngredientId(ingredientId) {
  let response = await fetch(
    `${apiUrls.ingredients.details}?i=${ingredientId}`
  );
  let data = await response.json();
  return data.meals;
}
// ===============================================================

//! Get HTML

function getMealHtml(meal) {
  return `<div class="col-md-3 g-4">
    <div class="meal position-relative" onclick="filterMealIngredientById(${meal.idMeal})">
      <img
        src="${meal.strMealThumb}"
        alt=""
        class="img-fluid w-100 rounded-3"
      />
      <div class="layer position-absolute rounded-3 d-flex align-items-center">
        <h3 class="p-2">${meal.strMeal}</h3>
      </div>
    </div>
  </div>`;
}

function getSearchHtml() {
  return `<div class="row py-4">
  <div class="col-md-6">
    <input id="searchName"
      class="form-control bg-transparent text-white"
      type="text"
      placeholder="Search By Name"
    />
  </div>
  <div class="col-md-6">
    <input id="searchLetter"
      class="form-control bg-transparent text-white"
      type="text"
      placeholder="Search By First Letter"
      maxLength=1
    />
  </div>
  </div>`;
}

function getCategoryHtml(category) {
  return `<div class="col-md-3 g-4">
        <div class="meal position-relative" onclick="filterCategory('${
          category.strCategory
        }')">
        <img
          src="${category.strCategoryThumb}"
          alt=""
          class="img-fluid w-100 rounded-3"
        />
        <div class="layer position-absolute rounded-3 text-center align-items-center">
          <h3 class="p-2">${category.strCategory}</h3>
          <p class="p-2">${category.strCategoryDescription
            .split(" ")
            .slice(0, 20)
            .join(" ")}</p>
        </div>
      </div>
    </div>`;
}

function getAreaHtml(area) {
  return `<div class="col-md-3 g-4">
  <div class="areas" onclick="filterArea('${area.strArea}')">
    <i class="text-white fa-solid fa-house-laptop fa-4x"></i>
    <h3 class="text-white">${area.strArea}</h3>
  </div>
</div>`;
}

function getIngredientsHtml(ingredient) {
  if (!ingredient.strDescription) {
    return ``;
  }
  return `<div class="col-md-3 g-4">
  <div class="ingredients text-center">
  <i class="text-white fa-solid fa-drumstick-bite fa-4x" onclick="filterIngredient('${
    ingredient.strIngredient
  }')"></i>
  <h3 class="text-white">${ingredient.strIngredient}</h3>
  <p class="p-2 text-white ">${ingredient.strDescription
    .split(" ")
    .slice(0, 20)
    .join(" ")}</p>
  </div>
</div>`;
}

function getMealDetailsByIdHtml(detail) {
  if (!detail.strIngredient1) {
    return ``;
  }

  return `<div class="col-md-4 text-white">
  <img
    class="w-100 rounded-3"
    src="${detail.strMealThumb}"
    alt=""
  />
  <h2>${detail.strMeal}</h2>
</div>
<div class="col-md-8 text-white">
  <h2>Instructions</h2>
  <p>
    ${detail.strInstructions}
  </p>
  <h3><span class="fw-bolder">Area : </span>${detail.strArea}</h3>
  <h3><span class="fw-bolder">Category : </span>${detail.strCategory}</h3>
  <h3>Recipes :</h3>
  <ul class="list-unstyled d-flex g-3 flex-wrap">
    <li class="alert alert-info m-2 p-1">${detail.strIngredient1}</li>
    <li class="alert alert-info m-2 p-1">${detail.strIngredient2}</li>
    <li class="alert alert-info m-2 p-1">${detail.strIngredient3}</li>
    <li class="alert alert-info m-2 p-1">${detail.strIngredient4}</li>
    <li class="alert alert-info m-2 p-1">${detail.strIngredient5}</li>
  </ul>

  <h3>Tags :</h3>
  <ul class="list-unstyled d-flex g-3 flex-wrap">
    <li class="alert alert-danger m-2 p-1">${detail.strTags}</li>
  </ul>

  <a
    target="_blank"
    href="${detail.strSource}"
    class="btn btn-success"
    >Source</a
  >
  <a
    target="_blank"
    href="${detail.strYoutube}"
    class="btn btn-danger"
    >Youtube</a
  >
</div>`;
}

function ContactUsHtml() {
  return `
  <div class="col-md-6">
    <input
      id="nameInput"
      type="text"
      class="form-control"
      placeholder="Enter Your Name"
      onkeyup="validateInput('name', this.value)"
    />
    <p id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
      Special characters and numbers not allowed
    </p>
  </div>
  <div class="col-md-6">
    <input
      id="emailInput"
      type="email"
      class="form-control"
      placeholder="Enter Your Email"
      onkeyup="validateInput('email', this.value)"
    />
    <p id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
      Email not valid *exemple@yyy.zzz
    </p>
  </div>
  <div class="col-md-6">
    <input
      id="phoneInput"
      type="text"
      class="form-control"
      placeholder="Enter Your Phone"
      onkeyup="validateInput('phone', this.value)"
    />
    <p id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
      Enter valid Phone Number
    </p>
  </div>
  <div class="col-md-6">
    <input
      id="ageInput"
      type="number"
      class="form-control"
      placeholder="Enter Your Age"
      onkeyup="validateInput('age', this.value)"
    />
    <p id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
      Enter valid age
    </p>
  </div>
  <div class="col-md-6">
    <input
      id="passwordInput"
      type="password"
      class="form-control"
      placeholder="Enter Your Password"
      onkeyup="validateInput('password', this.value)"
    />
    <p
      id="passwordAlert"
      class="alert alert-danger w-100 mt-2 d-none"
    >
      Enter valid password *Minimum eight characters, at least one
      letter and one number:*
    </p>
  </div>
  <div class="col-md-6">
    <input
      id="rePasswordInput"
      type="password"
      class="form-control"
      placeholder="Confirm password"
      onkeyup="validateInput('rePassword', this.value)"
    />
    <p
      id="rePasswordAlert"
      class="alert alert-danger w-100 mt-2 d-none"
    >
      Confirm password does not match password!
    </p>
  </div>

  <button
    id="submitBtn"
    disabled=""
    class="btn btn-outline-danger px-2 mt-3 w-25 mx-auto"
  >
    Submit
  </button>
`;
}

// ==========================================

async function displayMainPage() {
  meals = await searchMeals("");
  let html = ``;
  for (let i = 0; i < meals.length; i++) {
    html += getMealHtml(meals[i]);
  }
  $("#mainContainer").html(html);
}

async function displaySearchItems(q) {
  meals = await searchMeals(q);
  let html = ``;
  for (let i = 0; i < meals.length; i++) {
    html += getMealHtml(meals[i]);
  }
  $("#mainContainer").html(html);
}

async function displaySearchItemsByFirstLetter(q) {
  meals = await searchMealsByFirstLetter(q);
  let html = ``;
  for (let i = 0; i < meals.length; i++) {
    html += getMealHtml(meals[i]);
  }
  $("#mainContainer").html(html);
}

async function displayCategories() {
  categories = await getCategories();
  let html = ``;
  for (let i = 0; i < categories.length; i++) {
    html += getCategoryHtml(categories[i]);
  }
  $("#mainContainer").html(html);
}

async function filterCategory(categoryName) {
  meals = await getMealsByCategory(categoryName);
  let html = ``;
  for (let i = 0; i < meals.length; i++) {
    html += getMealHtml(meals[i]);
  }
  $("#mainContainer").html(html);
}

async function displayArea() {
  areas = await getAreas();
  let html = ``;
  for (let i = 0; i < areas.length; i++) {
    html += getAreaHtml(areas[i]);
  }
  $("#mainContainer").html(html);
}

async function filterArea(area) {
  meals = await getMealsByArea(area);
  let html = ``;
  for (let i = 0; i < meals.length; i++) {
    html += getMealHtml(meals[i]);
  }
  $("#mainContainer").html(html);
}

async function displayIngredient() {
  ingredients = await getIngredients();
  let html = ``;
  for (let i = 0; i < ingredients.length; i++) {
    html += getIngredientsHtml(ingredients[i]);
  }
  $("#mainContainer").html(html);
}

async function filterIngredient(ingredient) {
  meals = await getMealsByIngredient(ingredient);
  let html = ``;
  for (let i = 0; i < meals.length; i++) {
    html += getMealHtml(meals[i]);
  }
  $("#mainContainer").html(html);
}

async function filterMealIngredientById(detail) {
  meals = await getMealDetailsByIngredientId(detail);
  let html = ``;
  for (let i = 0; i < meals.length; i++) {
    html += getMealDetailsByIdHtml(meals[i]);
  }
  $("#mainContainer").html(html);
}

function displayContactUs() {
  let html = ``;
  html += ContactUsHtml();
  $("#contactContainer").html(html);
}

function displaySearch() {
  let html = ``;
  html += getSearchHtml();
  $("#searchContainer").html(html);
}

// --------------------------------------
$(document).ready(function () {
  $("#loading .spinner").fadeOut(500, function () {
    $("#loading").fadeOut(500, function () {
      $("body").css("overflow", "auto");
    });
    $("#loading").removeClass();
    $("#sideBar").css({ left: -sideBarInnerWidth });
  });

  let sideBarInnerWidth = $("#sideBarInner").innerWidth();

  $(".menu-icon").click(function () {
    if ($("#sideBar").css("left") == "0px") {
      closeSideBar();
    } else {
      openSideBar();
    }
  });

  function closeSideBar() {
    $("#sideBar").animate({ left: -sideBarInnerWidth }, 500);
    $(".fa-align-justify").toggleClass("fa-times");
    $(".links .item1").animate({ opacity: "0", marginTop: "200px" }, 500);
    $(".links .item2").animate({ opacity: "0", marginTop: "200px" }, 600);
    $(".links .item3").animate({ opacity: "0", marginTop: "200px" }, 700);
    $(".links .item4").animate({ opacity: "0", marginTop: "200px" }, 800);
    $(".links .item5").animate({ opacity: "0", marginTop: "200px" }, 900);
  }

  function openSideBar() {
    $("#sideBar").animate({ left: "0px" }, 500);
    $(".fa-align-justify").toggleClass("fa-times");
    $(".links .item1").animate({ opacity: "1", marginTop: "25px" }, 500);
    $(".links .item2").animate({ opacity: "1", marginTop: "25px" }, 600);
    $(".links .item3").animate({ opacity: "1", marginTop: "25px" }, 700);
    $(".links .item4").animate({ opacity: "1", marginTop: "25px" }, 800);
    $(".links .item5").animate({ opacity: "1", marginTop: "25px" }, 900);
  }

  $(".inner-links a").click(async function (e) {
    let page = e.target.getAttribute("data");
    console.log(page);
    closeSideBar();
    mainContainer.innerHTML = "";
    searchContainer.innerHTML = "";
    contactContainer.innerHTML = "";
    switch (page) {
      case "search":
        displaySearch();
        $("#searchName").keyup((e) => {
          if (e.target.value == "") {
            displaySearchItems("");
          } else {
            displaySearchItems(e.target.value);
          }
        });
        $("#searchLetter").keyup((e) => {
          if (e.target.value == "") {
            displaySearchItemsByFirstLetter("");
          } else {
            const firstLetter = e.target.value.charAt(0);
            displaySearchItemsByFirstLetter(firstLetter);
          }
        });
        break;
      case "categories":
        displayCategories();
        break;
      case "area":
        displayArea();
        break;
      case "ingredients":
        displayIngredient();
        break;
      case "contact":
        displayContactUs();
        break;
    }
  });

  displayMainPage();
});

// ======================================================================

//!VALIDATION VARIABLES

const nameRegex = /^[a-zA-Z\s]+$/;
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const phoneRegex = /^\d{11}$/;
const ageRegex = /^\d{1,3}$/;
const passwordRegex = /^.{6,}$/;

// VALIDATION
let isNameValid = false;
let isEmailValid = false;
let isPhoneValid = false;
let isAgeValid = false;
let isPasswordValid = false;
let isRePasswordValid = false;

function validateInput(fieldName, value) {
  switch (fieldName) {
    case "name":
      isNameValid = isValidInput(value, nameRegex);
      $("#nameAlert").toggleClass("d-none", isNameValid);
      break;
    case "email":
      isEmailValid = isValidInput(value, emailRegex);
      $("#emailAlert").toggleClass("d-none", isEmailValid);
      break;
    case "phone":
      isPhoneValid = isValidInput(value, phoneRegex);
      $("#phoneAlert").toggleClass("d-none", isPhoneValid);
      break;
    case "age":
      isAgeValid = isValidInput(value, ageRegex) && value > 0;
      $("#ageAlert").toggleClass("d-none", isAgeValid);
      break;
    case "password":
      isPasswordValid = isValidInput(value, passwordRegex);
      $("#passwordAlert").toggleClass("d-none", isPasswordValid);
      break;
    case "rePassword":
      isRePasswordValid = $("#passwordInput").val() === value;
      $("#rePasswordAlert").toggleClass("d-none", isRePasswordValid);
      break;
  }

  $("#submitBtn").prop("disabled", !isFormValid());
}

function isValidInput(input, regex) {
  return regex.test(input);
}

function isFormValid() {
  return (
    isNameValid &&
    isEmailValid &&
    isPhoneValid &&
    isAgeValid &&
    isPasswordValid &&
    isRePasswordValid
  );
}

$("#submitBtn").prop("disabled", isFormValid()); // Initially disable the submit button
