const { Router } = require("express");
const auth = require("../middleware/auth");
const routes = Router();

const RegisterController = require('../controllers/auth/Register');
const LoginController = require('../controllers/auth/Login');
const ResetPasswordController = require('../controllers/auth/ResetPassword');
const ForgotPasswordController = require('../controllers/auth/ForgotPassword');
const LogoutController = require('../controllers/auth/Logout');
const AddToWatchListController = require('../controllers/watchlist/AddToWatchList');
const GetWatchListController = require('../controllers/watchlist/GetWatchList');

routes.post("/register/", RegisterController.Register);
routes.post("/login/", LoginController.Login);
routes.post("/reset-password/", ResetPasswordController.ResetPassword);
routes.post("/forgot-password/", ForgotPasswordController.ForgotPassword);
routes.post("/logout/", auth, LogoutController.Logout);
routes.post("/add-to-watchlist/", auth, AddToWatchListController.AddToWatchList);
routes.post("/get-watchlist/:id/", auth, GetWatchListController.GetWatchList);

