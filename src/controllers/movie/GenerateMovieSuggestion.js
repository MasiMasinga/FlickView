const movieService = require("../../services/movie/movie.service");
const helper = require("../../utils/helper");

const GenerateMovieSuggestion = async (req, res) => {
    try {
        

        const user = movieService.GenerateMovieSuggestions(data);

        return res.send(user);
    } catch (error) {
        return helper.handleError(error, req, res);
    }
};

module.exports = { GenerateMovieSuggestion };