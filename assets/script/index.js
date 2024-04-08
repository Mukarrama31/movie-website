'use strict';

import moviesData from './movies.js';
import { filterMoviesByTerm, showMovieDetails } from './movieDetails.js';

const searchInputField = document.getElementById('filmify-searchInput');
const movieList = document.querySelector('.filmify-search-dialog ul'); 
const movieDetailsContainer = document.querySelector('.filmify-selected-movie'); 
const searchFormElement = document.getElementById('filmify-searchForm'); 

function searchMoviesByTerm(searchTerm) {
  return filterMoviesByTerm(moviesData, searchTerm); 
}

function listFilteredMovies(input) {
  const searchTerm = input.trim().toLowerCase(); 

  if (searchTerm.length < 3) {
    movieList.innerHTML = ''; 
    return;
  }

  const matchingMovies = searchMoviesByTerm(searchTerm); 

  movieList.innerHTML = '';
  if (matchingMovies.length > 0) {
    matchingMovies.forEach(movie => {
      const newListItem = document.createElement('li');
      newListItem.textContent = movie.title; 
      copyToInputOnClick(newListItem); 
      movieList.appendChild(newListItem); 
    });
    
    movieList.parentElement.classList.add('visible');
  } else {
    const notFoundListItem = document.createElement('li');
    notFoundListItem.textContent = 'Movie not found'; 
    movieList.appendChild(notFoundListItem);
    movieList.parentElement.classList.remove('visible');
  }
}

function copyToInputOnClick(element) {
  element.addEventListener('click', () => {
    searchInputField.value = element.textContent; 
    movieList.parentElement.classList.remove('visible'); 
    showSelectedMovie(); 
  });
}
function showSelectedMovie() {
  const movieTitle = searchInputField.value.trim().toLowerCase();
  const selectedMovie = moviesData.find(movie => movie.title.trim().toLowerCase() === movieTitle);

  if (selectedMovie) {
    showMovieDetails(selectedMovie, movieDetailsContainer); 
    searchInputField.value = ''; 
  } else {
    movieDetailsContainer.innerHTML = 'Movie not found';
  }
}

searchInputField.addEventListener('input', () => listFilteredMovies(searchInputField.value));


searchFormElement.addEventListener('submit', event => {
  event.preventDefault(); 
});


searchFormElement.addEventListener('submit', function(event) {
  event.preventDefault(); 
  const searchDialog = document.querySelector('.filmify-search-dialog');
  searchDialog.classList.toggle('visible');
});

window.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('filmify-searchInput');
  const searchDialog = document.querySelector('.filmify-search-dialog');
  
  
  const setDialogWidth = () => {
    const inputWidth = searchInput.offsetWidth;
    searchDialog.style.width = inputWidth + 'px';
  };

  setDialogWidth();
  window.addEventListener('resize', setDialogWidth);
});