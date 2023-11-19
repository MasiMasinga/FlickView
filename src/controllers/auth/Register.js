const authService = require("../../services/auth/auth.service");
const helper = require("../../utils/helper");

const Register = async (req, res) => {
    try {

        let data = {
            first_name: req.body.first_name,
            email: req.body.email,
            password: req.body.password,
            confirm_password: req.body.confirm_password,
        };

        if (!data.first_name) {
            return res.status(400).send({ message: "First Name is required" });
        };

        if (!data.email) {
            return res.status(400).send({ message: "Email is required" });
        };

        if (!data.password) {
            return res.status(400).send({ message: "Password is required" });
        }

        if (!data.confirm_password) {
            return res.status(400).send({ message: "Confirm Password is required" });
        }

        if (data.password !== data.confirm_password) {
            return res.status(400).send({ message: "Passwords do not match" });
        }

        const user = await authService.Register(data);

        return res.send(user);
    } catch (error) {
        return helper.handleError(error, req, res);
    }
};

module.exports = { Register };