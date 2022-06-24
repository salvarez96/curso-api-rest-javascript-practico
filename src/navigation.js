window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);
// const scrollTop = () => window.scrollTo(0, 0);

function smoothscroll(){
    const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
    if (currentScroll > 0) {
        window.requestAnimationFrame(smoothscroll);
        window.scrollTo (0,currentScroll - (currentScroll/5));
    }
};

searchBtn.addEventListener('click', () => {
    location.hash = `search=${searchFormInput.value}`;
});

arrowBtn.addEventListener('click', () => location.hash = history.back());
trendingBtn.addEventListener('click', () => location.hash = '#trends');

import {getMovieGenresList, getTrendingMoviesPreview, getMoviesByCategory, getMoviesBySearch, getMovieDetails} from './main.js'

function navigator() {
    location.hash.startsWith('#category=') ? categoryPage() :
    location.hash.startsWith('#movie=') ? movieDetailsPage() : 
    location.hash.startsWith('#search=') ? searchPage() :
    location.hash.startsWith('#trends') ? trendsPage() : 
    homePage();
}

const classRemoveIn = (element) => element.classList.remove('inactive');
const classAddIn = (element) => element.classList.add('inactive');

const classRemove = (element, id) => element.classList.remove(id);
const classAdd = (element, id) => element.classList.add(id);

function homePage(){
    console.log('Home');

    smoothscroll();
    classRemoveIn(headerSection);
    classRemove(headerSection, 'header-container--long');
    classAddIn(arrowBtn);
    classRemoveIn(headerTitle);
    classAddIn(headerCategoryTitle);
    classRemoveIn(searchForm);
    classRemoveIn(trendingPreviewSection);
    classRemoveIn(categoriesPreviewSection);
    classAddIn(genericSection);
    classAddIn(movieDetailSection);
    headerSection.style.cssText = 'padding: 40px 24px 0';

    getMovieGenresList();
    getTrendingMoviesPreview();
}

function categoryPage(){
    console.log('Categories');

    smoothscroll();
    classRemoveIn(headerSection);
    classRemove(headerSection, 'header-container--long');
    classRemoveIn(arrowBtn);
    classRemove(arrowBtn, 'header-arrow--white');
    classAddIn(headerTitle);
    classRemoveIn(headerCategoryTitle);
    classAddIn(searchForm);
    classAddIn(trendingPreviewSection);
    classAddIn(categoriesPreviewSection);
    classRemoveIn(genericSection);
    classAddIn(movieDetailSection);
    headerSection.style.cssText = 'padding: 40px 24px 0';

    const [_, categoryData] = location.hash.split('=');
    // console.log([_, categoryData]);
    const [categoryId, categoryName] = categoryData.split('-');

    headerCategoryTitle.innerHTML = categoryName.replace('%20',' ');
  
    getMoviesByCategory(categoryId);
}

function movieDetailsPage(){
    console.log('Movie');
    
    smoothscroll();
    classRemoveIn(headerSection);
    classAdd(headerSection, 'header-container--long');
    classRemoveIn(arrowBtn); 
    classAdd(arrowBtn, 'header-arrow--white'); 
    classAddIn(headerTitle);
    classAddIn(headerCategoryTitle);
    classAddIn(searchForm);
    classAddIn(trendingPreviewSection);
    classAddIn(categoriesPreviewSection);
    classAddIn(genericSection);
    classRemoveIn(movieDetailSection);

    const [_, movieId] = location.hash.split('=');
    getMovieDetails(movieId);   
}

function searchPage(){
    console.log('Search');

    smoothscroll();
    classRemoveIn(headerSection);
    headerSection.style.background = '';
    classRemoveIn(arrowBtn, 'header-arrow--white');
    classAddIn(headerTitle);
    classRemoveIn(headerCategoryTitle);
    classRemoveIn(searchForm);
    classAddIn(trendingPreviewSection);
    classAddIn(categoriesPreviewSection);
    classRemoveIn(genericSection);
    classAddIn(movieDetailSection);

    const [_, query] = location.hash.split('=');
    headerCategoryTitle.innerText = `Resultados para: ${query.replace('%20', ' ')}`;
    getMoviesBySearch(query.replace('%20', ' '));
}

function trendsPage(){
    console.log('Trends');

    smoothscroll();
    classRemoveIn(headerSection);
    headerSection.style.background = '';
    classRemoveIn(arrowBtn);
    classRemove(arrowBtn, 'header-arrow--white');
    classAddIn(headerTitle);
    classRemoveIn(headerCategoryTitle);
    classAddIn(searchForm);
    classAddIn(trendingPreviewSection);
    classAddIn(categoriesPreviewSection);
    classRemoveIn(genericSection);
    classAddIn(movieDetailSection);

    headerCategoryTitle.innerText = 'Tendencias';
}
