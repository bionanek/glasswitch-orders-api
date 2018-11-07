exports.hello_world = (request, response, next) => {
    const responseBody = {
        message: "Hello world"
    };

    response.status(200).json(responseBody);
};