const authService = require("../../services/auth/auth.service");
const helper = require("../../utils/helper");

const ResetPassword = async (req, res) => {
    try {

        let data = {
            password: req.body.password,
            token: req.body.token,
        };

        if (!data.password) {
            return res.status(400).send({ message: "Password is required" })
        }

        const user = authService.ResetPassword(data);

        return res.send(user);
    } catch (error) {
        return helper.handleError(error, req, res);
    }
};

module.exports = { ResetPassword };