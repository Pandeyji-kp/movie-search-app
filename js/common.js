let search = document.getElementById('search')
let moviesearch = document.querySelector('row-2')

let SearchMovie = '';

search.addEventListener("keyup", async (e) => {
    SearchMovie = e.target.value;
    if (SearchMovie) {
        let data = await fetch(
            `https://api.themoviedb.org/3/search/movie?query=${SearchMovie}&api_key=04c35731a5ee918f014970082a0088b1&page=1`
        );
        let result = await data.json();
        displayMovie(result.results); 
    } else {
        moviedata(limit, skip);
    }
});


let moviedata = async (limit, skip) => {
    let data = await fetch(`https://api.themoviedb.org/3/discover/movie?${skip}&${limit}sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1`)
    let result = await data.json();
    displayMovie(result.results);
}

var limit = 15;
var skip = 0;
var page = 1;
moviedata(limit, skip);

displayMovie = (movies) => {
    const showMoviesContainer = document.querySelector('.row-2');
    if (!showMoviesContainer) {
        console.error("Element with class 'showmovies' not found.");
        return;
    }
    
    showMoviesContainer.innerHTML = '';


    let output = '';
    movies.forEach((v) => {
        output += `
             <div class="box">
                 <img src="https://image.tmdb.org/t/p/w1280${v.poster_path}" alt="${v.title}">
                 <h3>Movie name: ${v.title}</h3>
                 <h4>Release Date: ${v.release_date}</h4>
             </div>`;
    });

    showMoviesContainer.innerHTML = output;
};

document.getElementById('Previous').addEventListener('click', () => {
    if (page > 1) {
        page--;
        skip = (page - 1) * limit;
        moviedata(limit, skip);
    }
});

document.getElementById('Next').addEventListener('click', () => {
    page++;
    skip = (page - 1) * limit;
    moviedata(limit, skip);
});