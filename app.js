const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();

const productsRoutes = require('./api/routes/products');

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/products', productsRoutes);

app.use((request, response, next) => {
    const error = new Error('Not found');
    error.status = 404;

    next(error);
});

app.use((error, request, response, next) => {
    response.status(error.status || 500);
    response.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;