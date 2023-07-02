// main.js

const apiKey = "967bbcb4";
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const resultsContainer = document.getElementById("resultsContainer");

function displayMovieData(movieData) {
  // Create a container for the movie
  const movieContainer = document.createElement("div");
  movieContainer.classList.add("movie");

  // Create an image element for the movie poster
  const posterImg = document.createElement("img");
  posterImg.src = movieData.Poster;
  posterImg.alt = `${movieData.Title} Poster`;

  // Create a div to hold movie information
  const movieInfoDiv = document.createElement("div");

  // Create a heading for the movie title
  const titleHeading = document.createElement("h2");
  titleHeading.textContent = movieData.Title;

  // Create a paragraph for the movie details
  const detailsPara = document.createElement("p");
  detailsPara.innerHTML = `<strong>Year:</strong> ${movieData.Year}<br>
                            <strong>Rated:</strong> ${movieData.Rated}<br>
                            <strong>Runtime:</strong> ${movieData.Runtime}<br>
                            <strong>Genre:</strong> ${movieData.Genre}<br>
                            <strong>Director:</strong> ${movieData.Director}<br>
                            <strong>Plot:</strong> ${movieData.Plot}<br>`;

  // Append all elements to the movie container
  movieInfoDiv.appendChild(titleHeading);
  movieInfoDiv.appendChild(detailsPara);
  movieContainer.appendChild(posterImg);
  movieContainer.appendChild(movieInfoDiv);

  // Append the movie container to the results container
  resultsContainer.appendChild(movieContainer);
}

function displayError(message) {
  const errorPara = document.createElement("p");
  errorPara.classList.add("error");
  errorPara.textContent = message;
  resultsContainer.innerHTML = "";
  resultsContainer.appendChild(errorPara);
}

async function fetchMovieData(searchTerm) {
  try {
    const response = await fetch(`https://www.omdbapi.com/?t=${searchTerm}&apikey=${apiKey}`);
    const data = await response.json();
    if (data.Response === "True") {
      displayMovieData(data);
    } else {
      displayError(data.Error);
    }
  } catch (error) {
    displayError("An error occurred while fetching movie data.");
  }
}

function handleSearch() {
  const searchTerm = searchInput.value.trim();
  if (searchTerm === "") {
    displayError("Please enter a movie title.");
  } else {
    fetchMovieData(searchTerm);
  }
}

searchButton.addEventListener("click", handleSearch);
