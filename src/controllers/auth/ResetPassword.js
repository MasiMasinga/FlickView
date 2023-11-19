const authService = require("../../services/auth/auth.service");
const helper = require("../../utils/helper");

const ResetPassword = async (req, res) => {
    try {
        

        const user = authService.ResetPassword(data);

        return res.send(user);
    } catch (error) {
        return helper.handleError(error, req, res);
    }
};

module.exports = { ResetPassword };