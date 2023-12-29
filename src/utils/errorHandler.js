exports.errorHandler = function (err, _req, res, _next) {
    console.error("error", err);
    res.status(500);
    res.send({ message: "Unfortunately a Technical Error Occurred" });
};