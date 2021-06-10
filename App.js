const APIKEY = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";

const IMGPATH = "https://image.tmdb.org/t/p/w1280/";

const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

// Showing Popular Movies-->
getMovies(APIKEY);

async function getMovies(url) {
    const resp = await fetch(url);
    const respData = await resp.json();

    console.log(respData);

    showMovies(respData.results)

    // respData.results.forEach(movie => {
    //    const {poster_path, title, vote_average} = movie;

    //     const movieE1 = document.createElement("div");
    //     movieE1.classList.add("movie");
    //     movieE1.innerHTML = `
    //          <img src="${IMGPATH + poster_path}" alt="">

    //             <div class="movie-info">
    //             <h4>${title}</h4>
    //             <span class= "${getclassbyrate(vote_average)}"> ${vote_average}</span>
    //         </div>
    //     `;
    //     main.appendChild(movieE1);
    // });

    // return respData;
}

function showMovies(movies) {

    // clearing main before showing the searched movie list
    main.innerHTML = "";

    movies.forEach(movie => {
       const {poster_path, title, vote_average, overview} = movie;

        const movieE1 = document.createElement("div");
        movieE1.classList.add("movie");
        movieE1.innerHTML = `
             <img src="${IMGPATH + poster_path}" alt="">

            <div class="movie-info">
                <h4>${title}</h4>
                <span class= "${getclassbyrate(vote_average)}"> ${vote_average}</span>
            </div>
            <div class="overview">
                <h4>Description</h4>
                ${overview}
            </div>
        `;
        main.appendChild(movieE1);
    });

}

function getclassbyrate(vote) {
    if (vote >= 8) {
        return "green";
    } else if (vote >= 5) {
        return "orange" ;
    } else{
        return "red";
    }
}

// Search Movies -->

form.addEventListener("submit" , (e)=> {
    e.preventDefault();

    const searchTerm = search.value;
    if (searchTerm) {
        getMovies(SEARCHAPI + searchTerm);

        search.value ="";
    }
});