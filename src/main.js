import API_KEY from "./conf.js";
const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
    },
    params: {
        'api_key':'cdedb459ae6988c5c8f65b9364f7d607',
    },
});

const API_URL = 'https://api.themoviedb.org/3';
const TRENDING_MOVIES = '/trending/movie/';
const TRENDING_MOVIES_DAY = 'day';
const TRENDING_MOVIES_WEEK = 'week';
const MOVIE_IMG = 'https://image.tmdb.org/t/p/w500/'
const MOVIE_GENRES = '/genre/movie/list'

const getTrendingMoviesPreview = async () => {
    try {
        const { data, status, config } = await api(TRENDING_MOVIES+TRENDING_MOVIES_DAY);
        console.log(config)
        if (status !== 200) {
            console.log(`Error: status code${res.status} Details:${data.message}`) 
        } else {
            const movies = data.results;
            console.log(movies)
            movies.forEach(movie => {
                const trendingPreviewMovies = document.querySelector('#trendingPreview .trendingPreview-movieList');

                const movieContainer = document.createElement('div');
                movieContainer.classList.add('movie-container');
                const movieImg = document.createElement('img');
                movieImg.classList.add('movie-img');
                movieImg.setAttribute('alt', movie.original_title);
                movieImg.setAttribute('src', MOVIE_IMG+movie.poster_path);
                // movieImg.setAttribute('onload', "lazy");
                
                trendingPreviewMovies.appendChild(movieContainer);
                movieContainer.appendChild(movieImg);
            })
        }
    } catch {
        console.error(new Error('Error: '));
    }
}

const getMovieGenresList = async () => {
    try {
        const res = await fetch(API_URL+MOVIE_GENRES+API_KEY);
        const data = await res.json();
        if (res.status !== 200) {
            console.log(`Error: status code${res.status} Details:${data.message}`) 
        } else {
            const genres = data.genres;
            // console.log(genres);
            genres.forEach(genre => {
                const movieGenres = document.querySelector('#categoriesPreview .categoriesPreview-list');
                movieGenres.innerHTML += `
                <div class="category-container">
                    <h3 id="id${genre.id}" class="category-title">${genre.name}</h3>
                </div>
                `;
                // const genreContainer = document.createElement('div');
                // genreContainer.classList.add("category-container");
                // const genreTitle = document.createElement('h3');
                // genreTitle.classList.add("category-title");
                // genreTitle.setAttribute('id', `id${genre.id}`);
                // genreTitle.innerText = genre.name;

                // movieGenres.appendChild(genreContainer);
                // genreContainer.appendChild(genreTitle);
            })
        }
    } catch {
        console.error(new Error('Error: '));
    }
}

getMovieGenresList();
getTrendingMoviesPreview();