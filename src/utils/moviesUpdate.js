const MoviesService = require("../services/movieService");
const moviesService = new MoviesService();

const update = async (id, movie) => {
  return await moviesService.update(id, movie);
}

const findAllMovies = async (filter, options) => {
  return await moviesService.findAllMovies(filter, options);
};

const findDetailMovie = async (id) => {
  return await moviesService.findDetailMovie(id);
};

const asociate = async (movie, character) => {
   
  await movie.addPersonaje(character);
  
};

module.exports = {
  findAllMovies,
  findDetailMovie,
  asociate,
  update
};
