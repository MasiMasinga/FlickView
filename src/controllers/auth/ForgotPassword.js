const authService = require("../../services/auth/auth.service");
const helper = require("../../utils/helper");

const ForgotPassword = async (req, res) => {
    try {

        let data = {
            email: req.body.email,
        };

        if (!data.email) {
            return res.status(400).send({ message: "Email is required" })
        }

        const user = await authService.ForgotPassword(data);

        return res.send(user);
    } catch (error) {
        return helper.handleError(error, req, res);
    }
};

module.exports = { ForgotPassword };