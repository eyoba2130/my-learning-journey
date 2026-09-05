export function errorHandler(err, req, res, next) {
    // let customError = {
    //     statusCode: err.statusCode || Statuscodes.INTERNAL_SERVER_ERROR,
    //     message: err.message || 'Internal Server Error',
    // };

    return res.status(500).json({
        status: 'false',
        
        message: "something went wrong",
    })
};