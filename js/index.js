const apiKey = `da817217`;
const searchBtn = document.querySelector('.search');
const inp = document.querySelector('input');
const list = document.querySelector(".list");
const movieDiv = document.querySelector(".movie");
const modalDiv = document.querySelector('.modal');
const modalList = document.querySelector('.modalList');

async function fetchMovies() {
    try {
        const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${inp.value}`);
        const data = await response.json();
        if (data.Search) {
            displayMovies(data.Search);
        } else {
            list.innerHTML = "<p>No results found</p>";
        }
    } catch (err) {
        console.log(err);
        list.innerHTML = "<p>An error occurred</p>";
    }
}

async function fetchFilmDetails(id) {
    try {
        const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${id}`);
        const data = await response.json();
        displayModal(data);
    } catch (error) {
        console.log(error);
        modalList.innerHTML = "<p>An error occurred</p>";
    }
}

function displayMovies(data) {
    const listMap = data.map(x => {
        const symbolTitle = x.Title.length > 20 ? x.Title.substring(0, 20) + '...' : x.Title;
        return `
            <div class="listItem">
                <div class='title'>
                    <h3>${symbolTitle}</h3>
                </div>
                <div class='poster'>
                    <img src="${x.Poster}" alt="${x.imdbID}" class='liImg'>
                </div>
            </div>`;
    });
    list.innerHTML = listMap.join("");
}

function displayModal(data) {
    modalList.innerHTML = `
        <div class="modalItem">
            <h2>${data.Title}</h2>
            <img src="${data.Poster}" alt="${data.Title}">
            <p>Year: ${data.Year}</p>
            <p>Director: ${data.Director}</p>
            <p>Plot: ${data.Plot}</p>
        </div>
    `;
    modalDiv.style.display = 'block';
}

searchBtn.addEventListener('click', fetchMovies);

inp.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        fetchMovies();
    }
});

movieDiv.addEventListener("click", (e) => {
    if (e.target.alt && e.target.classList.contains('liImg')) {
        fetchFilmDetails(e.target.alt);
    }
});

modalDiv.addEventListener("click", (e) => {
    if (e.target === modalDiv) {
        modalDiv.style.display = 'none';
    }
});