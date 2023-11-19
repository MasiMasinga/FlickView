const authService = require("../../services/auth/auth.service");
const helper = require("../../utils/helper");

const ForgotPassword = async (req, res) => {
    try {
        

        const user = authService.ForgotPassword(data);

        return res.send(user);
    } catch (error) {
        return helper.handleError(error, req, res);
    }
};

module.exports = { ForgotPassword };