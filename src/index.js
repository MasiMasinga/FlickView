const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const routes = require("./routes");

const app = express();
dotenv.config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(routes);

app.use(function (err, _req, res, _next) {
    console.error("error", err);
    res.status(500);
    res.send({ message: "Unfortunately a Technical Error Occurred" });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`FlickView 🚀Server Started on PORT ${PORT}`);
});

// const { Configuration, OpenAIApi } = require("openai");

// const configuration = new Configuration({
//     apiKey: process.env.OPENAI_API_KEY,
// });

// const openai = new OpenAIApi(configuration);

// app.post("/api", (req, res) => {
//     const body = `Please recommend a list of movies and tv shows based on 
//   these last few shows I have watched "${req.body.body}". 
//   Ensure it's just a ordered list with bullets next to each title, 
//   with no sub header or title and don't provide any explanations or 
//   conclusions to the response?`;

//     console.log(body);

//     openai
//         .createCompletion({
//             model: "text-davinci-003",
//             prompt: body,
//             temperature: 0.8,
//             max_tokens: 250,
//             frequency_penalty: 0.7,
//         })
//         .then((completion) => {
//             console.log(completion.data.choices[0].text);
//             res.send({ data: completion.data.choices[0].text });
//         })
//         .catch((err) => {
//             console.log(err);
//             res.send({ message: "Unfortunately a Technical Error Occurred" });
//         });
// });

