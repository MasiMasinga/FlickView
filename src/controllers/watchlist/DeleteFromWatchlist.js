const watchlistService = require("../../services/watchlist/watchlist.service");
const helper = require("../../utils/helper");

const DeleteFromWatchlist = async (req, res) => {
    try {
        

        const user = watchlistService.DeleteFromWatchlist(data);

        return res.send(user);
    } catch (error) {
        return helper.handleError(error, req, res);
    }
};

module.exports = { DeleteFromWatchlist };