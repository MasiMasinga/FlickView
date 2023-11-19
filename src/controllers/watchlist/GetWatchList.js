const watchlistService = require("../../services/watchlist/watchlist.service");
const helper = require("../../utils/helper");

const GetWatchList = async (req, res) => {
    try {
        

        const user = watchlistService.GetWatchList(data);

        return res.send(user);
    } catch (error) {
        return helper.handleError(error, req, res);
    }
};

module.exports = { GetWatchList };