const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const routes = require("./routes/routes");
const errorHandler = require("./utils/errorHandler");

const app = express();
dotenv.config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(routes);
app.use(errorHandler);

const PORT = process.env.PORT || 8081;

app.listen(PORT, () => {
    console.log(`FlickView 🚀Server Started on PORT ${PORT}`);
});