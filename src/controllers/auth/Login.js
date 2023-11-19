const authService = require("../../services/auth/auth.service");
const helper = require("../../utils/helper");

const Login = async (req, res) => {
    try {

        let data = {
            email: req.body.email,
            password: req.body.password,
        }

        const user = authService.Login(data);

        return res.send(user);
    } catch (error) {
        return helper.handleError(error, req, res);
    }
};

module.exports = { Login };