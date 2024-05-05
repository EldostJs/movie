const apiKey = `da817217`

const searchBtns = document.querySelector('.search')

const inp = document.querySelector('input')

const cardDiv = document.querySelector('.card')

const list = document.querySelector(".list")

const movieDiv = document.querySelector(".movie")

const modalDiv = document.querySelector('.modal')

const modalList = document.querySelector('.modalList')

async function movie() {
    try{
        const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${inp.value}`)
        const data = await response.json()  
   
        nuru(data.Search)
    }catch(err){
        console.log(err);
     list.innerHTML = ""
    }
   
}


// const fetchFilmDetails = async (id) => {
    

//     try {
//         const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${id}`)

//         const data  = await response.json();

//         console.log(data);
//         modal(data)
//     } catch (error) {
       
//     }
// }

// function modal(data) {
//     const listMap = data.map(x => `
//     <div class="listItem">
//     <div class='title'>
//     <h3>${simbolTitle}</h3>
//     </div>
//     <div class='poster'>
//     <img src="${x.Poster}" alt="${x.imdbID}" class='liImg'>
//     </div>
//     </div>
//     `)

// }

function nuru(data) {
    const listMap = data.map(x => {
        const simbolTitle = x.Title.length > 20 ? x.Title.substring(0, 20) + '...' : x.Title; 
        return `<div class="listItem">
                    <div class='title'>
                    <h3>${simbolTitle}</h3>
                    </div>
                    <div class='poster'>
                    <img src="${x.Poster}" alt="${x.imdbID}" class='liImg'>
                    </div>
                </div>`;
    });

    list.innerHTML = listMap.join("");
}


searchBtns.addEventListener('click', function () {
  movie()
})

inp.addEventListener("keyup", () => {
    movie()
})


movieDiv.addEventListener("click", (e) => {
   if(e.target.alt){
    fetchFilmDetails(e.target.alt)
}
modalDiv.style.display = 'inline-block'

})