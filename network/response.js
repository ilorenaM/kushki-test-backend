exports.success = function (req, res, message, status) {
    res.status(status || 200).send({
        error: null,
        body: message
    });
}

exports.error = function (req, res, message, status, details) {
    console.error('[LOG-ERROR] ' + details);
    res.status(status || 500).send({
        error: message,
        body: null
    });
}