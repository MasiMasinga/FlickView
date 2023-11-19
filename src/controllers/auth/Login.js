const authService = require("../../services/auth/auth.service");
const helper = require("../../utils/helper");

const Login = async (req, res) => {
    try {

        let data = {
            email: req.body.email,
            password: req.body.password,
        };

        if (!data.email) {
            return res.status(400).send({ message: "Email is required" });
        };

        if (!data.password) {
            return res.status(400).send({ message: "Password is required" });
        }

        const user = await authService.Login(data);

        return res.send(user);
    } catch (error) {
        return helper.handleError(error, req, res);
    }
};

module.exports = { Login };