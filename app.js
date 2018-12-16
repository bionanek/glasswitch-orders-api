const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const config = require('config');

const app = express();

const productsRoutes = require('./api/routes/productsRouter');
const customersRoutes = require('./api/routes/customersRouter');

if (config.util.getEnv('NODE_ENV') == 'test') {
    app.use(morgan('test'));
} else {
    app.use(morgan('dev'));
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/products', productsRoutes);
app.use('/customers', customersRoutes);

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