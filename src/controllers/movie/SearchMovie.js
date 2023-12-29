const movieService = require("../../services/movie/movie.service");
const helper = require("../../utils/helper");

const SearchMovie = async (req, res) => {
    try {

        const user = movieService.SearchMovie(data);

        return res.send(user);
    } catch (error) {
        return helper.handleError(error, req, res);
    }
};

module.exports = { SearchMovie };