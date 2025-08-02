function loadCategories() {
  console.log("Loading categories...");

  fetch("https://openapi.programming-hero.com/api/phero-tube/categories#")
    .then((response) => response.json())
    .then((data) => displayCategories(data.categories));
}

function displayCategories(categories) {
  categories.forEach((cat) => {
    const categoryContainer = document.getElementById("category-container");
    const categoryDiv = document.createElement("div");
    categoryDiv.innerHTML = `<button class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>`;
    categoryContainer.appendChild(categoryDiv);
    console.log("Displaying categories:", cat);
  });
}
loadCategories();
