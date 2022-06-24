import API_KEY from "./conf.js";

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
    },
    params: {
        'api_key':API_KEY,
    },
});

const API_URL = 'https://api.themoviedb.org/3';
const TRENDING_MOVIES = '/trending/movie/';
const TRENDING_MOVIES_DAY = 'day';
const MOVIE_IMG = 'https://image.tmdb.org/t/p/w500/';
const MOVIE_GENRES = '/genre/movie/list';
const MOVIES_BY_GENRE = '/discover/movie?with_genres=';

const createMovies = (data, container) => {
    container.innerHTML = '';

    data.forEach(movie => {
        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie-container');
        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt', movie.original_title);
        movieImg.setAttribute('src', 'https://image.tmdb.org/t/p/w300/'+movie.poster_path);
        // movieImg.setAttribute('onload', "lazy");
    
        movieContainer.addEventListener('click', () => {
            location.hash = `movie=${movie.id}`;
        });

        container.appendChild(movieContainer);
        container.scrollTo(0, 0);
        movieContainer.appendChild(movieImg);
    });
} 

const createGenres = (data, container) => {
    container.innerHTML = '';
    data.forEach(genre => {
        const genreContainer = document.createElement('div');
        genreContainer.classList.add("category-container");
        const genreTitle = document.createElement('h3');
        genreTitle.classList.add("category-title");
        genreTitle.setAttribute('id', `id${genre.id}`);
        genreTitle.innerText = genre.name;
        
        genreTitle.addEventListener('click', () => {
            location.hash = `#category=${genre.id}-${genre.name}`
            // console.log(`${genre.name}: ${genre.id}`);
        });

        container.appendChild(genreContainer);
        container.scrollTo(0, 0);
        genreContainer.appendChild(genreTitle);
    });
}

const getTrendingMoviesPreview = async () => {
    try {
        const { data, status, config } = await api(TRENDING_MOVIES+TRENDING_MOVIES_DAY);
        // console.log(config)
        if (status !== 200) {
            console.log(`Error: status code${res.status} Details:${data.message}`) 
        } else {
            const movies = data.results;
            // console.log(movies);
            createMovies(movies, trendingMoviesPreviewList);
            
            trendingBtn.addEventListener('click', createMovies(movies, genericSection));
        }
    } catch {
        console.error(new Error('Error: '));
    }
}

const getMovieGenresList = async () => {
    try {
        const res = await fetch(API_URL+MOVIE_GENRES+'?api_key='+API_KEY);
        const data = await res.json();
        if (res.status !== 200) {
            console.log(`Error: status code${res.status} Details:${data.message}`) 
        } else {
            const genres = data.genres;
            // console.log(genres);
            createGenres(genres, categoriesPreviewList);
        }
    } catch {
        console.error(new Error('Error: '));
    }
}

const getMoviesByCategory = async (id) => {
    try {
        const { data, status, config } = await api(MOVIES_BY_GENRE+id);
        // console.log(config)
        if (status !== 200) {
            console.log(`Error: status code${res.status} Details:${data.message}`);
        } else {
            const movies = data.results;
            // console.log(movies);
            createMovies(movies, genericSection);
        }
    } catch {
        console.error(new Error('Error: '));
    }
}

const getMoviesBySearch = async (id) => {
    try {
        const { data, status } = await api('search/movie', {
            params: {query: id}
        });
        if (status !== 200) {
            console.log(`Error: status code${res.status} Details:${data.message}`); 
        } else {
            const movies = data.results;
            // console.log(movies);
            createMovies(movies, genericSection);
        }
    } catch {
        console.error(new Error('Error: '));
    }
}

const getMovieDetails = async (id) => {
    try {
        const { data, status } = await api('/movie/'+id);

        const getSimilarMovies = async () => {
            const { data, status } = await api('/movie/'+id+'/similar');
            // console.log(data);
            if (status !== 200) {
                console.log(`Error: status code${res.status} Details:${data.message}`);
            } else {
                const movies = data.results;
                // console.log(movies);
                createMovies(movies, relatedMoviesContainer);
            }
        }
        
        if (status !== 200) {
            console.log(`Error: status code${res.status} Details:${data.message}`);
        } else {
            // console.log(data);
            //Background debe ser el poster de cada película. LISTO

            /*Cambiar: 
            título LISTO
            rating LISTO
            descripción LISTO
            géneros LISTO
            películas similares LISTO

            Agregar: 
            página de la película LISTO
            productoras
            país de producción
            fecha de lanzamiento LISTO
            duración LISTO
            */
    
            headerSection.style.cssText = `
                background: linear-gradient(180deg, rgba(0, 0, 0, 0.35) 19.27%, rgba(0, 0, 0, 0) 29.17%), url('${MOVIE_IMG+data.poster_path}');
                background-size: cover !important;
                height: 480px;
                position: fixed;
                top: 0;
                width: 100%;
            `;

            movieDetailTitle.innerText = data.title;
            movieDetailScore.innerHTML = data.vote_average;
            movieDetailDescription.innerHTML = data.overview;

            const movieDet = document.getElementById('movieDetails');

            movieDet.innerHTML = `
            <p>Fecha de lanzamiento: ${data.release_date}</p>
            <p>Duración: ${data.runtime} minutos</p>
            <a href='${data.homepage}'>Página principal</a>
            `;
            
            createGenres(data.genres, categoriesMovieList);

            getSimilarMovies();
            
            location.hash = `#movie=${data.id}`;
        }
    } catch {
        console.error(new Error('Error: '));
    }
}

export {getMovieGenresList, getTrendingMoviesPreview, getMoviesByCategory, getMoviesBySearch, getMovieDetails}