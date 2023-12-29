const { Router } = require("express");
const auth = require("../middleware/auth");

const RegisterController = require('../controllers/auth/Register');
const LoginController = require('../controllers/auth/Login');
const ResetPasswordController = require('../controllers/auth/ResetPassword');
const ForgotPasswordController = require('../controllers/auth/ForgotPassword');
const LogoutController = require('../controllers/auth/Logout');
const MovieSuggestionController = require('../controllers/movie/MovieSuggestion');
const SearchMovieController = require('../controllers/movie/SearchMovie');
const AddToWatchListController = require('../controllers/watchlist/AddToWatchList');

const authRoutes = Router();
authRoutes.post("/register", RegisterController.Register);
authRoutes.post("/login", LoginController.Login);
authRoutes.post("/reset-password", ResetPasswordController.ResetPassword);
authRoutes.post("/forgot-password", ForgotPasswordController.ForgotPassword);
authRoutes.post("/logout", auth, LogoutController.Logout);

const movieRoutes = Router();
movieRoutes.post("/suggestion", auth, MovieSuggestionController.MovieSuggestion);
movieRoutes.get("/search", auth, SearchMovieController.SearchMovie);

const watchlistRoutes = Router();
watchlistRoutes.post("/", auth, AddToWatchListController.AddToWatchList);

const routes = Router();
routes.use("/v1/api/auth", authRoutes);
routes.use("/v1/api/movie", movieRoutes);
routes.use("/v1/api/watchlist", watchlistRoutes);

module.exports = routes;