function loadCategories() {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories#")
    .then((response) => response.json())
    .then((data) => displayCategories(data.categories));
}

function displayCategories(categories) {
  categories.forEach((cat) => {
    const categoryContainer = document.getElementById("category-container");
    const categoryDiv = document.createElement("div");
    categoryDiv.innerHTML = `
    <button onclick = "loadVideos('category/${cat.category_id}')" class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>
    `;
    categoryContainer.appendChild(categoryDiv);
  });
}
function loadCategoryVideos(categoryId) {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/`)
    .then((responsive) => responsive.json())
    .then((data) => displayVideos(data.category));
}

function loadVideos(categoryId = "videos") {
  const v = categoryId === "videos" ? "videos" : "category";
  document.getElementById("video-container").innerHTML = "";
  const url = `https://openapi.programming-hero.com/api/phero-tube/${categoryId}`;
  fetch(`https://openapi.programming-hero.com/api/phero-tube/${categoryId}`)
    .then((response) => response.json())
    .then((data) => displayVideos(data[v]));
}

function formatTimeWithMonths(seconds) {
  const SECONDS_IN_MIN = 60;
  const SECONDS_IN_HOUR = 60 * SECONDS_IN_MIN;
  const SECONDS_IN_DAY = 24 * SECONDS_IN_HOUR;
  const SECONDS_IN_MONTH = 30 * SECONDS_IN_DAY;
  const SECONDS_IN_YEAR = 365 * SECONDS_IN_DAY;

  const years = Math.floor(seconds / SECONDS_IN_YEAR);
  seconds %= SECONDS_IN_YEAR;

  const months = Math.floor(seconds / SECONDS_IN_MONTH);
  seconds %= SECONDS_IN_MONTH;

  const days = Math.floor(seconds / SECONDS_IN_DAY);
  seconds %= SECONDS_IN_DAY;

  const hours = Math.floor(seconds / SECONDS_IN_HOUR);
  seconds %= SECONDS_IN_HOUR;

  const minutes = Math.floor(seconds / SECONDS_IN_MIN);
  seconds %= SECONDS_IN_MIN;
  if (
    years === 0 &&
    months === 0 &&
    days === 0 &&
    hours === 0 &&
    minutes === 0 &&
    seconds === 0
  ) {
    return `just now`;
  } else if (years > 0) return `${years}y ago`;
  else if (months > 0) return `${months}mo ago`;
  else if (days > 0) return `${days}d ago`;
  else if (hours > 0) {
    if (minutes > 0) return `${hours}h ${minutes}m ago`;
    else return `${hours}h ago`;
  } else return `${minutes}m ${seconds}s ago`;
}

function displayVideos(videos) {
  videos.forEach((video) => {
    const videoContainer = document.getElementById("video-container");
    const videoDiv = document.createElement("div");
    videoDiv.innerHTML = `
    <div class="card">
          <figure class="relative">
            <img
              class="rounded-lg  w-full h-[220px] object-cover"
              src="${video.thumbnail}"
              alt="thumbnail"
            />
            <span
              class="absolute bg-gray-500 text-white px-1 bottom-2 right-2 rounded-md opacity-80"
              >${formatTimeWithMonths(video.others.posted_date)}</span
            >
          </figure>
          <div class="flex gap-4 py-5 pl-3">
            <div class="avatar w-6 h-6">
              <div
                class="ring-primary ring-offset-base-100 rounded-full ring-2 ring-offset-2"
              >
                <img src="${video.authors[0].profile_picture}" />
              </div>
            </div>
            <div class="intro">
              <h2 class="card-title">
                ${video.title}
              </h2>
              <div class="flex items-center gap-2">
                <p class="text-sm font-semibold text-gray-400">${
                  video.authors[0].profile_name
                }</p>
                ${
                  video.authors[0].verified
                    ? `<img class="w-6" src="https://img.icons8.com/?size=96&id=98A4yZTt9abw&format=png" alt="" />`
                    : ""
                }
              </div>
              <p class="text-sm text-gray-400">${video.others.views} views</p>
            </div>
          </div>
          <button class="btn btn-block">View Details</button>
        </div>
    `;
    videoContainer.appendChild(videoDiv);
  });
}
loadCategories();
