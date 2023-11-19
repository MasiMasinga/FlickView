const movieService = require("../../services/movie/movie.service");
const helper = require("../../utils/helper");

const GetMovie = async (req, res) => {
    try {
        

        const user = movieService.GetMovie(data);

        return res.send(user);
    } catch (error) {
        return helper.handleError(error, req, res);
    }
};

module.exports = { GetMovie };