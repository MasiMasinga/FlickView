const { Configuration, OpenAIApi } = require("openai");
const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const MovieSuggestion = async (params) => {
    try {

        const completion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{
                role: 'user',
                message: `
                        Please suggest me some movies to watch, Based on the following movies I have watched:
                        ${params}
                    `
            }]
        });

        return resolve({ message: "Movie suggestions generated", suggestions: completion });

    } catch (error) {
        return reject(error);
    }
};

const SearchMovie = async (params) => {
    try {
        const url =
            `https://api.themoviedb.org/3/search/movie?query=${params}&include_adult=false&language=en-US&page=1`;

        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.TMBD_API_TOKEN}`
        }

        const response = await axios.get(url, { headers });

        return resolve({ message: "Movie fetched", movie: response.data });
    } catch (error) {
        return reject(error);
    }
};

module.exports = {
    MovieSuggestion,
    SearchMovie
};