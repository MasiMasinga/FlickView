const authService = require("../../services/auth/auth.service");
const helper = require("../../utils/helper");

const Register = async (req, res) => {
    try {

        let data = {
            first_name: req.body.first_name,
            email: req.body.email,
            password: req.body.password,
            confirm_password: req.body.confirm_password,
        }

        const user = authService.Register(data);

        return res.send(user);
    } catch (error) {
        return helper.handleError(error, req, res);
    }
};

module.exports = { Register };