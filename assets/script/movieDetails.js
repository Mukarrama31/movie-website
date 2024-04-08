'use strict';

export function filterMoviesByTerm(movies, searchTerm) {
  return movies.filter(movie => 
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
}

export function showMovieDetails(selectedMovie, container) {
    container.innerHTML = `
      <div class="filmify-selected-movie-poster">
          <img src="${selectedMovie.poster}" alt="${selectedMovie.title}">
      </div>
      <div class="filmify-selected-movie-details">
          <h2>${selectedMovie.title} (${selectedMovie.year})</h2>
          <div class="filmify-year-running-time">
            <p>${selectedMovie.year}</p>
            <span class="dot"></span>
            <p>${selectedMovie.runningTime}</p>
          </div>
          <p>${selectedMovie.description}</p>
          <p>${selectedMovie.genre.map(genre => `<span class="filmify-genre">${genre}</span>`).join('')}</p>
      </div>
    `;
}