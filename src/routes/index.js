const { Router } = require("express");
const auth = require("../middleware/auth");
const routes = Router();

const RegisterController = require('../controllers/auth/Register');
const LoginController = require('../controllers/auth/Login');
const ResetPasswordController = require('../controllers/auth/ResetPassword');
const ForgotPasswordController = require('../controllers/auth/ForgotPassword');
const LogoutController = require('../controllers/auth/Logout');
const GenerateMovieSuggestionController = require('../controllers/movie/GenerateMovieSuggestion');
const GetMovieController = require('../controllers/movie/GetMovie');
const AddToWatchListController = require('../controllers/watchlist/AddToWatchList');

routes.post("auth/register/", RegisterController.Register);
routes.post("auth/login/", LoginController.Login);
routes.post("auth/reset-password/", ResetPasswordController.ResetPassword);
routes.post("auth/forgot-password/", ForgotPasswordController.ForgotPassword);
routes.post("/logout/", auth, LogoutController.Logout);
routes.post("/generate-movie-suggestion/", auth, GenerateMovieSuggestionController.GenerateMovieSuggestion);
routes.get("/get-movie/:id", auth, GetMovieController.GetMovie);
routes.post("/watchlist/", auth, AddToWatchListController.AddToWatchList);

module.exports = routes;
