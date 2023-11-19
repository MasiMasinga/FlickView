exports.handleError = (err, req, res) => {
    let errObj = {};

    if (err.errors) {
        err.errors.map((er) => {
            errObj[er.path] = er.message;
        });
    } else {
        errObj = err;
    }

    let message = errObj.message ? errObj.message : "Internal server error.";
    let code = errObj.status ? errObj.status : 500;

    return res.status(code).send({ message });
};